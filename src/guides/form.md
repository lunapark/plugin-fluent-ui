## Form fields

Fluent controls have no built-in label. Wrap each control in a `Form/Field` and put the control in its `input` slot:

```html
<fluent-ui:Form.Field label="Name" message="As shown on your profile">
    <template #input>
        <fluent-ui:Form.TextInput v-model="user.name" placeholder="Jane Doe" />
    </template>
</fluent-ui:Form.Field>
<fluent-ui:Form.Field label="Send notifications" labelPosition="after">
    <template #input>
        <fluent-ui:Form.Checkbox v-model="user.notify" />
    </template>
</fluent-ui:Form.Field>
<fluent-ui:Form.Dropdown v-model="user.theme" placeholder="Theme">
    <fluent-ui:Form.Listbox>
        <fluent-ui:Form.Option value="light" label="Light" />
        <fluent-ui:Form.Option value="dark" label="Dark" />
    </fluent-ui:Form.Listbox>
</fluent-ui:Form.Dropdown>
```

- Use `labelPosition="after"` for `Checkbox`, `Switch` and `Radio`, and the default `above` for text inputs and dropdowns.
- A `Form/Dropdown` always contains exactly one `Form/Listbox`, whose children are `Form/Option`.
- A `Form/RadioGroup` contains `Form/Field` elements with `labelPosition="after"`, each holding one `Form/Radio` with a `value`. The group v-model is the selected value.
