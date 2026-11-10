## Tabs

```html
<fluent-ui:Navigation.Tablist v-model="tab">
    <fluent-ui:Navigation.Tab id="general" label="General" />
    <fluent-ui:Navigation.Tab id="advanced" label="Advanced" />
</fluent-ui:Navigation.Tablist>
<div v-if="tab === 'general'">…</div>
<div v-if="tab === 'advanced'">…</div>
```

- Each `Navigation/Tab` needs a unique `id`. The tablist v-model is the id of the selected tab.
- Tabs only switch the selection: render the content next to the tablist with conditions on the bound variable.
- `orientation="vertical"` with `appearance="subtle"` gives a desktop style side navigation.
