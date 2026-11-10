# Fluent UI plugin

Microsoft's Fluent 2 web components (`@fluentui/web-components` v3). Use it for desktop apps, especially Tauri apps that should feel native on Windows 11. Read the `desktop` guide before laying out a page.

## Components
- **Button**: `Button`, `AnchorButton` (link), `CompoundButton` (label + description), `ToggleButton` (v-model boolean), `MenuButton` (menu trigger). Text goes in `label`. `appearance`: primary | outline | subtle | transparent, empty for the default button.
- **Form**: `Field` (label + message around a control in its `input` slot), `Label`, `TextInput`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup` + `Radio`, `Slider`, `Dropdown` + `Listbox` + `Option`. Controls have no label of their own: always wrap them in a `Field`.
- **Display**: `Text` (type ramp sizes 100 to 1000), `Link`, `Badge`, `CounterBadge`, `Avatar`, `Image`, `Divider`, `Spinner`, `ProgressBar`, `RatingDisplay`.
- **Navigation**: `Tablist` + `Tab`, `Accordion` + `AccordionItem`, `Menu` + `MenuList` + `MenuItem`, `Tree` + `TreeItem`.
- **Overlay**: `Dialog` + `DialogBody`, `Drawer` + `DrawerBody` (v-model:open), `Tooltip` (`anchor` = id of the target element), `MessageBar`.

## Theme
The plugin workspace sets the brand color, the color mode (light, dark, auto, high contrast), the corner radius, the window background (solid, subtle or transparent for Mica/Acrylic) and whether all text is selectable. Use the plugin tokens (`brand`, `foreground-*`, `background-*`, `stroke-*`, `spacing-*`, `radius-*`, `font-*`) for custom elements so they follow the theme.
