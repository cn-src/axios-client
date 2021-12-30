::: theorem AxiosClient 简介
AxiosClient 对 axios 进行封装，提高 axios 易用性。
:::

* 易于 API 接口声明与调用分离。
* 提供比 axios 拦截器更易于使用的拦截处理方式。
* 内置数据格式处理。
* 默认提取 axios 响应的 data 部分。

## 创建 AxiosClient 实例

AxiosClient 实例接收 2 个参数
* 参数 axios（必须）： axios 对象。
* 参数 config（可选）：AxiosClient 配置。
```javascript
import AxiosClient from "axios-client";

const defaultClient = new AxiosClient(axios, config);
```

## 集中式声明 API
```javascript
const defaultClient = new AxiosClient(axios, {baseURL: protocol});

export default {
  getDemo: defaultClient.get < DemoModel > ("/getDemo/{pv}"),
  postDemo: defaultClient.post("/postDemo"),
  postFormDemo: defaultClient.postForm("/postFormDemo"),
  postFormDataDemo: defaultClient.postFormData("/postFormDataDemo"),
  putDemo: defaultClient.put("/putDemo"),
  patchDemo: defaultClient.patch("/patchDemo"),
  deleteDemo: defaultClient.delete("/deleteDemo")
}
```

## 调用 API
```javascript
 api.getDemo({pathVars: {pv: "demo"}, params: {p1: 1}})
        .then(function (data) {
            // do something
        });
```

## 配置项
[axios 配置项](http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE)

::: tip 提示
AxiosClient 的配置继承了 axios 的配置，可以在此处配置 axios 自带的配置项。
按就近优先原则，方法别名的配置优先于 AxiosClient 实例的配置，AxiosClient 实例配置中的 onGet、onPost、onPut、onPatch、onDelete 优先于 AxiosClient 实例配置中的 
onPre、onThen、onCatch。
:::

```typescript
export interface AxiosClientConfig {

  /**
   * 路径变量，用于渲染路径中的模板变量。
   */
  pathVars?: PV;

  /**
   * 请求之前的处理，返回 false 则取消请求。
   */
  onPre?: OnPre<D, PV, P>;

  /**
   * 响应成功 then 的处理
   */
  onThen?: OnThen<D, PV, P>;

  /**
   * 响应失败 catch 的处理, 不处理取消请求产生的错误。
   */
  onCatch?: OnCatch<D, PV, P>;

  /**
   * 是否仅返回 Response 的 data 部分，默认为 true。
   */
  onlyResponseData?: boolean;

  /**
   * 是否仅返回 catch 的 data 部分，默认为 true。
   */
  onlyCatchData?: boolean;

  /**
   * data 序列化器。
   */
  dataSerializer?: (data: D) => string | FormData;

  /**
   * 此 AxiosClient 上 GET 请求回调。
   */
  onGet?: Handler<D, PV, P>;

  /**
   * 此 AxiosClient 上 POST 请求回调。
   */
  onPost?: Handler<D, PV, P>;

  /**
   * 此 AxiosClient 上 PUT 请求回调。
   */
  onPut?: Handler<D, PV, P>;

  /**
   * 此 AxiosClient 上 PATCH 请求回调。
   */
  onPatch?: Handler<D, PV, P>;

  /**
   * 此 AxiosClient 上 DELETE 请求回调。
   */
  onDelete?: Handler<D, PV, P>;
}
```

## 方法别名

### request(config)

### get(url, config)
### post(url, config)
### postForm(url, config)

* form 表单格式提交。
* POST 请求, `Content-Type` 为 `application/x-www-form-urlencoded`。
* data 部分已经内置处理成 `a=b&c=d` 数据格式。

### postFormData(url, config)
* `FormData` 格式提交，一般用于文件上传 + 表单字段。
* POST 请求, `Content-Type` 为 `multipart/form-data`。
* data 部分已经内置处理成 FormData 对象。

### put(url, config)
### patch(url, config)
### delete(url, config)