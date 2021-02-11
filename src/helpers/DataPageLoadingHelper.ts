import { Container } from 'vue-typedi'
import StoreModules from '@/store/CreateStoreModules'
import User from '@/models/users/User'
import tokens from '@/tokens'

export default class DataPageLoadingHelper {
  private static get $store (): StoreModules {
    return Container.get(tokens.STORE) as StoreModules
  }

  public static async loadProfile (userId: string): Promise<void> {
    const profileUser: User = this.$store.page.profile.getUser

    if (profileUser === null || profileUser === undefined || profileUser.id.toString() !== userId) {
      this.$store.loading.page.setPageLoading(true)
      await this.$store.page.profile.actionBeforeRouteEnter(userId)

      await setTimeout(() => {
        this.$store.loading.page.setPageLoading(false)
      }, 500)
    }
  }
}
