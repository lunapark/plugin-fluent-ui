## Menus

```html
<fluent-ui:Navigation.Menu>
    <template #trigger>
        <fluent-ui:Button.MenuButton label="File" appearance="subtle" />
    </template>
    <fluent-ui:Navigation.MenuList>
        <fluent-ui:Navigation.MenuItem label="New" @click="event/newFile" />
        <fluent-ui:Navigation.MenuItem label="Autosave" role="menuitemcheckbox" v-model="autosave" />
    </fluent-ui:Navigation.MenuList>
</fluent-ui:Navigation.Menu>
```

- The trigger slot holds a single `Button/MenuButton`. The default slot holds a single `Navigation/MenuList`.
- For a submenu, put a `Navigation/MenuList` in the `submenu` slot of a `Navigation/MenuItem`.
- With `openOnContext`, the menu opens on right click of the trigger.
