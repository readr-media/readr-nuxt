# Components

**[Nuxt 創建的資料夾，沒有特殊功能](https://nuxtjs.org/docs/2.x/directory-structure/components)，專門放任何不屬於 [layouts](https://nuxtjs.org/docs/2.x/directory-structure/layouts) 和 [pages](https://nuxtjs.org/docs/2.x/directory-structure/pages) 的 Vue 元件。**

## 資料夾結構

```
├── app/
├── report/
└── shared/
```

如何有效地組織元件是開發大型網站的頭等難題。依循[區分 Presentational 和 Container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 的思想，app 主要放有狀態（state）、含有業務邏輯（business logic）、需透過 Web APIs 拉取、儲存或發送資料（比如 [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)、[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)）的元件；shared 則放那些無狀態（即便有狀態，也是 [props](https://vuejs.org/v2/guide/components-props.html) 進來的）、單純呈現樣式、不會載入資料或更動（mutate）狀態的元件。

注意，這只是個指導性的原則。有些元件很難做這樣一刀兩斷的區分，嚴格地區分也不代表你就能寫出較好的元件架構。**重點是隔離複雜的狀態邏輯，提升元件的可讀性和複用性。**

另外，即便是單純呈現樣式的元件，也可以放進 app 內，如果它本來就不需要被複用，或它是專門為某個區塊設計的元件，比如 [app/About](./app/About) 裡面的元件。

當然，軟體會不斷演變，過去看來合理的組織方式，也許到今天就不適用了。你該時時注意元件的變化，在適當的時機重新分類。

關於如何組織元件，可參考 [Vue Style Guide](https://v3.vuejs.org/style-guide/) 針對元件的規範以及[這篇文章](https://harlanzw.com/blog/scale-your-vue-components/)。

## 命名規則

**所有在這個資料夾內的元件，都必須以 Rd 作為名稱前綴**，以免跟 HTML 標籤和第三方元件發生衝突。

在 app 和 shared 子資料夾內，可使用資料夾聚合功能或類型相關的元件。此資料夾必須大寫，其下的檔案必須以其名稱作為前綴（加在 Rd 後面），以便於理解和搜尋，並避免衝突。比如：

```
└── shared/
    └── Feedback/
        ├── RdFeedbackButton.vue
        ├── RdFeedbackForm.vue
        └── RdFeedbackThanks.vue
```

## report 資料夾

請見 [components/report/README.md](./report/README.md)。

## helpers 資料夾

不提這個資料夾，是因為它不是 components 所獨有的，詳情可見 [helpers/README.md](../helpers/README.md)。
