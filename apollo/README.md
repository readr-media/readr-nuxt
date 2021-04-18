# Apollo

**自己創建的資料夾，專門放與 GraphQL 查詢語法相關的程式碼。**

## 資料夾結構

```
└── queries/
```

為提升複用性，特別把與 GraphQL 查詢語法的相關操作獨立成一個資料夾，底下又依功能拆分出子資料夾（未來也許會有 fragments 子資料夾）。

## 分類與命名依據

queries 資料夾內的檔案主要是以 CMS 的資料區塊去做分類和取名的，並會區分單複數，比如查詢欄位 `allPosts` 和 `_allPostsMeta` 會放入 posts.js，`Post` 則會另開一個 post.js。除了方便管理，也有利於組合查詢，減少請求數量（關於組合查詢的相關討論，可見此 [issue](https://github.com/apollographql/graphql-tag/issues/169)。本專案目前是用 [graphql-combine-query](https://github.com/domasx2/graphql-combine-query) 達成這個目的）。

## 為什麼不用 .gql？

你可能會發現有些專案是用 .gql 或 .graphql，這跟本專案用的 .js 差在哪？

首先，這兩種格式最終編譯出來的結果是一樣的，JS 能解析 .gql，不過是 [webpack 在背後做功](https://github.com/apollographql/graphql-tag#webpack-loading-and-preprocessing)。用 .gql 的唯一好處就是可以少打一些字，但它有以下缺點：

- 檔案導出的方式不一致。你可以在同一份檔案寫好幾個查詢，並在外[以具名（named）的方式分別導入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_multiple_exports_from_module)。但對於片段（fragment），卻只能[預設（default）導入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#importing_defaults)。這種不一致使人困惑，[有人曾發 PR 想解決這個問題，但進度看起來不太樂觀](https://github.com/apollographql/graphql-tag/pull/257)。
- 語法與 JS 不一致，增加理解成本，而且不能在裡頭寫 JS，靈活性低。

故此，本專案選擇用一般的 JS 檔。
