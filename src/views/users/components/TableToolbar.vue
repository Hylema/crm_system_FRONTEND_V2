<template>
  <div>
    <v-toolbar flat color="background" dense>
      <v-btn
          color="action"
          dark
          class="mb-2"
          @click="filterIsActive = !filterIsActive"
      ><v-icon class="mr-2">tune</v-icon>Фильтры</v-btn>
      <v-spacer></v-spacer>
      <v-btn
          color="action"
          dark
          class="mb-2"
          @click="createUser()"
      >Создать пользователя</v-btn>
    </v-toolbar>
    <v-expand-transition>
      <users-expand-filters v-if="filterIsActive"></users-expand-filters>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import UsersExpandFilters from '@/views/users/components/UsersExpandFilters.vue'
import Vue from 'vue'

interface Data {
  // Состояние фильтра для таблицы пользователя
  filterIsActive: boolean;
}

export default Vue.extend({
  name: 'TableToolbar',
  props: {},
  mixins: [],
  components: {
    'users-expand-filters': UsersExpandFilters
  },
  data () {
    return {
      filterIsActive: false
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    createUser () {
      this.$emit('createUser')
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
