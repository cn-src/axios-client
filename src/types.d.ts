import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosClientRequestConfig<D = any, PV = any, P = any>
    extends AxiosRequestConfig<D> {
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
     * 是否仅返回 Response 的 data 部分。
     */
    onlyResponseData?: boolean;

    /**
     * 是否仅返回 catch 的 data 部分。
     */
    onlyCatchData?: boolean;

    /**
     * data 序列化器。
     */
    dataSerializer?: (data: D) => string | FormData;
}

export interface AxiosClientConfig<D = any, PV = any, P = any>
    extends AxiosClientRequestConfig<D, PV, P> {
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

// export interface AxiosClientRequestArgs<D = any, PV = any, P = any> {
//     pathVars?: PV;
//     params?: P;
//     data?: D;
// }

export interface Handler<D = any, PV = any, P = any> {
    /**
     * 请求之前的处理，返回 false 则取消请求
     */
    onPre?: OnPre<D, PV, P>;

    /**
     * 响应成功 then 的处理
     */
    onThen?: OnThen<D, PV, P>;

    /**
     * 响应失败 catch 的处理, 不处理取消请求产生的错误
     */
    onCatch?: OnCatch<D, PV, P>;
}

export type OnPre<D, PV, P> = (args: AxiosClientRequestConfig<D, PV, P>) => boolean;

export type OnThen<D, PV, P> = (
    args: AxiosClientRequestConfig<D, PV, P>,
    response: AxiosResponse
) => void;

export type OnCatch<D, PV, P> = (
    args: AxiosClientRequestConfig<D, PV, P>,
    error: AxiosError
) => void;
