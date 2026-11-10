import { EInjectionKey, makePlugin } from "@luna-park/plugin";

import { components } from "@/components/index.ts";
import { guides } from "@/guides/index.ts";
import llm from "@/llm.md?raw";
import icon from "@/logo.svg";
import LWrapper from "@/LWrapper.vue";
import { PACKAGE_NAME, PACKAGE_VERSION, PLUGIN_ID, RUNTIME_TARGET } from "@/meta.ts";
import FluentApp from "@/runtime/FluentApp.vue";
import { internals } from "@/theme/internals.ts";
import type { TFluentSettings } from "@/theme/settings.ts";
import { resolveSettings } from "@/theme/settings.ts";
import { tokens } from "@/tokens.ts";
import { workspacePreview, workspaceSections } from "@/workspace/index.ts";

import packageDefinition from "../package.json" with { type: "json" };

const { dependencies } = packageDefinition;

const FLUENT_PACKAGES = ["@fluentui/tokens", "@fluentui/web-components", "@microsoft/fast-element", "@microsoft/focusgroup-polyfill"] as const;

const APP_NAME = "FluentApp";

const BUILD_CSS = "html, body { margin: 0; min-height: 100%; }\n#app { min-height: 100vh; }\n.lp-fluent-app { min-height: 100vh; }";

function getSettings(saved: unknown) {
    return resolveSettings(saved as Partial<TFluentSettings> | undefined);
}

export default makePlugin({
    id: PLUGIN_ID,
    name: "Fluent UI",
    description: "Fluent 2 web components by Microsoft, for apps that feel native on Windows.",
    icon,
    color: "#0f6cbd",
    llm,
    internals,
    lifecycle: {
        mount: () => {
            Object.assign(internals, resolveSettings(internals));
        }
    },
    editor: {
        components,
        tokens,
        wrapper: ({ internals: saved, mode }) => {
            if (mode === "build") {
                return { name: APP_NAME, attributes: { settings: getSettings(saved) }, component: FluentApp };
            }

            return { name: "Wrapper", component: LWrapper };
        }
    },
    inject: {
        css: ({ internals: saved, mode }) => {
            if (mode !== "build") {
                return "";
            }

            const transparent = getSettings(saved).background === "transparent" ? "\nhtml, body { background: transparent; }" : "";
            return `${ BUILD_CSS }${ transparent }`;
        }
    },
    build: {
        frontImports: [
            { name: PACKAGE_NAME, version: PACKAGE_VERSION },
            ...FLUENT_PACKAGES.map((name) => ({ name, version: dependencies[name] }))
        ],
        injections: {
            [EInjectionKey.AppImport]: `import { ${ APP_NAME } } from "${ RUNTIME_TARGET }";`,
            [EInjectionKey.AppBody]: `app.component("${ APP_NAME }", ${ APP_NAME });`
        }
    },
    guides,
    workspace: {
        preview: workspacePreview,
        sections: workspaceSections
    }
});
