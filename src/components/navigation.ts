import { faBars, faChevronDown, faFolderTree, faList, faListCheck, faSitemap, faTableColumns, faTabletScreenButton } from "@fortawesome/free-solid-svg-icons";
import { LogicType } from "@luna-park/plugin";

import { choice, makeComponent } from "@/lib/component.ts";

export default [
    makeComponent("Navigation/Tablist", "FluentTablist", {
        documentation: { description: "Row of Navigation/Tab. Bind v-model to the id of the selected tab and show the matching content with a condition." },
        emits: { change: LogicType.void() },
        guides: ["tabs"],
        icon: faTableColumns,
        models: { modelValue: LogicType.string({ name: "activeid" }) },
        properties: {
            appearance: choice(["subtle", "transparent"]),
            disabled: LogicType.boolean(),
            orientation: choice(["horizontal", "vertical"], "Vertical tabs make a desktop style side navigation.", "horizontal"),
            size: choice(["small", "medium", "large"])
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Navigation/Tab", "FluentTab", {
        documentation: { description: "One tab of a Navigation/Tablist. Its id is the value of the tablist v-model." },
        guides: ["tabs"],
        icon: faTabletScreenButton,
        properties: {
            id: LogicType.string({ description: "Unique id, used by the tablist v-model." }),
            disabled: LogicType.boolean(),
            label: LogicType.string()
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Navigation/Accordion", "FluentAccordion", {
        emits: { change: LogicType.void() },
        icon: faList,
        properties: { expandmode: choice(["single", "multi"], "single closes the other items when one opens.", "multi") },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Navigation/AccordionItem", "FluentAccordionItem", {
        icon: faChevronDown,
        properties: {
            block: LogicType.boolean(),
            disabled: LogicType.boolean(),
            expanded: LogicType.boolean(),
            heading: LogicType.string(),
            headinglevel: LogicType.number({ default: 2, enum: [1, 2, 3, 4, 5, 6] }),
            markerPosition: choice(["start", "end"]),
            size: choice(["small", "medium", "large", "extra-large"])
        },
        slots: { default: LogicType.void(), heading: LogicType.void(), start: LogicType.void() }
    }),
    makeComponent("Navigation/Menu", "FluentMenu", {
        documentation: { description: "Popup menu. Put a Button/MenuButton in the trigger slot and a Navigation/MenuList in the default slot." },
        guides: ["menu"],
        icon: faBars,
        properties: {
            closeOnScroll: LogicType.boolean(),
            openOnContext: LogicType.boolean({ description: "Open on right click of the trigger, like a native context menu." }),
            openOnHover: LogicType.boolean(),
            persistOnItemClick: LogicType.boolean({ description: "Keep the menu open after an item is clicked." }),
            split: LogicType.boolean({ description: "Split button: the primary-action slot holds the main action." })
        },
        slots: { "default": LogicType.void(), "primary-action": LogicType.void(), "trigger": LogicType.void() }
    }),
    makeComponent("Navigation/MenuList", "FluentMenuList", {
        documentation: { description: "List of Navigation/MenuItem inside a Navigation/Menu." },
        guides: ["menu"],
        icon: faListCheck,
        slots: { default: LogicType.void() }
    }),
    makeComponent("Navigation/MenuItem", "FluentMenuItem", {
        documentation: { description: "Entry of a menu. Use click for actions, or role menuitemcheckbox with v-model for toggles." },
        emits: { click: LogicType.void() },
        guides: ["menu"],
        icon: faBars,
        models: { modelValue: LogicType.boolean({ name: "checked" }) },
        properties: {
            disabled: LogicType.boolean(),
            label: LogicType.string(),
            role: choice(["menuitem", "menuitemcheckbox", "menuitemradio"], undefined, "menuitem")
        },
        slots: { default: LogicType.void(), end: LogicType.void(), start: LogicType.void(), submenu: LogicType.void() }
    }),
    makeComponent("Navigation/Tree", "FluentTree", {
        documentation: { description: "Hierarchical list, like a file explorer. Children are Navigation/TreeItem." },
        guides: ["tree"],
        icon: faFolderTree,
        properties: {
            appearance: choice(["subtle", "subtle-alpha", "transparent"]),
            size: choice(["small", "medium"])
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Navigation/TreeItem", "FluentTreeItem", {
        documentation: { description: "Node of a Navigation/Tree. Nested TreeItems go in the item slot." },
        emits: { change: LogicType.void(), toggle: LogicType.void() },
        guides: ["tree"],
        icon: faSitemap,
        properties: {
            expanded: LogicType.boolean(),
            label: LogicType.string(),
            selected: LogicType.boolean()
        },
        slots: { aside: LogicType.void(), default: LogicType.void(), end: LogicType.void(), item: LogicType.void(), start: LogicType.void() }
    })
];
