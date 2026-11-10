import type { TComponent } from "@luna-park/plugin";
import { LogicType } from "@luna-park/plugin";

import { RUNTIME_TARGET } from "@/meta.ts";
import * as runtime from "@/runtime/components.ts";

type TRuntimeName = keyof typeof runtime;

const runtimeComponents: Record<TRuntimeName, TComponent["component"]> = { ...runtime };

export function makeComponent(name: string, exportName: TRuntimeName, definition: Omit<TComponent, "build" | "component" | "name">): TComponent {
    return {
        name,
        build: {
            name: exportName,
            imports: [{ name: exportName, from: RUNTIME_TARGET }]
        },
        component: runtimeComponents[exportName],
        ...definition
    };
}

export function choice(values: Array<string>, description?: string, defaultValue?: string) {
    return LogicType.string({ default: defaultValue, description, enum: values });
}

export const sizes = ["small", "medium", "large"];

export const buttonProperties = {
    appearance: choice(["primary", "outline", "subtle", "transparent"], "Visual style. Leave empty for the default secondary button."),
    disabled: LogicType.boolean({ description: "Prevent interaction." }),
    disabledFocusable: LogicType.boolean({ description: "Disabled but still reachable with the keyboard." }),
    iconOnly: LogicType.boolean({ description: "Square button that only shows its start slot." }),
    shape: choice(["rounded", "circular", "square"]),
    size: choice(sizes),
    type: choice(["button", "submit", "reset"], undefined, "button")
};

export const buttonSlots = {
    default: LogicType.void(),
    end: LogicType.void(),
    start: LogicType.void()
};

export const anchorProperties = {
    download: LogicType.string(),
    href: LogicType.string(),
    rel: LogicType.string(),
    target: choice(["_self", "_blank", "_parent", "_top"])
};

export const formControlProperties = {
    name: LogicType.string({ description: "Name submitted with the owning form." }),
    disabled: LogicType.boolean({ description: "Prevent interaction." }),
    required: LogicType.boolean()
};

export const statusColors = ["brand", "danger", "important", "informative", "severe", "subtle", "success", "warning"];
