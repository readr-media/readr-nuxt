# Server-middleware/Api

**專門放與伺服器的 HTTP 請求（request）相關的程式碼。**

readr-nuxt 有很多資料是要靠打 API 取得的，為了避免 API 網址暴露，我們會先把請求發去自己的伺服器，再從伺服器打出真正的 API（為了安全，API 網址不會寫死在專案，而是放在 [configs 資料夾](../../configs/)，並且測試機與正式機所打的網址是不一樣的）。
