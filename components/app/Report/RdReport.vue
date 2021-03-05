<template>
  <div class="report">
    <component :is="featureComponent" :cmsData="cmsData"></component>

    <RdReportArticle
      v-if="shouldMountArticle"
      v-show="shouldShowArticle"
      :contents="contentApiData.article.contents"
    />
    <RdReportExtras
      v-if="shouldMountExtras"
      :sections="contentApiData.extras"
    />
    <RdReportCredit
      v-if="shouldMountCredit"
      :authors="contentApiData.credit"
      :publishedAt="contentApiData.publishedAt"
    />
  </div>
</template>

<script>
import archieml from 'archieml'
import { mapState } from 'vuex'

import RdReportArticle from '~/components/app/Report/RdReportArticle.vue'
import RdReportExtras from '~/components/app/Report/RdReportExtras.vue'
import RdReportCredit from '~/components/app/Report/RdReportCredit.vue'

export default {
  name: 'RdReport',

  components: {
    RdReportArticle,
    RdReportExtras,
    RdReportCredit,
  },

  props: {
    report: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  computed: {
    ...mapState('report', [
      'shouldMountArticle',
      'shouldShowArticle',
      'shouldMountExtras',
      'shouldMountCredit',
    ]),

    featureComponent() {
      return () => import(`~/components/report/${this.report.slug}/index.vue`)
    },
    cmsData() {
      const aml = JSON.parse(this.report.contentApiData)
        .filter(function isNeededType(item) {
          return ['unstyled', 'annotation', 'image'].includes(item.type)
        })
        .map(function buildContent({ type, content = [] } = {}) {
          if (type === 'image') {
            const [{ name, urlTabletSized, urlMobileSized }] = content || [{}]
            return `
              {.${type}}
              name: ${name}
              urlMobileSized: ${urlMobileSized}
              urlTabletSized: ${urlTabletSized}
              {}
            `
          }

          return content[0]
        })
        .join('\n')

      const json = archieml.load(aml) || {}

      return {
        ...this.report,
        contentApiData: json,
      }
    },
    contentApiData() {
      return this.cmsData.contentApiData
    },
  },
}
</script>
