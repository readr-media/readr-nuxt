# Server

**Nuxt 創建的資料夾，有特殊功能，專門放與伺服器相關的程式碼。**

在某一版之後的 Nuxt 便不再會自動創建這個資料夾。

注意，任何在此資料夾內發生的修改，都不會觸發熱重載（hot reload），而是會重新編譯，較花時間。

與伺服器中介軟體相關的程式碼，應放進 [server-middleware](./server-middleware/) 資料夾。與伺服器網路連結相關的變數設定，可考慮 [nuxt.config.js 的 `server` 屬性](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server)。
