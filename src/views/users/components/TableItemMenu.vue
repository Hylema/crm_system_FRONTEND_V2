<template>
  <v-menu
      v-model="models[item.id]"
      :close-on-content-click="false"
      offset-x
      tile
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on" @click="$emit('click')">{{ field }}</span>
    </template>

    <v-card>
      <v-layout justify-end>
        <v-btn small icon dark color="action" @click="close()"><v-icon>close</v-icon></v-btn>
      </v-layout>
      <v-card-text class="pt-0">
        <slot :close="close"></slot>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import User from '@/models/users/User'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
  // Для каждого меню своя уникальная модель
  models: object;
}

export default Vue.extend({
  name: 'TableItemMenu',
  props: {
    item: User,
    field: String
  },
  mixins: [],
  components: {},
  data () {
    return {
      models: {}
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    close (): void {
      this.models[this.item.id] = false
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
