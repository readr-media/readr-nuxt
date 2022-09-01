# Pages

**[Nuxt 創建的資料夾，有特殊功能](https://nuxtjs.org/docs/2.x/directory-structure/pages)，專門放與頁面對應的 Vue 元件。**

##文章頁
在 CMS 的 post 中，若「**樣式**」欄位選擇不同選項，會影響呈現的路徑和樣式。相關設定包含 **helpers/post.js** 的 **getHref** 函式。

針對 **News**、**Embedded**、**Frame**、**Blank** 這四個選項，會判斷樣式並交由不同元件呈現內容

```javascript
<template>
  <div class="post-and-report-wrapper">
    <RdBlank v-if="shouldMountBlank" :post="post" />
    <RdFrame v-if="shouldMountFrame" :post="post" />
    <RdNews v-if="shouldMountNews" :news="post" />
    <RdReport v-if="shouldMountEmbeddedReport" :report="post" />
  </div>
</template>
```

針對 **Report**、**Project3** 這兩個選項，會判斷樣式並利用 slug 導向對應網址。這兩類樣式的 slug 必須填寫，不然會導到錯誤頁。

```javascript
if ((this.postStyle === 'report' || this.postStyle === 'project3') && window) {
  if (this.postSlug) {
    const url = this.postStyle === 'report' ? 'project' : 'project/3'
    window.location.href = `${SITE_URL}/${url}/${this.postSlug}`
  } else {
    this.$nuxt.error({ statusCode: 404 })
  }
}
```

- News：路徑是 **./post/post id** ，交由 **RdNews** 元件，用於一般文章頁。
- Embedded：路徑是 **./post/post id** ，交由 **RdReport.vue** 元件，用 **archieml** 解析內容，專門用於上稿在 readr-nuxt 內部的客製化專題。
- Frame：路徑是 **./post/post id** ，交由 **RdFrame.vue** 元件，用於內文是 iframe 且有特殊導覽列的文章。
- Blank：路徑是 **./post/post id** ，交由 **RdBlank.vue** 元件，主要用於內文是 iframe 且無需導覽列的文章。
- Report：路徑是 **./report/post slug** ，用於原本就部署於 ./report 路徑底下的舊專題。
- Project3：**./project/3/post slug** ，用於部署於 ./project/3 路徑底下的較新專題。
