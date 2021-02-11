<template>
  <v-app id="app">
    <v-main class="background">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',
  components: {},
  data: () => ({
    themeIsSet: false
  }),
  computed: {
    themeIsDark (): boolean {
      return this.$storeModules.theme.getThemeIsDark
    }
  },
  watch: {
    themeIsDark: {
      async handler (newValue: boolean) {
        const head = document.head || document.getElementsByTagName('head')[0]
        const link: any = document.createElement('link')

        link.rel = 'stylesheet'
        link.href = 'stylesheet'
        link.id = 'crutch'

        if (newValue) link.href = 'darkTheme.module.css'
        else link.href = 'light.module.css'

        head.appendChild(link)

        if (this.themeIsSet) {
          setTimeout(() => {
            const allLinksLength: number = document.querySelectorAll('link').length

            document.querySelectorAll('link').forEach((value, index: number) => {
              if (value.id && value.id === 'crutch' && index !== allLinksLength - 1) {
                value.remove()
              }
            })
          }, 1000)
        }

        this.themeIsSet = true
      },
      immediate: true
    }
  },
  methods: {}
})
</script>
