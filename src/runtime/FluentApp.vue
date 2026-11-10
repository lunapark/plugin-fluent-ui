<template>
    <div
        ref="root"
        class="lp-fluent-app"
        :data-background="resolved.background"
        :data-selectable="resolved.selectableText || undefined"
        :style="{ colorScheme: dark ? 'dark' : 'light' }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import type { Theme } from "@fluentui/tokens";
import { setTheme } from "@fluentui/web-components";
import { computed, onScopeDispose, ref, useTemplateRef, watchEffect } from "vue";

import type { TFluentSettings } from "@/theme/settings.ts";
import { resolveSettings } from "@/theme/settings.ts";
import { createFluentTheme, isDark } from "@/theme/theme.ts";

const props = defineProps<{
    settings?: Partial<TFluentSettings>;
}>();

const themes = new Map<string, Theme>();
const root = useTemplateRef<HTMLDivElement>("root");
const media = window.matchMedia("(prefers-color-scheme: dark)");
const prefersDark = ref(media.matches);

function onSchemeChange(event: MediaQueryListEvent) {
    prefersDark.value = event.matches;
}

media.addEventListener("change", onSchemeChange);
onScopeDispose(() => media.removeEventListener("change", onSchemeChange));

const resolved = computed(() => resolveSettings(props.settings));
const dark = computed(() => resolved.value.colorMode === "high-contrast" || isDark(resolved.value, prefersDark.value));

function getTheme(settings: TFluentSettings, systemDark: boolean) {
    const key = JSON.stringify([settings.brand, settings.colorMode, settings.radius, systemDark]);

    if (!themes.has(key)) {
        themes.set(key, createFluentTheme(settings, systemDark));
    }

    return themes.get(key)!;
}

watchEffect(() => {
    if (root.value) {
        setTheme(getTheme(resolved.value, prefersDark.value), root.value);
    }
});
</script>

<style scoped>
.lp-fluent-app {
    min-height: 100%;
    background: var(--colorNeutralBackground1);
    color: var(--colorNeutralForeground1);
    font-family: var(--fontFamilyBase);
    font-size: var(--fontSizeBase300);
    line-height: var(--lineHeightBase300);
    cursor: default;
    user-select: none;
    -webkit-font-smoothing: antialiased;

    &[data-background="subtle"] {
        background: var(--colorNeutralBackground2);
    }

    &[data-background="transparent"] {
        background: transparent;
    }

    &[data-selectable] {
        user-select: text;
    }

    :where(input, textarea, [contenteditable]) {
        user-select: text;
    }
}
</style>
