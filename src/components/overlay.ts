import { faCircleInfo, faComment, faSquare, faTableColumns, faWindowMaximize, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { LogicType } from "@luna-park/plugin";

import { choice, makeComponent } from "@/lib/component.ts";

const ariaLabel = LogicType.string({ description: "Accessible name when there is no visible title." });

export default [
    makeComponent("Overlay/Dialog", "FluentDialog", {
        documentation: { description: "Native dialog. Bind v-model:open to a boolean and put a Overlay/DialogBody inside." },
        emits: { toggle: LogicType.void() },
        guides: ["dialog"],
        icon: faWindowRestore,
        models: { open: LogicType.boolean({ name: "open" }) },
        properties: {
            ariaLabel,
            type: choice(["modal", "non-modal", "alert"], "alert can only be closed by its actions.", "modal")
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Overlay/DialogBody", "FluentDialogBody", {
        documentation: { description: "Layout of a dialog: title, content and action buttons at the bottom right." },
        guides: ["dialog"],
        icon: faWindowMaximize,
        properties: { title: LogicType.string() },
        slots: { "action": LogicType.void(), "close": LogicType.void(), "default": LogicType.void(), "title": LogicType.void(), "title-action": LogicType.void() }
    }),
    makeComponent("Overlay/Drawer", "FluentDrawer", {
        documentation: { description: "Panel sliding from the side of the window. Bind v-model:open, put a Overlay/DrawerBody inside. Use type inline for a fixed side pane." },
        emits: { toggle: LogicType.void() },
        guides: ["dialog"],
        icon: faTableColumns,
        models: { open: LogicType.boolean({ name: "open" }) },
        properties: {
            ariaLabel,
            position: choice(["start", "end"], undefined, "start"),
            size: choice(["small", "medium", "large", "full"], undefined, "medium"),
            type: choice(["modal", "non-modal", "inline"], undefined, "modal")
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Overlay/DrawerBody", "FluentDrawerBody", {
        guides: ["dialog"],
        icon: faSquare,
        properties: { title: LogicType.string() },
        slots: { close: LogicType.void(), default: LogicType.void(), footer: LogicType.void(), title: LogicType.void() }
    }),
    makeComponent("Overlay/Tooltip", "FluentTooltip", {
        documentation: { description: "Tooltip shown on hover or focus of the element whose id is anchor." },
        icon: faComment,
        properties: {
            anchor: LogicType.string({ description: "Id of the element the tooltip describes." }),
            delay: LogicType.number({ description: "Delay before showing, in milliseconds." }),
            positioning: choice(["above-start", "above", "above-end", "below-start", "below", "below-end", "before-top", "before", "before-bottom", "after-top", "after", "after-bottom"], undefined, "above"),
            text: LogicType.string()
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Overlay/MessageBar", "FluentMessageBar", {
        documentation: { description: "Inline message at the top of a view, like Windows info bars." },
        emits: { dismiss: LogicType.void() },
        icon: faCircleInfo,
        properties: {
            intent: choice(["info", "success", "warning", "error"], undefined, "info"),
            layout: choice(["singleline", "multiline"]),
            shape: choice(["rounded", "square"]),
            text: LogicType.string()
        },
        slots: { actions: LogicType.void(), default: LogicType.void(), dismiss: LogicType.void(), icon: LogicType.void() }
    })
];
