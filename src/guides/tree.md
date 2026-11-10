## Trees

```html
<fluent-ui:Navigation.Tree>
    <fluent-ui:Navigation.TreeItem label="Documents" expanded>
        <template #item>
            <fluent-ui:Navigation.TreeItem label="Report.docx" />
            <fluent-ui:Navigation.TreeItem label="Budget.xlsx" />
        </template>
    </fluent-ui:Navigation.TreeItem>
</fluent-ui:Navigation.Tree>
```

- Children of a `Navigation/TreeItem` go in its `item` slot, never in the default slot.
- The direct children of `Navigation/Tree` are `Navigation/TreeItem`.
