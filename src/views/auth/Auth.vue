<template>
  <v-container fluid style="height: 100%; padding: 0px">
    <v-img :src="themeIsDark
    ? require('@/assets/images/darkBackgroundImage.jpg')
    : require('@/assets/images/lightBackgroundImage.jpg')"
           class="bgImage"
           width="100%" height="100%"
           gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
    </v-img>

    <v-layout align-center justify-center fill-height>
      <v-form
          class="card-width"
          ref="form"
          v-model="valid"
      >
        <v-card class="background card-width shadow" width="500" style="padding: 50px;">
          <progress-liner :loading="isLoading"></progress-liner>

          <v-card-title>
            <v-layout align-center justify-center row fill-height style="padding: 40px">
              <h2>Авторизация</h2>
            </v-layout>
          </v-card-title>

          <v-window v-model="currentCard">
            <v-window-item :value="1">
              <v-card-text>
                <text-field-email-component
                    v-model="loginRequestParams.email"
                    :email-rules="emailRules"
                ></text-field-email-component>

                <text-field-password-component
                    v-model="loginRequestParams.password"
                    :password-rules="passwordRules"
                ></text-field-password-component>

                <btn-login-component
                    @click="login()"
                    :prop-is-valid="valid"
                ></btn-login-component>

                <v-layout justify-end>
                  <v-btn text small style="color: #7289da; font-weight: bold" @click="currentCard = 2">
                    Забыли пароль?
                  </v-btn>
                </v-layout>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                    label="Email"
                    outlined
                ></v-text-field>

                <v-btn block dark class="mr-4 action" height="60">Продолжить</v-btn>

                <v-layout justify-end>
                  <v-btn text small style="color: #7289da; font-weight: bold" @click="currentCard = 1">
                    Вспомнили пароль?
                  </v-btn>
                </v-layout>
              </v-card-text>
            </v-window-item>
          </v-window>

        </v-card>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { } from 'either-ts'
import { LoginRequestModel } from '@/models/auth/request/LoginRequestModel'
import { VForm } from '@/mixins/default/types'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BtnLoginInComponent from './components/BtnLoginInComponent.vue'
import Exception from '@/errors/Exception'
import ProgressLinear from '@/components/ProgressLinear.vue'
import TextFieldEmail from './components/TextFieldEmailComponent.vue'
import TextFieldPassword from './components/TextFieldPasswordComponent.vue'
import Vue from 'vue'
import validationErrorsMixins from '@/mixins/vueMixins/validationErrorsMixins'

interface Data {
  // Params for Auth request
  loginRequestParams: LoginRequestModel;

  // CurrentCard
  currentCard: number;

  // Validate fields email and password
  valid: boolean;
}

/** User login pages. */
export default Vue.extend({
  name: 'Auth',
  components: {
    'text-field-email-component': TextFieldEmail,
    'text-field-password-component': TextFieldPassword,
    'btn-login-component': BtnLoginInComponent,
    'progress-liner': ProgressLinear
  },
  mixins: [validationErrorsMixins],
  data () {
    return {
      loginRequestParams: LoginRequestModel.getInstance(),
      currentCard: 1,
      valid: false
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    isLoading (): boolean {
      return this.$storeModules.loading.auth.getLoadingWhenUserLoginIn
    },
    themeIsDark (): boolean {
      return this.$storeModules.theme.getThemeIsDark
    },
    form (): VForm {
      return this.$refs.form as VForm
    }
  },
  methods: {
    ...mapActions({
      DLogin: 'auth/actionLogin'
    }),
    async login (): Promise<void> {
      const result: Either<Exception, boolean> = await this.DLogin(this.loginRequestParams)

      if (result.isOk) await this.$router.push({ name: 'App' })
      else this.checkResponseOnBadRequest(result)
      this.form.validate()
    }
  },
  watch: {}
})
</script>

<style scoped>
.bgImage {
  position: absolute;
  left: 0;
  top: 0;
}
.shadow {
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 20px -1px inset !important;
  border-radius: 7px;
}
</style>
