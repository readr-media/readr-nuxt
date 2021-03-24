<template>
  <div class="report">
    <component :is="featureComponent" :cmsData="transformedReport"></component>
  </div>
</template>

<script>
import archieml from 'archieml'

import intersect from '~/components/helpers/directives/intersect.js'

export default {
  name: 'RdReport',

  directives: {
    intersect,
  },

  props: {
    report: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  computed: {
    featureComponent() {
      return () =>
        import(`~/components/report/${this.transformedReport.slug}/index.vue`)
    },
    transformedReport() {
      const { slug, contentApiData } = this.report

      const aml = JSON.parse(contentApiData)
        .filter(function isNeededType(item) {
          return ['unstyled', 'annotation'].includes(item.type)
        })
        .flatMap(function getContent(item) {
          return item.content
        })
        .join('\n')
      const json = archieml.load(aml) || {}

      return {
        slug,
        contentApiData: json,
      }
    },
  },
}
</script>
