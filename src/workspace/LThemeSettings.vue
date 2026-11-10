<template>
    <LCard>
        <LSettingRow
            description="Accent color of primary buttons, links, selections and focus. Fluent derives a full brand ramp from it."
            title="Brand color"
        >
            <LColorInput
                v-model="internals.brand"
                :presets="BRAND_PRESETS"
                small
            />
        </LSettingRow>
        <LSettingRow
            description="Auto follows the system theme, like Windows apps do."
            title="Color mode"
        >
            <LSegmented
                v-model="internals.colorMode"
                :options="colorModeOptions"
                small
            />
        </LSettingRow>
        <LSettingRow
            description="Corner radius of every component. Default matches Windows 11."
            title="Corners"
        >
            <LSegmented
                v-model="internals.radius"
                :options="RADIUS_OPTIONS"
                small
            />
        </LSettingRow>
    </LCard>
</template>

<script setup lang="ts">
import type { TOptions } from "@luna-park/design";
import { LCard, LColorInput, LSegmented, LSettingRow } from "@luna-park/design";

import { internals } from "@/theme/internals.ts";
import { BRAND_PRESETS, RADIUS_OPTIONS } from "@/theme/settings.ts";

const colorModeOptions = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Auto", value: "auto" },
    { label: "High contrast", value: "high-contrast" }
] satisfies TOptions;
</script>
