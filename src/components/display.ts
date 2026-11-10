import { faBarsProgress, faCertificate, faCircleUser, faGripLines, faHashtag, faImage, faLink, faParagraph, faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import { LogicType } from "@luna-park/plugin";

import { anchorProperties, choice, makeComponent, statusColors } from "@/lib/component.ts";

export default [
    makeComponent("Display/Text", "FluentText", {
        documentation: { description: "Text using the Fluent type ramp. Sizes go from 100 (caption) to 1000 (display), 300 is body text." },
        icon: faParagraph,
        properties: {
            align: choice(["start", "end", "center", "justify"]),
            block: LogicType.boolean({ description: "Display as a block." }),
            font: choice(["base", "numeric", "monospace"]),
            italic: LogicType.boolean(),
            nowrap: LogicType.boolean(),
            size: choice(["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"], undefined, "300"),
            strikethrough: LogicType.boolean(),
            text: LogicType.string(),
            truncate: LogicType.boolean({ description: "Ellipsis on overflow, with nowrap." }),
            underline: LogicType.boolean(),
            weight: choice(["regular", "medium", "semibold", "bold"])
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Display/Link", "FluentLink", {
        emits: { click: LogicType.void() },
        icon: faLink,
        properties: {
            ...anchorProperties,
            appearance: choice(["subtle"], "Subtle links use the neutral text color."),
            inline: LogicType.boolean({ description: "Inside a paragraph of text." }),
            label: LogicType.string()
        },
        slots: { default: LogicType.void(), end: LogicType.void(), start: LogicType.void() }
    }),
    makeComponent("Display/Badge", "FluentBadge", {
        icon: faCertificate,
        properties: {
            appearance: choice(["filled", "ghost", "outline", "tint"], undefined, "filled"),
            color: choice(statusColors, undefined, "brand"),
            label: LogicType.string(),
            shape: choice(["circular", "rounded", "square"]),
            size: choice(["tiny", "extra-small", "small", "medium", "large", "extra-large"])
        },
        slots: { default: LogicType.void(), end: LogicType.void(), start: LogicType.void() }
    }),
    makeComponent("Display/CounterBadge", "FluentCounterBadge", {
        icon: faHashtag,
        properties: {
            appearance: choice(["filled", "ghost"]),
            color: choice(statusColors),
            count: LogicType.number({ default: 0 }),
            dot: LogicType.boolean({ description: "Show a dot instead of the count." }),
            overflowCount: LogicType.number({ default: 99, description: "Shows 99+ above this value." }),
            shape: choice(["circular", "rounded"]),
            showZero: LogicType.boolean(),
            size: choice(["tiny", "extra-small", "small", "medium", "large", "extra-large"])
        }
    }),
    makeComponent("Display/Avatar", "FluentAvatar", {
        documentation: { description: "Picture or initials of a person. Put an image in the default slot, or set name to show initials." },
        icon: faCircleUser,
        properties: {
            name: LogicType.string({ description: "Full name, used for initials and the colorful color." }),
            active: choice(["active", "inactive"]),
            appearance: choice(["ring", "shadow", "ring-shadow"]),
            color: choice(["neutral", "brand", "colorful"]),
            initials: LogicType.string(),
            shape: choice(["circular", "square"]),
            size: LogicType.number({ default: 32, enum: [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128] })
        },
        slots: { badge: LogicType.void(), default: LogicType.void() }
    }),
    makeComponent("Display/Image", "FluentImage", {
        documentation: { description: "Frame for an img element placed in its default slot." },
        icon: faImage,
        properties: {
            block: LogicType.boolean(),
            bordered: LogicType.boolean(),
            fit: choice(["none", "center", "contain", "cover"]),
            shadow: LogicType.boolean(),
            shape: choice(["square", "rounded", "circular"])
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Display/Divider", "FluentDivider", {
        icon: faGripLines,
        properties: {
            alignContent: choice(["center", "start", "end"]),
            appearance: choice(["strong", "brand", "subtle"]),
            inset: LogicType.boolean(),
            orientation: choice(["horizontal", "vertical"]),
            text: LogicType.string({ description: "Label in the middle of the line." })
        },
        slots: { default: LogicType.void() }
    }),
    makeComponent("Display/Spinner", "FluentSpinner", {
        icon: faSpinner,
        properties: {
            appearance: choice(["primary", "inverted"]),
            size: choice(["tiny", "extra-small", "small", "medium", "large", "extra-large", "huge"])
        }
    }),
    makeComponent("Display/ProgressBar", "FluentProgressBar", {
        documentation: { description: "Leave value empty for an indeterminate bar." },
        icon: faBarsProgress,
        properties: {
            max: LogicType.number({ default: 100 }),
            min: LogicType.number({ default: 0 }),
            shape: choice(["rounded", "square"]),
            thickness: choice(["medium", "large"]),
            validationState: choice(["success", "warning", "error"]),
            value: LogicType.number()
        }
    }),
    makeComponent("Display/RatingDisplay", "FluentRatingDisplay", {
        icon: faStar,
        properties: {
            color: choice(["neutral", "brand", "marigold"]),
            compact: LogicType.boolean({ description: "Single star with the value." }),
            count: LogicType.number({ description: "Number of ratings, shown next to the stars." }),
            max: LogicType.number({ default: 5 }),
            size: choice(["small", "medium", "large"]),
            value: LogicType.number()
        }
    })
];
