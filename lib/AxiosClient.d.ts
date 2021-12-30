import { Axios } from "axios";
import { AxiosClientConfig, AxiosClientRequestConfig } from "./types";
/**
 * 根据 axios 创建一个新的 AxiosClient
 */
export default class AxiosClient {
    private readonly _axios;
    private _config?;
    constructor(axios: Axios, config?: AxiosClientConfig);
    request<D = any, PV = any, P = any>(
        config?: AxiosClientRequestConfig<D, PV, P>
    ): (args?: AxiosClientRequestConfig<D, PV, P> | undefined) => Promise<any>;
    config(config: AxiosClientConfig): this;
    /**
     * GET 请求
     */
    get<P = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<never, PV, P>
    ): (args?: AxiosClientRequestConfig<never, PV, P> | undefined) => Promise<any>;
    /**
     * POST 请求
     */
    post<D = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<D, PV, never>
    ): (args?: AxiosClientRequestConfig<D, PV, never> | undefined) => Promise<any>;
    /**
     * POST 请求, Content-Type 为 application/x-www-form-urlencoded，一般用于表单的原始提交。
     */
    postForm<D = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<D, PV, never>
    ): (args?: AxiosClientRequestConfig<D, PV, never> | undefined) => Promise<any>;
    /**
     * POST 请求, Content-Type 为 multipart/form-data, 一般用于文件上传。
     */
    postFormData<D = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<D, PV, never>
    ): (args?: AxiosClientRequestConfig<D, PV, never> | undefined) => Promise<any>;
    /**
     * PUT 请求
     */
    put<D = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<D, PV, never>
    ): (args?: AxiosClientRequestConfig<D, PV, never> | undefined) => Promise<any>;
    /**
     * PATCH 请求
     */
    patch<D = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<D, PV, never>
    ): (args?: AxiosClientRequestConfig<D, PV, never> | undefined) => Promise<any>;
    /**
     * DELETE 请求
     */
    delete<P = any, PV = any>(
        url: string,
        config?: AxiosClientRequestConfig<never, PV, P>
    ): (args?: AxiosClientRequestConfig<never, PV, P> | undefined) => Promise<any>;
}
export declare function mergeConfig<D, PV, P>(
    clientCfg?: AxiosClientConfig,
    methodCfg?: AxiosClientRequestConfig<D, PV, P>
): AxiosClientRequestConfig<D, PV, P>;
