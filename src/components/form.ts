import { faAlignLeft, faCaretDown, faCircleDot, faFont, faListUl, faRectangleList, faSliders, faSquareCheck, faTableList, faTag, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { LogicType } from "@luna-park/plugin";

import { choice, formControlProperties, makeComponent, sizes } from "@/lib/component.ts";

export default [
    makeComponent("Form/Field", "FluentField", {
        documentation: { description: "Wraps one input with its label and a validation or hint message. Put the control in the input slot." },
        guides: ["form"],
        icon: faRectangleList,
        properties: {
            label: LogicType.string({ description: "Label text, linked to the control." }),
            labelPosition: choice(["above", "after", "before"], "Use after for checkboxes, radios and switches.", "above"),
            message: LogicType.string({ description: "Hint or validation message under the control." })
        },
        slots: { input: LogicType.void(), label: LogicType.void(), message: LogicType.void() }
    }),
    makeComponent("Form/Label", "FluentLabel", {
        icon: faTag,
        properties: {
            disabled: LogicType.boolean(),
            required: LogicType.boolean({ description: "Show a required marker." }),
            size: choice(sizes),
            text: LogicType.string(),
            weight: choice(["regular", "semibold"])
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Form/TextInput", "FluentTextInput", {
        documentation: { description: "Single line text input. Bind v-model to a string. Put it in the input slot of a Form/Field to label it." },
        emits: { change: LogicType.void() },
        guides: ["form"],
        icon: faFont,
        models: { modelValue: LogicType.string({ name: "value" }) },
        properties: {
            ...formControlProperties,
            appearance: choice(["outline", "underline", "filled-lighter", "filled-darker"], undefined, "outline"),
            autocomplete: LogicType.string(),
            controlSize: choice(sizes, "Size of the control."),
            label: LogicType.string({ description: "Inline label. Prefer a Form/Field label." }),
            maxlength: LogicType.number(),
            minlength: LogicType.number(),
            pattern: LogicType.string(),
            placeholder: LogicType.string(),
            readOnly: LogicType.boolean(),
            type: choice(["text", "email", "password", "tel", "url"], undefined, "text")
        },
        slots: { end: LogicType.void(), start: LogicType.void() }
    }),
    makeComponent("Form/Textarea", "FluentTextarea", {
        documentation: { description: "Multi line text input. Bind v-model to a string." },
        emits: { change: LogicType.void() },
        guides: ["form"],
        icon: faAlignLeft,
        models: { modelValue: LogicType.string({ name: "value" }) },
        properties: {
            ...formControlProperties,
            appearance: choice(["outline", "filled-lighter", "filled-darker"], undefined, "outline"),
            autoResize: LogicType.boolean({ description: "Grow with the content." }),
            block: LogicType.boolean({ description: "Full width." }),
            maxlength: LogicType.number(),
            placeholder: LogicType.string(),
            readOnly: LogicType.boolean(),
            resize: choice(["none", "both", "horizontal", "vertical"]),
            size: choice(sizes)
        }
    }),
    makeComponent("Form/Checkbox", "FluentCheckbox", {
        documentation: { description: "Checkbox. Bind v-model to a boolean. Fluent checkboxes have no label of their own: put it in a Form/Field with labelPosition after." },
        emits: { change: LogicType.void() },
        guides: ["form"],
        icon: faSquareCheck,
        models: { modelValue: LogicType.boolean({ name: "checked" }) },
        properties: {
            ...formControlProperties,
            indeterminate: LogicType.boolean(),
            shape: choice(["square", "circular"]),
            size: choice(["medium", "large"]),
            value: LogicType.string()
        }
    }),
    makeComponent("Form/Switch", "FluentSwitch", {
        documentation: { description: "On/off switch for settings that apply immediately. Bind v-model to a boolean, label it with a Form/Field." },
        emits: { change: LogicType.void() },
        guides: ["form"],
        icon: faToggleOff,
        models: { modelValue: LogicType.boolean({ name: "checked" }) },
        properties: { ...formControlProperties, value: LogicType.string() }
    }),
    makeComponent("Form/RadioGroup", "FluentRadioGroup", {
        documentation: { description: "Group of Form/Radio. Bind v-model to the value of the selected radio." },
        emits: { change: LogicType.void() },
        guides: ["form"],
        icon: faListUl,
        models: { modelValue: LogicType.string({ name: "value" }) },
        properties: {
            ...formControlProperties,
            orientation: choice(["horizontal", "vertical"], undefined, "horizontal")
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Form/Radio", "FluentRadio", {
        documentation: { description: "One option of a Form/RadioGroup. Wrap it in a Form/Field with labelPosition after to label it." },
        guides: ["form"],
        icon: faCircleDot,
        properties: {
            disabled: LogicType.boolean(),
            value: LogicType.string()
        }
    }),
    makeComponent("Form/Slider", "FluentSlider", {
        documentation: { description: "Pick a number in a range. Bind v-model to a number." },
        emits: { change: LogicType.void() },
        icon: faSliders,
        models: { modelValue: LogicType.number({ name: "value" }) },
        properties: {
            disabled: LogicType.boolean(),
            max: LogicType.number({ default: 100 }),
            min: LogicType.number({ default: 0 }),
            orientation: choice(["horizontal", "vertical"]),
            size: choice(["small", "medium"]),
            step: LogicType.number({ default: 1 })
        }
    }),
    makeComponent("Form/Dropdown", "FluentDropdown", {
        documentation: { description: "Select one option. Put a Form/Listbox inside, with Form/Option children. Bind v-model to the selected option value." },
        emits: { change: LogicType.void() },
        guides: ["form"],
        icon: faCaretDown,
        models: { modelValue: LogicType.string({ name: "value" }) },
        properties: {
            ...formControlProperties,
            appearance: choice(["outline", "transparent", "filled-lighter", "filled-darker"], undefined, "outline"),
            placeholder: LogicType.string(),
            size: choice(sizes),
            type: choice(["dropdown", "combobox"], "combobox lets the user type to filter.", "dropdown")
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Form/Listbox", "FluentListbox", {
        documentation: { description: "The popup list of a Form/Dropdown. Its children are Form/Option." },
        guides: ["form"],
        icon: faTableList,
        slots: { default: LogicType.void() }
    }),
    makeComponent("Form/Option", "FluentOption", {
        documentation: { description: "One choice in a Form/Listbox." },
        guides: ["form"],
        icon: faListUl,
        properties: {
            description: LogicType.string(),
            disabled: LogicType.boolean(),
            label: LogicType.string(),
            selected: LogicType.boolean({ description: "Selected by default." }),
            value: LogicType.string()
        },
        slots: { default: LogicType.void(), description: LogicType.void(), start: LogicType.void() }
    })
];
