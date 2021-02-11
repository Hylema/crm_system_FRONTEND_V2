import { Component } from 'vue-property-decorator'
import { useStore } from 'vuex-simple'
import StoreModules from '@/store/CreateStoreModules'
import Vue from 'vue'

@Component({})
export default class UseStoreModules extends Vue {
  public store: StoreModules = useStore(this.$store)
}
