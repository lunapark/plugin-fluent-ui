import { faPalette, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import type { TPluginWorkspaceSection } from "@luna-park/plugin";
import { defineAsyncComponent } from "vue";

export const workspacePreview = defineAsyncComponent(() => import("@/workspace/LThemePreview.vue"));

export const workspaceSections: Array<TPluginWorkspaceSection> = [
    {
        id: "theme",
        component: defineAsyncComponent(() => import("@/workspace/LThemeSettings.vue")),
        description: "Brand color, color mode and corners of the Fluent 2 theme.",
        icon: faPalette,
        title: "Theme"
    },
    {
        id: "window",
        component: defineAsyncComponent(() => import("@/workspace/LWindowSettings.vue")),
        description: "Desktop behaviour of the app window.",
        icon: faWindowMaximize,
        title: "Window"
    }
];
