<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" >
    <v-card class="background">
      <v-card-title>
        <v-btn
            class="action"
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <json-viewer
            class="background"
            theme="my-awesome-json-theme"
            :value="jsonNotification"
            copyable
            expanded
        ></json-viewer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import JsonViewer from 'vue-json-viewer'
import Vue from 'vue'

export default Vue.extend({
  name: 'NotificationJsonDialog',
  props: {
    jsonProp: Object,
    value: Boolean
  },
  mixins: [],
  components: {
    'json-viewer': JsonViewer
  },
  data () {
    return {}
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    jsonNotification (): object {
      return this.jsonProp
    },
    dialog: {
      get (): boolean {
        return this.value
      },
      set (value: boolean): void {
        if (value === null) {
          value = false
        }
        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
