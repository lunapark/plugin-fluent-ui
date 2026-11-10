import type { TPluginGuide } from "@luna-park/plugin";

import desktop from "@/guides/desktop.md?raw";
import dialog from "@/guides/dialog.md?raw";
import form from "@/guides/form.md?raw";
import menu from "@/guides/menu.md?raw";
import tabs from "@/guides/tabs.md?raw";
import tree from "@/guides/tree.md?raw";

export const guides: Record<string, TPluginGuide> = {
    desktop: {
        content: desktop,
        description: "How to lay out a Fluent app so it looks like a native Windows 11 app"
    },
    dialog: {
        content: dialog,
        description: "Dialog with DialogBody and Drawer with DrawerBody, opened with v-model:open"
    },
    form: {
        content: form,
        description: "Field with its input slot, Dropdown with Listbox and Option, RadioGroup with Radio"
    },
    menu: {
        content: menu,
        description: "Menu with a MenuButton trigger, MenuList and MenuItem"
    },
    tabs: {
        content: tabs,
        description: "Tablist with Tab ids and conditional content"
    },
    tree: {
        content: tree,
        description: "Tree with nested TreeItem in the item slot"
    }
};
