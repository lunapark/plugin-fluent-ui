import { faArrowPointer, faBars, faLink, faTableCellsLarge, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { LogicType } from "@luna-park/plugin";

import { anchorProperties, buttonProperties, buttonSlots, makeComponent } from "@/lib/component.ts";

const label = LogicType.string({ description: "Text of the button. Use the default slot for richer content." });

export default [
    makeComponent("Button/Button", "FluentButton", {
        documentation: { description: "Fluent 2 button. Use appearance primary for the main action of a view, and leave it empty for secondary actions." },
        emits: { click: LogicType.void() },
        guides: ["desktop"],
        icon: faArrowPointer,
        properties: { ...buttonProperties, label },
        slots: buttonSlots
    }),
    makeComponent("Button/AnchorButton", "FluentAnchorButton", {
        documentation: { description: "A link styled as a button, for navigation." },
        emits: { click: LogicType.void() },
        icon: faLink,
        properties: { ...buttonProperties, ...anchorProperties, label },
        slots: buttonSlots
    }),
    makeComponent("Button/CompoundButton", "FluentCompoundButton", {
        documentation: { description: "A large button with a title and a secondary description line." },
        emits: { click: LogicType.void() },
        icon: faTableCellsLarge,
        properties: {
            ...buttonProperties,
            description: LogicType.string({ description: "Second line under the label." }),
            label
        },
        slots: { ...buttonSlots, description: LogicType.void() }
    }),
    makeComponent("Button/ToggleButton", "FluentToggleButton", {
        documentation: { description: "A button that stays pressed. Bind v-model to a boolean." },
        emits: { click: LogicType.void() },
        icon: faToggleOn,
        models: { modelValue: LogicType.boolean({ name: "pressed" }) },
        properties: {
            ...buttonProperties,
            label,
            mixed: LogicType.boolean({ description: "Partially pressed state." })
        },
        slots: buttonSlots
    }),
    makeComponent("Button/MenuButton", "FluentMenuButton", {
        documentation: { description: "A button with a chevron, used as the trigger slot of a Navigation/Menu." },
        guides: ["menu"],
        icon: faBars,
        properties: { ...buttonProperties, label },
        slots: buttonSlots
    })
];
