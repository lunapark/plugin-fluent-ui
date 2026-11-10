export type TColorMode = "auto" | "dark" | "high-contrast" | "light";

export type TBackground = "solid" | "subtle" | "transparent";

export type TFluentSettings = {
    background: TBackground;
    brand: string;
    colorMode: TColorMode;
    radius: number;
    selectableText: boolean;
};

export const DEFAULT_BRAND = "#0f6cbd";

export const BRAND_PRESETS = [
    "#0f6cbd",
    "#5b5fc7",
    "#c239b3",
    "#d13438",
    "#ca5010",
    "#107c10",
    "#038387",
    "#616161"
];

export const RADIUS_OPTIONS = [
    { label: "Square", value: 0 },
    { label: "Default", value: 1 },
    { label: "Rounded", value: 1.5 },
    { label: "Pill", value: 2.5 }
];

export function getDefaultSettings(): TFluentSettings {
    return {
        background: "solid",
        brand: DEFAULT_BRAND,
        colorMode: "auto",
        radius: 1,
        selectableText: false
    };
}

export function resolveSettings(saved: Partial<TFluentSettings> | undefined): TFluentSettings {
    return { ...getDefaultSettings(), ...saved };
}
