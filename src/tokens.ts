import type { TToken } from "@luna-park/plugin";
import { ETokenType } from "@luna-park/plugin";

function token(id: string, name: string, type: ETokenType, variable: string): TToken {
    return { id, name, type, value: `var(--${ variable })` };
}

const colors: Array<[string, string, string]> = [
    ["brand", "Brand", "colorBrandBackground"],
    ["brand-hover", "Brand hover", "colorBrandBackgroundHover"],
    ["brand-foreground", "Brand text", "colorBrandForeground1"],
    ["foreground-1", "Text", "colorNeutralForeground1"],
    ["foreground-2", "Text secondary", "colorNeutralForeground2"],
    ["foreground-3", "Text tertiary", "colorNeutralForeground3"],
    ["foreground-disabled", "Text disabled", "colorNeutralForegroundDisabled"],
    ["foreground-on-brand", "Text on brand", "colorNeutralForegroundOnBrand"],
    ["background-1", "Background", "colorNeutralBackground1"],
    ["background-2", "Background secondary", "colorNeutralBackground2"],
    ["background-3", "Background tertiary", "colorNeutralBackground3"],
    ["background-4", "Background quaternary", "colorNeutralBackground4"],
    ["subtle-background-hover", "Subtle hover", "colorSubtleBackgroundHover"],
    ["stroke-1", "Border", "colorNeutralStroke1"],
    ["stroke-2", "Border subtle", "colorNeutralStroke2"],
    ["danger", "Danger", "colorStatusDangerForeground1"],
    ["success", "Success", "colorStatusSuccessForeground1"],
    ["warning", "Warning", "colorStatusWarningForeground1"]
];

const spacings: Array<[string, string]> = [
    ["xxs", "XXS"],
    ["xs", "XS"],
    ["s-nudge", "S nudge"],
    ["s", "S"],
    ["m-nudge", "M nudge"],
    ["m", "M"],
    ["l", "L"],
    ["xl", "XL"],
    ["xxl", "XXL"],
    ["xxxl", "XXXL"]
];

const radiuses: Array<[string, string, string]> = [
    ["radius-small", "Radius small", "borderRadiusSmall"],
    ["radius-medium", "Radius medium", "borderRadiusMedium"],
    ["radius-large", "Radius large", "borderRadiusLarge"],
    ["radius-xlarge", "Radius XL", "borderRadiusXLarge"],
    ["radius-circular", "Radius circular", "borderRadiusCircular"]
];

const fontSizes: Array<[string, string, string]> = [
    ["font-caption", "Caption (100)", "fontSizeBase100"],
    ["font-body-small", "Small (200)", "fontSizeBase200"],
    ["font-body", "Body (300)", "fontSizeBase300"],
    ["font-subtitle-2", "Subtitle 2 (400)", "fontSizeBase400"],
    ["font-subtitle-1", "Subtitle 1 (500)", "fontSizeBase500"],
    ["font-title-3", "Title 3 (600)", "fontSizeBase600"],
    ["font-title-2", "Title 2 (700)", "fontSizeHero700"],
    ["font-title-1", "Title 1 (800)", "fontSizeHero800"],
    ["font-large-title", "Large title (900)", "fontSizeHero900"],
    ["font-display", "Display (1000)", "fontSizeHero1000"]
];

export const tokens: Array<TToken> = [
    ...colors.map(([id, name, variable]) => token(id, name, ETokenType.Color, variable)),
    ...spacings.map(([id, name]) => token(`spacing-${ id }`, `Spacing ${ name }`, ETokenType.Length, `spacingHorizontal${ name.replace(" nudge", "Nudge").replaceAll(" ", "") }`)),
    ...radiuses.map(([id, name, variable]) => token(id, name, ETokenType.Length, variable)),
    ...fontSizes.map(([id, name, variable]) => token(id, name, ETokenType.FontSize, variable)),
    token("font-weight-regular", "Regular", ETokenType.FontWeight, "fontWeightRegular"),
    token("font-weight-medium", "Medium", ETokenType.FontWeight, "fontWeightMedium"),
    token("font-weight-semibold", "Semibold", ETokenType.FontWeight, "fontWeightSemibold"),
    token("font-weight-bold", "Bold", ETokenType.FontWeight, "fontWeightBold"),
    token("font-family-base", "Base", ETokenType.FontFamily, "fontFamilyBase"),
    token("font-family-mono", "Monospace", ETokenType.FontFamily, "fontFamilyMonospace"),
    token("font-family-numeric", "Numeric", ETokenType.FontFamily, "fontFamilyNumeric"),
    token("duration-fast", "Fast", ETokenType.Time, "durationFast"),
    token("duration-normal", "Normal", ETokenType.Time, "durationNormal"),
    token("duration-slow", "Slow", ETokenType.Time, "durationSlow")
];
