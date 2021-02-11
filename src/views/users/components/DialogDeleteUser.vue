<template>
  <v-dialog
      max-width="1000"
      v-model="dialog"
  >
      <v-card :loading="loading">
        <dialog-header
            v-model="dialog"
            :loading="loading"
            :title="'Удаление пользователя'"
        ></dialog-header>
        <v-card-text>
          <div class="text-h5 pa-4">Вы действительно хотите удалить пользователя
            <user-avatar :show-fio-prop="true" :user-prop="user"></user-avatar> <strong>{{ user.firstName }} {{ user.lastName }}</strong>
            из системы?</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              color="error"
              @click="deleteUser()"
          >Удалить</v-btn>
          <v-btn
              color="action"
              outlined
              @click="dialog = false"
          >Назад</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script lang="ts">
import 'either-ts'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ApiBadRequestException from '@/errors/ApiBadRequestException'
import DialogHeader from '@/components/DialogHeader.vue'
import Exception from '@/errors/Exception'
import User from '@/models/users/User'
import Vue from 'vue'
import validationErrorsMixins from '@/mixins/vueMixins/validationErrorsMixins'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Data {
}

export default Vue.extend({
  name: 'DialogDeleteUser',
  props: {
    value: Boolean,
    user: User
  },
  mixins: [validationErrorsMixins],
  components: {
    'dialog-header': DialogHeader
  },
  data () {
    return {} as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    dialog: {
      get (): boolean {
        return this.value
      },
      set (value: boolean): void {
        if (value === null) value = false

        this.$emit('input', value)
      }
    },
    loading (): boolean {
      return this.$storeModules.loading.users.getLoadingDeleteUsers
    }
  },
  methods: {
    ...mapActions({}),
    async deleteUser () {
      if (!this.checkResponseOnBadRequest(await this.$storeModules.users.actionDeleteUser(this.user.id))) this.dialog = false
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
