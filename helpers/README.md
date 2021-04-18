# Helpers

**自己創建的資料夾，專門放可複用的方法、常數或類別。**

在其它專案，其名可能叫作 lib 或 utils。

**非根目錄所獨有的資料夾**——你可在任何資料夾內創建一個 helpers 子資料夾，只要該資料夾內有可複用的程式碼。那該怎麼決定某個 helper 該放入哪個 helpers 資料夾？一個原則：**離使用的地方愈近愈好**（這個原則也適用於註解和文件）。換言之，唯有當一個 helper 需要或有很大機率將跨資料夾複用，才會將它放入上一層的 helpers，不然就在使用它的檔案的同層開一個 helpers 資料夾放入即可。

若需要複用的程式碼沒有多元到需要開一個 helpers 去做分類，可建立一個 utils.js 檔案放進。

## index.js

依功能區分檔案，若找不到合適的分類，可將該 helper 放進 index.js。

**在外請統一從 index.js 導入**，換言之，非在 index.js 定義的程式碼，需透過 index.js [再導出（re-export）](https://javascript.info/import-export#re-export)，而且是用具名，而非全局（`*`），以便讀者一目瞭然所有可複用的程式碼，也可在移動 helpers 到不同檔案時，不必修改其被導入的路徑（因為都是從 index.js 導入）。

若有需要，可創建子資料夾，並在裡頭放入相關檔案和一個 index.js，其內的 helpers 一樣須統一從**該子資料夾**的 index.js 再導出。