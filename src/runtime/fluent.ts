import "@/runtime/define.ts";

import type { VNode, VNodeArrayChildren, VNodeChild } from "vue";
import { cloneVNode, Comment, defineComponent, Fragment, h, isVNode, mergeProps, Text } from "vue";

type TFluentElement = HTMLElement & Record<string, unknown>;

export type TFluentModel = {
    event: string;
    name?: string;
    property: string;
    read?: (element: TFluentElement, event: Event) => unknown;
    write?: (element: TFluentElement, value: unknown) => void;
};

export type TFluentText = {
    name: string;
    slot?: string;
    tag?: string;
};

export type TFluentOptions = {
    models?: Array<TFluentModel>;
    slots?: Array<string>;
    tag: string;
    texts?: Array<TFluentText>;
};

const PASSTHROUGH_KEYS = new Set(["class", "id", "slot", "style"]);

function assignSlot(nodes: VNodeArrayChildren | VNodeChild, slot: string): Array<VNode> {
    if (Array.isArray(nodes)) {
        return nodes.flatMap((node) => assignSlot(node, slot));
    }

    if (nodes === null || nodes === undefined || typeof nodes === "boolean") {
        return [];
    }

    if (!isVNode(nodes)) {
        return [h("span", { slot }, String(nodes))];
    }

    if (nodes.type === Comment) {
        return [];
    }

    if (nodes.type === Fragment) {
        return assignSlot(nodes.children as VNodeArrayChildren, slot);
    }

    if (nodes.type === Text) {
        return [h("span", { slot }, nodes.children as string)];
    }

    return [cloneVNode(nodes, { slot })];
}

function hyphenate(key: string) {
    return key.replace(/\B([A-Z])/g, "-$1").toLowerCase();
}

function normalizeAttributes(tag: string, attrs: Record<string, unknown>) {
    const prototype = customElements.get(tag)?.prototype ?? {};
    const normalized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(attrs)) {
        if (/^on[A-Z]/.test(key) || PASSTHROUGH_KEYS.has(key) || key in prototype) {
            normalized[key] = value;
        }
        else if (value !== false && value !== null && value !== undefined) {
            normalized[hyphenate(key)] = value === true ? "" : value;
        }
    }

    return normalized;
}

function getModelName(model: TFluentModel) {
    return model.name ?? "modelValue";
}

function getEventKey(event: string) {
    return `on${ event.charAt(0).toUpperCase() }${ event.slice(1) }`;
}

function renderText(text: TFluentText, value: unknown) {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    if (!text.slot && !text.tag) {
        return String(value);
    }

    return h(text.tag ?? "span", text.slot ? { slot: text.slot } : {}, String(value));
}

export function defineFluent(name: string, { models = [], slots = [], tag, texts = [] }: TFluentOptions) {
    const propNames = [...models.map(getModelName), ...texts.map((text) => text.name)];

    const options = {
        emits: models.map((model) => `update:${ getModelName(model) }`),
        inheritAttrs: false,
        props: Object.fromEntries(propNames.map((prop) => [prop, { default: undefined, type: null }]))
    };

    return defineComponent({
        name,
        ...options,
        setup(props, { attrs, emit, slots: vueSlots }) {
            function getModelProps() {
                return models.map((model) => {
                    const modelName = getModelName(model);
                    const value = props[modelName];
                    const binding: Record<string, unknown> = {
                        [getEventKey(model.event)]: (event: Event) => {
                            const element = event.currentTarget as TFluentElement;
                            queueMicrotask(() => {
                                emit(`update:${ modelName }`, model.read ? model.read(element, event) : element[model.property]);
                            });
                        }
                    };

                    if (model.write) {
                        const write = model.write;
                        binding.onVnodeMounted = (vnode: VNode) => write(vnode.el as TFluentElement, value);
                        binding.onVnodeUpdated = (vnode: VNode) => write(vnode.el as TFluentElement, value);
                    }
                    else if (value !== undefined) {
                        binding[model.property] = value;
                    }

                    return binding;
                });
            }

            return () => h(tag, mergeProps(normalizeAttributes(tag, attrs), ...getModelProps()), [
                ...texts.map((text) => renderText(text, props[text.name])),
                vueSlots.default?.(),
                ...slots.flatMap((slot) => vueSlots[slot] ? assignSlot(vueSlots[slot](), slot) : [])
            ]);
        }
    });
}

export const checkedModel: TFluentModel = { event: "change", property: "checked" };

export const valueModel: TFluentModel = { event: "change", property: "value" };

export const inputModel: TFluentModel = { event: "input", property: "value" };

export const pressedModel: TFluentModel = { event: "click", property: "pressed" };

export const activeTabModel: TFluentModel = { event: "change", property: "activeid" };

export const numberModel: TFluentModel = {
    event: "change",
    property: "value",
    read: (element) => Number(element.value)
};

export const openModel: TFluentModel = {
    name: "open",
    event: "toggle",
    property: "open",
    read: (_element, event) => (event as CustomEvent<{ newState?: string; }>).detail?.newState === "open",
    write: (element, value) => {
        const dialog = element.dialog as HTMLDialogElement | undefined;

        if (value === undefined || !dialog || dialog.open === Boolean(value)) {
            return;
        }

        (element[value ? "show" : "hide"] as () => void).call(element);
    }
};
