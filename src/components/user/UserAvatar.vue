<template>
  <span>
    <v-tooltip bottom v-if="user.avatar" color="activeAction" :disabled="!showFio">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-on="on" v-bind="attrs" class="mr-2" :size="imageSize">
            <v-img
                :src="user.avatar.download"
                lazy-src="https://c7.hotpng.com/preview/135/630/330/falling-in-love-woman-anxiety-student-others.jpg"
            ></v-img>
          </v-avatar>
        </template>
        <strong class="ml-1" v-if="showFio">{{ `${user.lastName} ${user.firstName}` }}</strong>
    </v-tooltip>
    <v-tooltip bottom v-else color="activeAction" :disabled="!showFio">
        <template v-slot:activator="{ on, attrs }">
            <v-avatar v-on="on" v-bind="attrs" color="action" dark class="mr-2 white--text" :size="imageSize">
              <strong>{{ user.lastName | onlyFirstSymbolToUpperCase }}</strong>
              <strong>{{ user.firstName | onlyFirstSymbolToUpperCase }}</strong>
            </v-avatar>
        </template>
        <strong class="ml-1" v-if="showFio">{{ `${user.lastName} ${user.firstName}` }}</strong>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from 'vuex'
import User from '@/models/users/User'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'name',
  props: {
    userProp: Object,
    sizeProp: Number,
    showFioProp: Boolean
  },
  mixins: [],
  components: {},
  data () {
    return {} as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    imageSize (): number {
      return this.sizeProp === undefined ? 40 : this.sizeProp
    },
    user (): User {
      if (this.userProp === undefined) return this.$storeModules.auth.getCurrentAuthUser

      return this.userProp
    },
    showFio (): boolean {
      if (this.showFioProp === undefined) return false

      return this.showFioProp
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
