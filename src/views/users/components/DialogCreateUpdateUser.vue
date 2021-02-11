<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-form
        class="card-width"
        ref="form"
        v-model="valid"
    >
      <v-card class="background">
        <dialog-header
            v-model="dialog"
            :loading="loading"
            :title="dialogTitle"
        ></dialog-header>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                    v-bind="vTextField"
                    maxlength="40"
                    v-model="user.email"
                    label="E-mail"
                    :rules="emailRules"
                ></v-text-field>
                <v-text-field
                    v-bind="vTextField"
                    maxlength="20"
                    v-model="user.firstName"
                    label="Имя"
                    :rules="firstNameRules"
                ></v-text-field>
                <v-text-field
                    v-bind="vTextField"
                    maxlength="30"
                    v-model="user.lastName"
                    label="Фамилия"
                    :rules="lastNameRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" :loading="loading" class="action" dark @click="save()">{{ buttonTitle }}</v-btn>
          <v-btn color="action" dark outlined @click="dialog = false">Назад</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import 'either-ts'
import { VForm } from '@/mixins/default/types'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DialogHeader from '@/components/DialogHeader.vue'
import Vue from 'vue'
import validationErrorsMixins from '@/mixins/vueMixins/validationErrorsMixins'

interface Data {
  // Validate fields email and password
  valid: boolean;
}

export default Vue.extend({
  name: 'DialogCreateUpdateUser',
  props: {
    value: Boolean,
    create: Boolean,
    dialogTitle: String,
    buttonTitle: String,
    user: Object
  },
  mixins: [validationErrorsMixins],
  components: {
    'dialog-header': DialogHeader
  },
  data () {
    return {
      valid: false
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    form (): VForm {
      return this.$refs.form as VForm
    },
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
      return this.user === null
        ? this.$storeModules.loading.users.getLoadingCreateUsers
        : this.$storeModules.loading.users.getLoadingPutUsers
    },
    vTextField (): object {
      return {
        color: 'action',
        clearable: true,
        outlined: true,
        counter: true
      }
    }
  },
  methods: {
    ...mapActions({}),
    async save () {
      if (this.user !== null) {
        if (!this.checkResponseOnBadRequest(await this.$storeModules.users.actionPutUser(this.user))) this.dialog = false
      } else {
        if (!this.checkResponseOnBadRequest(await this.$storeModules.users.actionCreateUser(this.user))) this.dialog = false
      }

      this.form.validate()
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
