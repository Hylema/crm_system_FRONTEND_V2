<template>
  <v-container v-if="user">
    <v-layout>
      <v-flex md3 class="ma-2">
        <v-card width="100%" min-height="400">
          <v-card-text>
            <v-img
                v-if="user.avatar !== null"
                :src="user.avatar.download"
                lazy-src="https://c7.hotpng.com/preview/135/630/330/falling-in-love-woman-anxiety-student-others.jpg"
                with="100%"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
                v-else
                lazy-src="https://c7.hotpng.com/preview/135/630/330/falling-in-love-woman-anxiety-student-others.jpg"
                with="100%"
            ></v-img>
          </v-card-text>
        </v-card>
        <v-btn block class="mt-2" @click="logOut()" color="error">Выйти из системы</v-btn>
      </v-flex>
      <v-flex md9 class="ma-2">
        <v-card width="100%">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                <strong style="font-size: 30px;">{{ user.lastName }} {{ user.firstName }}</strong>
              </v-list-item-title>
              <v-list-item-subtitle>
<!--                {{ userIsAdmin ? 'Администратор' : 'Пользователь' }}-->
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Routers } from '@/constants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BaseLazyLoadingMixins from '@/mixins/vueMixins/BaseLazyLoadingMixins'
import StoreModules from '@/store/CreateStoreModules'
import User from '@/models/users/User'
import Vue from 'vue'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'Profile',
  // extends: BaseLazyLoadingMixins((to, store: StoreModules, callback: Function) => {
  //   store.users.actionGetUserById(to.params.id).then(response => {
  //     // eslint-disable-next-line standard/no-callback-literal
  //     callback(function () {
  //       this.user = response.value
  //     })
  //   })
  // }),
  props: {},
  mixins: [],
  components: {},
  // async beforeRouteEnter (to, from, next) {
  //   const result: Either<ApiBadRequestException, User> = await store.users.actionGetUserById(to.params.id)
  //   console.log(result, 'result')
  //   next(async vm => {
  //     console.log(vm, 'vm')
  //     vm.user = result.value
  //     return vm.setUser(result.value)
  //   })
  // },
  data () {
    return {} as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    user (): User {
      console.log(this.$storeModules.page.profile.getUser, 'this.$storeModules.page.profile.getUser')
      return this.$storeModules.page.profile.getUser
    }
  },
  methods: {
    ...mapActions({}),
    logOut (): void {
      this.$storeModules.auth.removeAuthorization()
      this.$router.push({ name: Routers.MAIN.NAME })
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
