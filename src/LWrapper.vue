<template>
    <FluentApp :settings="mode ? { ...internals, colorMode: mode } : internals">
        <slot />
    </FluentApp>
</template>

<script setup lang="ts">
import FluentApp from "@/runtime/FluentApp.vue";
import { internals } from "@/theme/internals.ts";
import type { TColorMode } from "@/theme/settings.ts";

defineProps<{
    mode?: TColorMode;
}>();
</script>
