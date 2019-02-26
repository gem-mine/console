# Console

一个更好的终端打印工具：

- 开发模式下显示 `[级别] 日期 日志内容 (所在文件与行数)`
- 非开发模式下，不往终端输出

## install

```
npm i @gem-mine/console -S
```

## useage

```js
import Console from '@gem-mine/console'

// 只在 development 条件下开启友好的终端提示
Console.config({
  debug: process.env.NODE_ENV === 'development'
})
```
