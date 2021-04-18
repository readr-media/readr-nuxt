# Assets/Css

此資料夾中有些檔名前會有一個下底線，代表這些檔案不該被**顯式地**導進其它檔案，它們是透過 [nuxt.config.js 的 `css` 屬性](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css)和套件 [style-resources-module](https://github.com/nuxt-community/style-resources-module) 全局導入的。

注意沒劃下底線的 variables.module.scss 有導出 JS 可用的變數。

值得一提的是 CSS 斷點（breakpoint）的使用。本專案直接複製了 CSS 框架 [Bootstrap](https://getbootstrap.com/) 的[斷點功能](https://getbootstrap.com/docs/5.0/layout/breakpoints/)（在 [css/mixins/_breakpoints.scss](./mixins/_breakpoints.scss)），每個斷點的數值都寫在 variables.module.scss。當我們在切版時，請盡可能使用這些已定義好的斷點，並遵循手機優先（mobile-first）的思維，盡可能使用 `@include media-breakpoint-up($lower)`，保持一致性。

另外，不要在最上層使用媒體查詢（media queries） ，而是改用 SCSS 支援的選擇器（selector）內的媒體查詢，以便理解與修改：

```scss
// Bad
.block1 {
  color: #fff;
}
.block2 {
  max-width: 320px;
}
@include media-breakpoint-up(md) {
  .block1 {
    color: #000;
  }
  .block2 {
    max-width: 800px;
  }
}

// Good
.block1 {
  color: #fff;
  @include media-breakpoint-up(md) {
    color: #000;
  }
}
.block2 {
  max-width: 320px;
  @include media-breakpoint-up(md) {
    max-width: 800px;
  }
}
```

_base.css 是從 [Tailwind CSS](https://tailwindcss.com/) 複製過來的，作為基底樣式（概念很像 [Reset CSS](https://meyerweb.com/eric/tools/css/reset/) 或 [Normalize.css](https://necolas.github.io/normalize.css/)），不要動它。任何想新增的全局基底樣式，都放進 _read.scss。