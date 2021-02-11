<template>
  <div>
    <v-layout class="ml-4" row justify-start>
      <v-btn
          class="mr-2"
          height="40px"
      >Сбросить
      </v-btn>
      <v-btn
          color="action"
          class="mr-2"
          height="40px"
          dark>Администратор
      </v-btn>
      <v-btn
          color="action"
          class="mr-2"
          height="40px"
          dark>Пользователь
      </v-btn>
      <v-text-field
          label="ФИО"
          outlined
          dense
          clearable
          class="mr-2"
          style="max-width: 200px;"
      ></v-text-field>
      <v-text-field
          label="E-mail"
          outlined
          dense
          clearable
          class="mr-2"
          style="max-width: 200px;"
      ></v-text-field>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'UsersExpandFilters',
  props: {},
  mixins: [],
  components: {},
  data () {
    return {} as Data
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

</style>
