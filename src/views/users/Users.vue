<template>
  <div>
    <table-toolbar @createUser="createUser()"></table-toolbar>
    <v-data-table
        v-bind="vTable"
        @click:row="showProfile"
        class="elevation-1 tableColor"
    >
      <template v-slot:[`item.email`]="{ item }">
        <table-item-menu :item="item" :field="item.email" @click="setModel(item.email, field.EMAIL)">
          <template scope="props">
            <table-item-text-field
                v-if="patchModel"
                @patch="patchUser(field.EMAIL, item.id, props.close)"
                v-model="patchModel.email"
                :close="props.close"
                :rules="emailRules"
            ></table-item-text-field>
          </template>
        </table-item-menu>
      </template>

      <template v-slot:[`item.lastName`]="{ item }">
        <table-item-menu :item="item" :field="item.lastName" @click="setModel(item.lastName, field.LASTNAME)">
          <template scope="props">
            <table-item-text-field
                v-if="patchModel"
                @patch="patchUser(field.LASTNAME, item.id, props.close)"
                v-model="patchModel.lastName"
                :close="props.close"
                :rules="lastNameRules"
            ></table-item-text-field>
          </template>
        </table-item-menu>
      </template>

      <template v-slot:[`item.firstName`]="{ item }">
        <table-item-menu :item="item" :field="item.firstName" @click="setModel(item.firstName, field.FIRSTNAME)">
          <template scope="props">
            <table-item-text-field
                v-if="patchModel"
                @patch="patchUser(field.FIRSTNAME, item.id, props.close)"
                v-model="patchModel.firstName"
                :close="props.close"
                :rules="firstNameRules"
            ></table-item-text-field>
          </template>
        </table-item-menu>
      </template>

      <template v-slot:[`item.roles`]="{ item }">
        <v-tooltip bottom v-for="role in item.roles" :key="role.id">
          <template v-slot:activator="{ on, attrs }">
            <v-chip
                color="action"
                dark
                v-bind="attrs"
                v-on="on"
            >{{ role.name | onlyFirstSymbolToUpperCase }}</v-chip>
          </template>
          <span>{{ role.name }}</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.lastVisit`]="{ item }">
        <span v-if="item.lastVisit !== null">{{ item.lastVisit | dateFilter | firstSymbolToUpperCase }}</span>
        <span v-else>Ещё не был в сети</span>
      </template>

      <template v-slot:[`item.updated`]="{ item }">
        <span v-if="item.updated !== null">{{ item.updated | dateFilter | firstSymbolToUpperCase }}</span>
        <span v-else>Ещё не бы изменен</span>
      </template>

      <template v-slot:[`item.created`]="{ item }">
        <span v-if="item.created !== null">{{ item.created | dateFilter | firstSymbolToUpperCase }}</span>
        <span v-else>Создан не в системе</span>
      </template>

      <template v-slot:[`item.avatar`]="{ item }">
        <user-avatar :user-prop="item"></user-avatar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            class="mr-2"
            @click.stop="editUser(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            @click.stop="deleteUser(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <dialog-create-update-user
        v-if="changeUser !== null"
        v-model="editCreateDialog"
        :button-title="buttonTitle"
        :dialog-title="dialogTitle"
        :user="changeUser"
        :create="create"
    ></dialog-create-update-user>

    <dialog-delete-user
        v-if="removeUser"
        v-model="deleteDialog"
        :user="removeUser"
    ></dialog-delete-user>
  </div>
</template>

<script lang="ts">
import { Field, Routers } from '@/constants'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CreateUserRequestModel from '@/models/users/request/CreateUserRequestModel'
import DialogCreateUpdateUser from '@/views/users/components/DialogCreateUpdateUser.vue'
import DialogDeleteUser from '@/views/users/components/DialogDeleteUser.vue'
import FieldRules from '@/utils/FieldRules'
import TableItemMenu from '@/views/users/components/TableItemMenu.vue'
import TableItemTextField from '@/views/users/components/TableItemTextField.vue'
import TableToolbar from '@/views/users/components/TableToolbar.vue'
import UpdateUserRequestModel from '@/models/users/request/UpdateUserRequestModel'
import User from '@/models/users/User'
import Vue from 'vue'
import validationErrorsMixins from '@/mixins/vueMixins/validationErrorsMixins'

interface Data {
  // Настройка полей в заголовке таблицы
  tableHeader: object;

  // Название кнопки в диалоге
  buttonTitle: string;

  // Заголовок в диалоге
  dialogTitle: string;

  // Состояние диалога для редактирования и создания пользователя
  editCreateDialog: boolean;

  // Состояние диалога для удаления пользователя
  deleteDialog: boolean;

  // Состояние expand фильтера
  filterIsActive: boolean;

  // Создание или обновление пользователя
  create: boolean;

  // Пользователь, которого нужно тзменить
  changeUser: UpdateUserRequestModel | CreateUserRequestModel;

  // Пользователь, которого нужно удалить
  removeUser: User;
}

export default Vue.extend({
  name: 'name',
  props: {},
  mixins: [validationErrorsMixins],
  components: {
    'dialog-create-update-user': DialogCreateUpdateUser,
    'dialog-delete-user': DialogDeleteUser,
    'table-item-menu': TableItemMenu,
    'table-toolbar': TableToolbar,
    'table-item-text-field': TableItemTextField
  },
  data () {
    return {
      tableHeader: [
        { text: 'id', align: 'start', value: 'id' },
        { text: 'E-mail', value: 'email' },
        { text: 'Аватарка', value: 'avatar' },
        { text: 'Фамилия', value: 'lastName' },
        { text: 'Имя', value: 'firstName' },
        { text: 'Роли пользователя', value: 'roles' },
        { text: 'Последний раз в сети', value: 'lastVisit' },
        { text: 'Изменен', value: 'updated' },
        { text: 'Создан', value: 'created' },
        { text: 'Действия', value: 'actions', sortable: false }
      ],
      buttonTitle: '',
      dialogTitle: '',
      editCreateDialog: false,
      deleteDialog: false,
      create: false,
      filterIsActive: false,
      changeUser: null,
      removeUser: null,
      patchModel: null,
      field: Field
    } as Data
  },
  computed: {
    ...mapMutations({}),
    ...mapGetters({}),
    users (): Array<User> {
      return this.$storeModules.users.getAllUsers
    },
    loadingTable (): boolean {
      return this.$storeModules.loading.users.getLoadingUsers ||
          this.$storeModules.loading.users.getLoadingPutUsers ||
          this.$storeModules.loading.users.getLoadingCreateUsers ||
          this.$storeModules.loading.users.getLoadingDeleteUsers ||
          this.$storeModules.loading.users.getLoadingPatchUsers
    },
    vTable (): object {
      return {
        options: {
          itemsPerPage: 15
        },
        headers: this.tableHeader,
        items: this.users,
        loading: this.loadingTable,
        footerProps: {
          itemsPerPageText: 'Кол-во элементов на странице',
          itemsPerPageOptions: [15, 30, 50, 100]
        },
        noDataText: 'Нет данных',
        loadingText: 'Идет загрузка...'
      }
    }
  },
  methods: {
    ...mapActions({}),
    showProfile (user: User): void {
      this.$router.push({ name: Routers.PROFILE.NAME, params: { id: `${user.id}` } })
    },
    createUser (): void {
      this.buttonTitle = 'Создать'
      this.dialogTitle = 'Создание пользователя'
      this.changeUser = this.getModelCreateUser()
      this.create = true
      this.editCreateDialog = true
    },
    editUser (user: User): void {
      this.buttonTitle = 'Изменить'
      this.dialogTitle = 'Редактирование пользователя'
      this.changeUser = this.getModelEditedUser(user)
      this.create = false
      this.editCreateDialog = true
    },
    deleteUser (user: User): void {
      this.removeUser = user
      this.deleteDialog = true
    },
    getModelEditedUser (user: User): UpdateUserRequestModel {
      const updateUser: UpdateUserRequestModel = UpdateUserRequestModel.getInstance()

      updateUser.id = user.id
      updateUser.email = user.email
      updateUser.firstName = user.firstName
      updateUser.lastName = user.lastName

      return updateUser
    },
    getModelCreateUser (): CreateUserRequestModel {
      const createUser: CreateUserRequestModel = CreateUserRequestModel.getInstance()
      createUser.roleIds = [2]

      return createUser
    },
    setModel (value: string, field: string) {
      const updateUser: UpdateUserRequestModel = UpdateUserRequestModel.getInstance()
      updateUser[field] = value
      this.patchModel = updateUser
    },
    async patchUser (field: string, userId: number, close: Function): void {
      const updateUser: UpdateUserRequestModel = UpdateUserRequestModel.getInstance()
      updateUser.id = userId
      updateUser[field] = this.patchModel[field]
      if (!this.checkResponseOnBadRequest(await this.$storeModules.users.actionPatchUser(updateUser))) close()
    }
  },
  watch: {}
})
</script>

<style scoped lang="sass">

</style>
