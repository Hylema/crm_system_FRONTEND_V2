<template>
  <div>
    <v-hover
        v-slot:default="{ hover }"
    >
      <v-card
          @click.stop="dialog = true"
          color="background"
          dismissible
          prominent
          hover
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          style="margin: 10px; cursor: pointer"
      >
        <v-layout justify-space-between>
          <v-card-title class="pb-0" :class="color + '--text'">{{ title }}</v-card-title>
          <v-btn icon dark color="action" @click.stop="remove(index)"><v-icon>close</v-icon></v-btn>
        </v-layout>
        <v-card-text style="width: 100%">
          <strong class="action--text" style="font-size: 16px">{{ body }}</strong>
        </v-card-text>
      </v-card>
    </v-hover>

    <notification-json-dialog v-model="dialog" :json-prop="json"></notification-json-dialog>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NotificationJsonDialog from '@/layouts/app/components/notifications/NotificationJsonDialog.vue'
import Vue from 'vue'

interface Data {
  // show log dialog
  dialog: boolean;
}

export default Vue.extend({
  name: 'NotificationCard',
  props: {
    title: String,
    body: String,
    index: Number,
    color: String,
    json: Object,
    remove: Function
  },
  mixins: [],
  components: {
    'notification-json-dialog': NotificationJsonDialog
  },
  data () {
    return {
      dialog: false
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    showJson (): void {}
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
