import vue from "@vitejs/plugin-vue";
import path from "path";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import packageDefinition from "./package.json" with { type: "json" };

const cssEntries = new Set(["index.js", "runtime.js"]);

const externals = Object.keys(packageDefinition.peerDependencies || {});

function isExternal(id: string) {
    return externals.some((name) => id === name || id.startsWith(`${ name }/`));
}

export default defineConfig(() => {
    const config: UserConfig = {
        build: {
            lib: {
                name: packageDefinition.name,
                entry: {
                    index: "src/index.ts",
                    runtime: "src/entries/runtime.ts"
                },
                formats: ["es"]
            },
            rolldownOptions: {
                external: isExternal
            }
        },
        plugins: [
            vue({
                template: {
                    compilerOptions: {
                        isCustomElement: (tag) => tag.startsWith("fluent-")
                    }
                }
            }),
            cssInjectedByJsPlugin({ jsAssetsFilterFunction: (chunk) => cssEntries.has(chunk.fileName) })
        ],
        preview: {
            allowedHosts: [
                "localhost",
                "127.0.0.1",
                "https://luna-park.app"
            ],
            host: "127.0.0.1",
            port: 2084
        },
        resolve: {
            alias: {
                "@": path.resolve(import.meta.dirname, "src")
            }
        }
    };

    return config;
});
