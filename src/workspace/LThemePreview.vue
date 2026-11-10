<template>
    <div class="theme-preview">
        <div class="toolbar">
            <span class="title">Preview</span>
            <LSegmented
                v-model="mode"
                :options="modeOptions"
                small
            />
        </div>
        <div class="root">
            <LWrapper :mode="mode || undefined">
                <div class="samples">
                    <FluentText
                        size="500"
                        text="Settings"
                        weight="semibold"
                    />
                    <FluentMessageBar
                        intent="info"
                        text="Every setting of the workspace applies here."
                    />
                    <div class="row">
                        <FluentButton
                            appearance="primary"
                            label="Save"
                        />
                        <FluentButton label="Cancel" />
                        <FluentButton
                            appearance="subtle"
                            label="Reset"
                        />
                        <FluentToggleButton
                            v-model="pressed"
                            label="Toggle"
                        />
                    </div>
                    <FluentField label="Name">
                        <template #input>
                            <FluentTextInput
                                v-model="name"
                                placeholder="Jane Doe"
                            />
                        </template>
                    </FluentField>
                    <FluentField
                        label="Notifications"
                        label-position="after"
                    >
                        <template #input>
                            <FluentSwitch v-model="notify" />
                        </template>
                    </FluentField>
                    <FluentField
                        label="Remember me"
                        label-position="after"
                    >
                        <template #input>
                            <FluentCheckbox v-model="remember" />
                        </template>
                    </FluentField>
                    <FluentSlider v-model="volume" />
                    <FluentProgressBar :value="volume" />
                    <div class="row">
                        <FluentBadge label="Brand" />
                        <FluentBadge
                            appearance="tint"
                            color="success"
                            label="Success"
                        />
                        <FluentBadge
                            appearance="outline"
                            color="danger"
                            label="Danger"
                        />
                        <FluentAvatar name="Ada Lovelace" />
                        <FluentSpinner size="tiny" />
                    </div>
                </div>
            </LWrapper>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TOptions } from "@luna-park/design";
import { LSegmented } from "@luna-park/design";
import { ref } from "vue";

import LWrapper from "@/LWrapper.vue";
import { FluentAvatar, FluentBadge, FluentButton, FluentCheckbox, FluentField, FluentMessageBar, FluentProgressBar, FluentSlider, FluentSpinner, FluentSwitch, FluentText, FluentTextInput, FluentToggleButton } from "@/runtime/components.ts";
import type { TColorMode } from "@/theme/settings.ts";

const mode = ref<TColorMode | "">("");
const pressed = ref(false);
const name = ref("");
const notify = ref(true);
const remember = ref(false);
const volume = ref(40);

const modeOptions = [
    { label: "Theme", value: "" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" }
] satisfies TOptions;
</script>

<style scoped>
.theme-preview {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;

    .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--length-s);
        padding: var(--length-s);
        border-bottom: 1px solid var(--color-background-2);

        .title {
            font-weight: 600;
        }
    }

    .root {
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto;
    }

    .samples {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }
}
</style>
