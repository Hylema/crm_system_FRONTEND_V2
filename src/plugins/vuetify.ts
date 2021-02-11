import { Container } from 'vue-typedi'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import tokens from '@/tokens'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function install (): Vuetify {
  Vue.use(Vuetify)

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const vuetify: Vuetify = new Vuetify({
    theme: {
      dark: true,
      themes: {
        light: {
          background: '#edeef0',
          'background-lighter': '#edeef5',
          'background-darker': '#edeef0',
          action: '#4a76a8',
          text: '#000000',
          activeAction: '#809fc2',
          tableColor: '#ffffff'
        },
        dark: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',

          tableColor: '#282d47',
          activeAction: 'rgba(107, 121, 170, 1)',
          action: '#3e455f',
          background: '#1a1d2c',
          'background-lighter': '#1a1d2c',
          'background-darker': '#1a1d2c',
          backgroundTo: '#33333f',
          text: '#b9bbbe'
        }
      }
    }
  })

  Vue.prototype.$vuetify = vuetify
  Container.set(tokens.VUETIFY, vuetify)

  return vuetify
}

const vuetify = install()

export default vuetify
