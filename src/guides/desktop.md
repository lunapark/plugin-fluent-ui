## Desktop app layout

Fluent UI apps should look like Windows 11 apps, not websites:

```html
<div class="window">
    <fluent-ui:Navigation.Tablist v-model="page" orientation="vertical" appearance="subtle">
        <fluent-ui:Navigation.Tab id="home" label="Home" />
        <fluent-ui:Navigation.Tab id="settings" label="Settings" />
    </fluent-ui:Navigation.Tablist>
    <div class="content">
        <fluent-ui:Display.Text size="500" weight="semibold" text="Settings" />
        <fluent-ui:Form.Field label="Dark mode" labelPosition="after">
            <template #input>
                <fluent-ui:Form.Switch v-model="dark" />
            </template>
        </fluent-ui:Form.Field>
    </div>
</div>
```

- One `appearance="primary"` button per view, for its main action. Other buttons keep the default appearance, or `subtle` in toolbars.
- Use `Display/Text` sizes from the type ramp: 300 for body, 400 for subtitles, 500 to 600 for page titles. Don't use large hero headings.
- Keep spacing compact (tokens `spacing-*`), and use the neutral background tokens for side panes.
- Use `Overlay/MessageBar` for status messages, `Overlay/Dialog` for confirmations, `Navigation/Menu` with `openOnContext` for context menus.
