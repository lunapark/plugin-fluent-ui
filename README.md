# Fluent UI Plugin for Luna Park

[Fluent 2](https://fluent2.microsoft.design) web components (`@fluentui/web-components` v3) for Luna Park. Built for desktop apps, especially Tauri apps that should feel native on Windows 11.

## Development
```bash
pnpm install
pnpm dev        # rebuild dist/ on change
pnpm preview    # serve dist/ on http://127.0.0.1:2084
```
In the Luna Park editor, open **Plugins → Install from URL** and enter `http://127.0.0.1:2084`.

| Script | |
|--------|---|
| `pnpm build` | production build → `dist/index.js` (editor) and `dist/runtime.js` (exported apps) |
| `pnpm typecheck` | `vue-tsc -b` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |

## Configuration
Click the Fluent UI button in the editor header to open the plugin workspace:

| Section | Settings |
|---|---|
| Theme | Brand color (a full Fluent brand ramp is generated from it), color mode (light, dark, auto, high contrast), corners |
| Window | Background (solid, subtle, or transparent for Mica/Acrylic window materials), selectable text |

## Components

| Category | Components |
|---|---|
| Button | Button, AnchorButton, CompoundButton, ToggleButton, MenuButton |
| Form | Field, Label, TextInput, Textarea, Checkbox, Switch, RadioGroup, Radio, Slider, Dropdown, Listbox, Option |
| Display | Text, Link, Badge, CounterBadge, Avatar, Image, Divider, Spinner, ProgressBar, RatingDisplay |
| Navigation | Tablist, Tab, Accordion, AccordionItem, Menu, MenuList, MenuItem, Tree, TreeItem |
| Overlay | Dialog, DialogBody, Drawer, DrawerBody, Tooltip, MessageBar |

## How it works
- `src/runtime/fluent.ts` turns each Fluent custom element into a Vue component (`defineFluent`):
  - `v-model` support (`checked`, `value`, `activeid`, `pressed`, `open`);
  - named Vue slots mapped to the element's `slot="…"` children;
  - camelCase props turned into the kebab-case attributes Fluent uses for presentational options (`iconOnly` → `icon-only`).
- `src/runtime/FluentApp.vue` is the app wrapper. It applies the theme with `setTheme` on its own element, follows the system color scheme and sets desktop defaults (system font, default cursor, no text selection outside inputs).
- Exported apps import the components from `@luna-park/plugin-fluent-ui/runtime`, and `FluentApp` is registered globally in `main.ts`.
- Fluent itself is not bundled: `@fluentui/web-components`, `@fluentui/tokens`, `@microsoft/fast-element` and `@microsoft/focusgroup-polyfill` are external, and `build.frontImports` adds them to the exported app. The app gets a single copy of the official packages and its own code can import them too (`setTheme`, extra components) without defining an element twice. The editor loads them from the npm CDN.
- `src/guides/*.md` tell the AI assistant how nested components fit together.
