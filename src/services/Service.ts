import { AxiosInstance } from 'axios'
import { Container } from 'vue-typedi'
import tokens from '@/tokens'

export default class Service {
  /**
     * That's an example of how to inject dependencies into the service.
     *
     * This is actually overly-complicated.
     * And usually `@Inject` decorator is enough.
     * But, since `$axios` is injected via `Nuxt`,
     * we have two conflicting IoC and DI implementations.
     * That's a fix!
     *
     * @returns Global `axios` instance from the IoC container.
     */
  protected get $axios (): AxiosInstance {
    return Container.get(tokens.AXIOS) as AxiosInstance
  }

  // Type model<Type>({@required response, @required model, String key}){
  //     if(response.statusCode != 200) _throwError(statusCode: response.statusCode);
  //
  //     final _data = jsonDecode(utf8.decode(response.bodyBytes));
  //     var _raw;
  //
  //     if(key != null) _raw = _data[key];
  //     else _raw = _data;
  //
  //     Type result = model(_raw);
  //
  //     return result;
  // }
  //
  // List<Type> listModels<Type>({@required response, @required model, @required String key}){
  //     if(response.statusCode != 200) return _throwError(statusCode: response.statusCode);
  //
  //     final _data = jsonDecode(utf8.decode(response.bodyBytes));
  //     final _raws = _data[key] as List;
  //
  //     List<Type> _listModels = List<Type>.from(_raws.map((raw) => model(raw)));
  //
  //     return _listModels;
  // }
}
