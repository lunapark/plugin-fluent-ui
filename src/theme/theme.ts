import type { BrandVariants, Theme } from "@fluentui/tokens";
import { createDarkTheme, createHighContrastTheme, createLightTheme } from "@fluentui/tokens";

import type { TFluentSettings } from "@/theme/settings.ts";

type TRgb = [number, number, number];

const BRAND_STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160] as const;

const RADIUS_TOKENS = {
    borderRadius2XLarge: 12,
    borderRadius3XLarge: 16,
    borderRadius4XLarge: 24,
    borderRadius5XLarge: 32,
    borderRadius6XLarge: 40,
    borderRadiusLarge: 6,
    borderRadiusMedium: 4,
    borderRadiusSmall: 2,
    borderRadiusXLarge: 8
};

const FONT_FAMILY_BASE = "\"Segoe UI Variable Text\", \"Segoe UI\", system-ui, -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif";

function parseHex(hex: string): TRgb {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? [...value].map((char) => char + char).join("") : value.padEnd(6, "0").slice(0, 6);
    return [0, 2, 4].map((index) => Number.parseInt(full.slice(index, index + 2), 16) || 0) as TRgb;
}

function toHex(rgb: TRgb) {
    return `#${ rgb.map((channel) => Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, "0")).join("") }`;
}

function mix(from: TRgb, to: TRgb, amount: number): TRgb {
    return [0, 1, 2].map((index) => from[index] + (to[index] - from[index]) * amount) as TRgb;
}

export function createBrandRamp(hex: string): BrandVariants {
    const brand = parseHex(hex);
    const black: TRgb = [0, 0, 0];
    const white: TRgb = [255, 255, 255];

    return Object.fromEntries(BRAND_STEPS.map((step) => {
        const offset = (step - 80) / 80;
        const color = offset < 0 ? mix(brand, black, -offset * 0.88) : mix(brand, white, offset * 0.9);
        return [step, toHex(color)];
    })) as BrandVariants;
}

export function isDark(settings: TFluentSettings, prefersDark: boolean) {
    return settings.colorMode === "dark" || (settings.colorMode === "auto" && prefersDark);
}

export function createFluentTheme(settings: TFluentSettings, prefersDark: boolean): Theme {
    const radius = Object.fromEntries(Object.entries(RADIUS_TOKENS).map(([token, value]) => [token, `${ value * settings.radius }px`]));

    if (settings.colorMode === "high-contrast") {
        return { ...createHighContrastTheme(), ...radius, fontFamilyBase: FONT_FAMILY_BASE };
    }

    const brand = createBrandRamp(settings.brand);

    if (isDark(settings, prefersDark)) {
        return {
            ...createDarkTheme(brand),
            ...radius,
            colorBrandForeground1: brand[110],
            colorBrandForeground2: brand[120],
            colorBrandForegroundLink: brand[110],
            colorBrandForegroundLinkHover: brand[130],
            colorBrandForegroundLinkPressed: brand[100],
            colorBrandForegroundLinkSelected: brand[110],
            fontFamilyBase: FONT_FAMILY_BASE
        };
    }

    return { ...createLightTheme(brand), ...radius, fontFamilyBase: FONT_FAMILY_BASE };
}
