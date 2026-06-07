# shared/ui

公共 UI 控件，完全自绘，不依赖任何浏览器原生 UI 控件。

样式已通过 `shared/shell.css` 的 `@import './assets/css/ui.css'` 全局加载，
页面 HTML 不需要单独引入——只要引用了 `shared/shell.css`，直接 import 即可。

```ts
import { Dialog, Select } from '../shared/ui';
```

## Dialog

### alert

```ts
await Dialog.alert('无棋谱数据');
await Dialog.alert('保存成功', { title: '提示', okText: '好' });
```

### confirm

```ts
const ok = await Dialog.confirm('确定要清空所有历史记录吗？');
if (!ok) return;

const del = await Dialog.confirm('删除该条目？', {
  title: '危险操作',
  confirmText: '删除',
  cancelText: '保留',
  danger: true,
});
```

快捷键：`Enter` 确认，`Esc` 取消，点击 overlay 空白区域取消。

## Select

完全自绘下拉框，不依赖原生 `<select>` 标签。

### HTML 声明

```html
<div data-ui="select"
     id="limitSelect"
     data-value="10"
     data-options='[{"value":"10","label":"最近 10 盘"},{"value":"20","label":"最近 20 盘"}]'></div>
```

### 扫描挂载

```ts
Select.mountAll();  // 扫描所有 [data-ui="select"]
```

### 读取与监听

```ts
const inst = Select.get('#limitSelect');
inst!.getValue();                      // '10'
inst!.setValue('20');                  // 程序化设置，自动触发 onChange
inst!.onChange((v, opt) => {
  console.log('选了', v, opt?.label);
});
```

### 动态替换选项

```ts
inst!.setOptions([{ value: 'a', label: '新选项 A' }]);
```

### 销毁

```ts
inst!.destroy();
```