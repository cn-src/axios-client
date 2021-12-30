import { Axios } from "axios";
import _request from "./request";
import stringify from "./stringify";
import paramConverter from "./paramConverter";
import { AxiosClientConfig, AxiosClientRequestConfig, Handler } from "./types";

/**
 * 根据 axios 创建一个新的 AxiosClient
 */
export default class AxiosClient {
    private readonly _axios: Axios;
    private _config?: AxiosClientConfig;

    constructor(axios: Axios, config?: AxiosClientConfig) {
        this._axios = axios;
        this._config = config;
    }

    request<D = any, PV = any, P = any>(config: AxiosClientRequestConfig<D, PV, P> = {}) {
        const _axios = this._axios;
        const _config = mergeConfig(this._config, config);
        return async function (args?: AxiosClientRequestConfig<D, PV, P>) {
            return _request(_axios, _config, args);
        };
    }

    config(config: AxiosClientConfig) {
        this._config = config;
        return this;
    }

    /**
     * GET 请求
     */
    get<P = any, PV = any>(url: string, config: AxiosClientRequestConfig<never, PV, P> = {}) {
        config.method = "get";
        config.url = url;
        return this.request<never, PV, P>(config);
    }

    /**
     * POST 请求
     */
    post<D = any, PV = any>(url: string, config: AxiosClientRequestConfig<D, PV, never> = {}) {
        config.url = url;
        config.method = "post";
        return this.request<D, PV, never>(config);
    }

    /**
     * POST 请求, Content-Type 为 application/x-www-form-urlencoded，一般用于表单的原始提交。
     */
    postForm<D = any, PV = any>(url: string, config: AxiosClientRequestConfig<D, PV, never> = {}) {
        config.url = url;
        config.method = "post";
        config.dataSerializer = stringify;
        return this.request<D, PV, never>(config);
    }

    /**
     * POST 请求, Content-Type 为 multipart/form-data, 一般用于文件上传。
     */
    postFormData<D = any, PV = any>(url: string, config: AxiosClientRequestConfig<D, PV, never> = {}) {
        config.url = url;
        config.method = "post";
        config.dataSerializer = (data) => paramConverter(FormData, data);
        return this.request<D, PV, never>(config);
    }

    /**
     * PUT 请求
     */
    put<D = any, PV = any>(url: string, config: AxiosClientRequestConfig<D, PV, never> = {}) {
        config.url = url;
        config.method = "put";
        return this.request<D, PV, never>(config);
    }

    /**
     * PATCH 请求
     */
    patch<D = any, PV = any>(url: string, config: AxiosClientRequestConfig<D, PV, never> = {}) {
        config.url = url;
        config.method = "patch";
        return this.request<D, PV, never>(config);
    }

    /**
     * DELETE 请求
     */
    delete<P = any, PV = any>(url: string, config: AxiosClientRequestConfig<never, PV, P> = {}) {
        config.url = url;
        config.method = "delete";
        return this.request<never, PV, P>(config);
    }
}

export function mergeConfig<D, PV, P>(
    clientCfg?: AxiosClientConfig,
    methodCfg?: AxiosClientRequestConfig<D, PV, P>
): AxiosClientRequestConfig<D, PV, P> {
    const cfg: AxiosClientConfig = Object.assign(Object.assign({}, clientCfg), methodCfg);
    const hasRes = Object.prototype.hasOwnProperty.call(cfg, "onlyResponseData");
    cfg.onlyResponseData = hasRes ? cfg.onlyResponseData : true;
    const hasCatch = Object.prototype.hasOwnProperty.call(cfg, "onlyCatchData");
    cfg.onlyCatchData = hasCatch ? cfg.onlyCatchData : true;
    const method = cfg.method?.toLowerCase();
    let onMethod: Handler | undefined;
    switch (method) {
        case "get":
            onMethod = cfg.onGet;
            delete cfg.onGet;
            break;
        case "post":
            onMethod = cfg.onPost;
            delete cfg.onPost;
            break;
        case "put":
            onMethod = cfg.onPut;
            delete cfg.onPut;
            break;
        case "patch":
            onMethod = cfg.onPatch;
            delete cfg.onPatch;
            break;
        case "delete":
            onMethod = cfg.onDelete;
            delete cfg.onDelete;
            break;
    }
    cfg.onPre = cfg.onPre || onMethod?.onPre || clientCfg?.onPre;
    cfg.onThen = cfg.onThen || onMethod?.onThen || clientCfg?.onThen;
    cfg.onCatch = cfg.onCatch || onMethod?.onCatch || clientCfg?.onCatch;
    return cfg;
}
