# Configs

**自己創建的資料夾，專門放機密或會隨著環境變動的程式碼。**

## 資料夾結構

```
└── config.sample.js
```

目前 readr-nuxt 有三種環境：本地（local）、測試（development）和正式（production）。

若只是常數（constant），但不會隨著環境變動，可考慮放在 helpers 資料夾，比如 [helpers/meta.js](helpers/meta.js)。

## config.sample.js

雖說這是假的 config，**但請在每次更新 config 後，都一併更改這個檔案**，讓它成為能快速確認 config 內容的統一依據，並留下 git commit 紀錄（也別忘了在 Slack 頻道通知大家你改了哪些 config）。

過去常有這種狀況，就是大家 config 改來改去，最後都長得不太一樣，這時就必須進到 Cloud Source Repositories 確認，過程稍嫌麻煩。另外因為沒有 commit 紀錄，有時也會發生花了一段時間除錯，才發現是自己沒有更新 config（可能是別人忘記通知或自己忘記更新）。持續更新 config.sample.js，可以避免上述問題。
