## Dialogs and drawers

```html
<fluent-ui:Overlay.Dialog v-model:open="confirmOpen">
    <fluent-ui:Overlay.DialogBody title="Delete file?">
        <fluent-ui:Display.Text text="This can't be undone." />
        <template #action>
            <fluent-ui:Button.Button label="Cancel" @click="confirmOpen = false" />
            <fluent-ui:Button.Button label="Delete" appearance="primary" @click="event/delete" />
        </template>
    </fluent-ui:Overlay.DialogBody>
</fluent-ui:Overlay.Dialog>
```

- A `Overlay/Dialog` contains one `Overlay/DialogBody`, a `Overlay/Drawer` contains one `Overlay/DrawerBody`.
- Open and close them with `v-model:open`. The dialog updates the variable when the user presses Escape or clicks outside.
- Put buttons in the `action` slot (dialog) or `footer` slot (drawer), with the primary one last.
