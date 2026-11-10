<template>
    <LCard>
        <LSettingRow
            description="Transparent lets the window material (Mica or Acrylic in Tauri) show through. Subtle uses the secondary background of Windows settings pages."
            title="Background"
        >
            <LSegmented
                v-model="internals.background"
                :options="backgroundOptions"
                small
            />
        </LSettingRow>
        <LSettingRow
            description="Desktop apps only let users select text in inputs. Turn this on to make all text selectable, like a web page."
            title="Selectable text"
        >
            <LSwitch
                v-model="internals.selectableText"
                small
            />
        </LSettingRow>
    </LCard>
</template>

<script setup lang="ts">
import type { TOptions } from "@luna-park/design";
import { LCard, LSegmented, LSettingRow, LSwitch } from "@luna-park/design";

import { internals } from "@/theme/internals.ts";

const backgroundOptions = [
    { label: "Solid", value: "solid" },
    { label: "Subtle", value: "subtle" },
    { label: "Transparent", value: "transparent" }
] satisfies TOptions;
</script>
