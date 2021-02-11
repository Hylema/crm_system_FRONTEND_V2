import { Container } from 'vue-typedi'
import { Message } from '@stomp/stompjs'
import { WebSockets } from '@/constants'
import StoreModules from '@/store/CreateStoreModules'
import tokens from '@/tokens'

export default class WebSocketHelper {
  private static get $store (): StoreModules {
    return Container.get(tokens.STORE) as StoreModules
  }

  public static createWSModel<Model> (message: Message, model: Function, objectKey: string = null): Model {
    this.$store.logger.setNewWSMessage(message)
    return this.createModel<Model>(message, model, objectKey)
  }

  private static createModel<Model> (message: Message, model: Function, objectKey: string = null): Model {
    const dataFromJson: object | Array<object> = JSON.parse(message.body)

    return objectKey === null ? model(dataFromJson) : model(dataFromJson[objectKey])
  }

  public static createListModel<Model> (response: Message, model: Function, objectKey: string = null): Array<Model> {
    this.$store.logger.setNewWSMessage(response)
    const dataFromJson: object | Array<object> = JSON.parse(response.body)

    const data: never[] = objectKey === null ? dataFromJson : dataFromJson[objectKey]

    return Array.from(data.map<Model>((value) => model(value)))
  }

  public static getWsOperationsName (message: Message) {
    for (const [key, value] of Object.entries(WebSockets.toOneObject())) {
      if (typeof value === 'object' && value.ROUTE === message.headers.destination) {
        return value.OPERATION
      }
    }
  }
}
