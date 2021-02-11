<template>
  <v-container fluid style="height: 100%; padding: 0px">
    <v-layout align-center justify-center column fill-height>
      <div>
        <strong class="title">{{ 404 }}</strong>
      </div>
      <div style="text-align: center">
        <strong class="title">Такой страницы не существует</strong>
      </div>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  name: 'name',
  props: {},
  mixins: [],
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({})
  },
  methods: {
    ...mapActions({})
  },
  watch: {}
})
</script>

<style scoped lang="sass">
.title
  font-size: 150px
</style>
