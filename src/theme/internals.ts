import { reactive } from "vue";

import type { TFluentSettings } from "@/theme/settings.ts";
import { getDefaultSettings } from "@/theme/settings.ts";

export const internals = reactive<TFluentSettings>(getDefaultSettings());
