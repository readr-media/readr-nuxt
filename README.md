# readr-nuxt

本專案採用 [Nuxt.js](https://nuxtjs.org/) 的[伺服端渲染（Server Side Rendering](https://nuxtjs.org/docs/2.x/concepts/server-side-rendering)），又稱同構渲染（Universal Rendering）。

## 如何開始？

1. 先決條件：
   - 安裝套件管理器 [Yarn](https://classic.yarnpkg.com/en/docs/install)。
   - 確保 [Node.js](https://nodejs.org/en/) 版本在 14 以上。由於不同專案對於 Node 會有不同要求，你可能需要 Node 版本管理器。你可以安裝知名的 [nvm](https://github.com/nvm-sh/nvm)，也可以試試看我覺得更好用的 [n](https://github.com/tj/n)。
2. 在 `yarn install` 之前，你身上要有 config：
   - config 放在本專案根目錄的 [configs 資料夾](./configs/)，裡面有一個 [config.sample.js](./configs/config.sample.js)，但那是假的，真正的 config 非常機密，**絕對不能上傳到 GitHub 上**。雖然我們已經在 .gitignore 指定忽視這些檔案，但仍請你務必小心。
   - 那 config 要跟誰拿？有兩種方法：
     1. 如果你已經可以登入本公司所使用的雲端服務 GCP（Google Cloud Platform），那進到 [Home/Dashboard](https://console.cloud.google.com/home/dashboard)，點擊左上角的三條槓槓選單，找到 Source Repositories，點下去，你會進到一個擁有許多 repositories 的頁面。config 有分正式機和測試機，在本地（local）端開發需要測試機的 config。點選名字為 configs 的 repo，進去後，依循 readr-media/readr-nuxt/dev 的路徑，你會看到裡頭有三份檔案 config.js、credentials.json 和 token.json。由於這份教學文件會過時，若檔案數量或名稱不符，你不確定自己要哪幾份檔案，可以問其他前端工程師。但就目前的情況，這三個檔案你都要下載，至於要怎麼下載，可以看[這份文件](https://cloud.google.com/source-repositories/docs/cloning-repositories)。如果你不想一開始就花這麼多時間，可以直接複製貼上檔案內的程式碼，也可以試試第二種方法（不過你未來總是要知道如何操作 Cloud Source Repositories，比如當你要更新 config 時，現在先了解也無妨）。
     2. 直接跟有 config 的工程師拿。
   - 拿到 config 後，注意 config.js 中的 `ENV` 是不是 `'local'`；若不是，請改成 `'local'`（`ENV` 是拿來區分本地、測試（`dev`）和正式（`prod`）環境的變數）。
   - 把 config 全丟進 [configs 資料夾](./configs/)。
3. 在終端機輸入 `yarn install`。
4. 安裝完套件後，輸入 `yarn dev`，等它構建完，會有一個 `Server listening on XXX` 的指示，將 `XXX` 輸進瀏覽器的網址列，Enter，你就能看見 READr 囉！

## Environment Variables
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| --- | --- | --- | --- |
| RELEASE_TARGET | 字串 | unknown | 出現在 [kubernetes-configs](https://github.com/mirror-media/kubernetes-configs) 中，但找不到使用地方，作用不明 |

## Feature Toggle
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| --- | --- | --- | --- |

## 資料夾結構

```
├── apollo/
│   └── queries/
├── assets/
│   ├── css/
│   └── imgs/
│       └── report/
├── components/
│   ├── app/
│   ├── helpers/
│   ├── report/
│   ├── mesh/
│   └── shared/
├── configs/
├── helpers/
├── layouts/
├── middleware/
├── pages/
├── plugins/
│   └── vue-plugins/
├── server/
├── server-middleware/
│   └── apis/
├── static/
└── store/
```

有很多資料夾是 Nuxt 自動創建的，我會建議你至少看過 [Nuxt 官方對各個資料夾的解說](https://nuxtjs.org/docs/2.x/get-started/directory-structure)。底下，我會針對每個資料夾做一簡要的說明。

### apollo 資料夾

請見 [apollo/README.md](./apollo/README.md)。

### assets 資料夾

請見 [assets/README.md](./assets/README.md)。

### components 資料夾

請見 [components/README.md](./components/README.md)。

### configs 資料夾

請見 [configs/README.md](./configs/README.md)。

### helpers 資料夾

請見 [helpers/README.md](./helpers/README.md)。

### layouts 資料夾

請見 [layouts/README.md](./layouts/README.md)。

### middleware 資料夾

請見 [middleware/README.md](./middleware/README.md)。

### pages 資料夾

請見 [pages/README.md](./pages/README.md)。

### plugins 資料夾

請見 [plugins/README.md](./plugins/README.md)。

### server 資料夾

請見 [server/README.md](./server/README.md)。

### server-middleware 資料夾

請見 [server-middleware/README.md](./server-middleware/README.md)。

### static 資料夾

請見 [static/README.md](./static/README.md)。

### store 資料夾

請見 [store/README.md](./store/README.md)。

## 部署

目前採用 Cloud Build 進行自動化部署，共有 dev、staging、prod 三個分支，須以發 PR 的方式合併分支。

當功能已在 feature branch 開發完畢，即可發 PR 並 merge 進 dev 分支，便會觸發自動化部署並更新測試機。
若要將專案推到正式機，須經 PM（產品經理）確認，再從 dev 分支發 PR merge到 staging 分支，確認 staging 功能正常後，接著再發 PR 至 prod 分支。其中，正式機的部署目前需要手動核准。

## 命名規範

[components 資料夾](./components/)的元件名稱一率採用 UpperCamelCase。其它資料夾與檔案，除非有特殊原因，不然一率採用 kebab-case。

盡可能使用[具名導入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_multiple_exports_from_module)，以利 [tree shaking](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking)。使用具名導入時，可能會使變數來源變得不清，此時建議加上以被導入的套件為名的前綴，比如：

```javascript
import { get as axiosGet } from 'axios'
```

若套件名有多個單字，可考慮將其全部連起小寫，以利識別實際導出的變數名：

```javascript
import { get as jscookieGet } from 'js-cookie'
```

## Git 開發流程

採用 [GitHub flow](https://guides.github.com/introduction/flow/)。

你應該時時與 dev 分支上的程式碼同步，至少每次推 commit 或發 PR 到 dev 前，都要先 `git pull -r upstream dev`，**盡早在本地解決衝突**。

## Git Commit 訊息規範

遵守 [Angular 製定的 commit 訊息規範](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)。

若找不到適合的 [type](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)，可用 chore。

關於如何選擇正確的 type，除了符合 Angular 對該 type 的定義，也可以想：**未來的開發者該以什麼樣的態度來理解這段紀錄？**

若是 fix，就代表這次修改是要解決一個錯誤，那開發者就要找出錯誤在哪裡；若是 refactor，就代表這次修改不會影響任何程式可見的外部行為，開發者可以專注於重構手法；若是 style，就代表這次修改與程式碼風格有關，開發者若是在找某個功能是怎麼演變的，便可以跳過這個 commit。

換言之，一個好的 type（或更廣泛來說，一個好的 commit 訊息、好的 commit 紀錄），可以讓開發者更快速地理解這次修改是在做什麼，並把注意力投注在正確的地方。

關於如何撰寫一個好的 commit 訊息，可參考[這篇文章](https://chris.beams.io/posts/git-commit/)。

## 瀏覽器兼容

支援 **READr 訪客使用率 >= 0.05%** 的瀏覽器。

如何知道瀏覽器使用率？[用 Can I use 網站分析 READr 的 GA（Google Analytics）資料](https://www.stefanjudis.com/today-i-learned/you-can-import-google-analytics-stats-in-caniuse-com/)，看在 2019/07/13 到 2020/07/13 這一年間進到 READr 官網的訪客（visitors）用了哪些瀏覽器。

獲取分析後，先使用 [browserslist defaults](https://github.com/browserslist/browserslist#full-list)（> 0.5%, last 2 versions, Firefox ESR, not dead），再透過以下設定覆蓋：

- IE 11 = 0.01%，不支援 IE。
- Edge 18 = 0.43%，支援 Edge >= 18。
- Chrome 49 = 0.09%，支援 Chrome >= 49。
- Firefox 71 = 0.2%，支援 Firefox >= 71。
- Safari 12.1 = 0.1%，支援 Safari >= 12.1。
- Safari & Chrome for iOS 10.0-10.2 = 0.08%，支援 iOS >= 10.0。
- Samsung Internet 9.2 = 0.13%，支援 Samsung >= 9.2。
- Opera 46 for Android = 0.05%、Opera 65 = 0.09，支援 Opera >= 46。
- Opera Mobile 12 = 0.05%，支援 OperaMobile >= 12。
- Android browser 資料不足，使用 defaults。
- Chrome for Android 資料不足，使用 defaults。

將設定寫在 [.browserslistrc](./.browserslistrc)（針對 CSS）和 [nuxt.config.js](./nuxt.config.js) 的 [`build.babel.presets`](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#presets)（針對 JS）。
