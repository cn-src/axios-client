import _request from "./request";
import stringify from "./stringify";
import paramConverter from "./paramConverter";
/**
 * 根据 axios 创建一个新的 AxiosClient
 */
export default class AxiosClient {
    _axios;
    _config;
    constructor(axios, config) {
        this._axios = axios;
        this._config = config;
    }
    request(config = {}) {
        const _axios = this._axios;
        const _config = mergeConfig(this._config, config);
        return async function (args) {
            return _request(_axios, _config, args);
        };
    }
    config(config) {
        this._config = config;
        return this;
    }
    /**
     * GET 请求
     */
    get(url, config = {}) {
        config.method = "get";
        config.url = url;
        return this.request(config);
    }
    /**
     * POST 请求
     */
    post(url, config = {}) {
        config.url = url;
        config.method = "post";
        return this.request(config);
    }
    /**
     * POST 请求, Content-Type 为 application/x-www-form-urlencoded，一般用于表单的原始提交。
     */
    postForm(url, config = {}) {
        config.url = url;
        config.method = "post";
        config.dataSerializer = stringify;
        return this.request(config);
    }
    /**
     * POST 请求, Content-Type 为 multipart/form-data, 一般用于文件上传。
     */
    postFormData(url, config = {}) {
        config.url = url;
        config.method = "post";
        config.dataSerializer = (data) => paramConverter(FormData, data);
        return this.request(config);
    }
    /**
     * PUT 请求
     */
    put(url, config = {}) {
        config.url = url;
        config.method = "put";
        return this.request(config);
    }
    /**
     * PATCH 请求
     */
    patch(url, config = {}) {
        config.url = url;
        config.method = "patch";
        return this.request(config);
    }
    /**
     * DELETE 请求
     */
    delete(url, config = {}) {
        config.url = url;
        config.method = "delete";
        return this.request(config);
    }
}
export function mergeConfig(clientCfg, methodCfg) {
    const cfg = Object.assign(Object.assign({}, clientCfg), methodCfg);
    cfg.onlyResponseData = cfg.hasOwnProperty("onlyResponseData") ? cfg.onlyResponseData : true;
    cfg.onlyCatchData = cfg.hasOwnProperty("onlyCatchData") ? cfg.onlyCatchData : true;
    const method = cfg.method?.toLowerCase();
    let onMethod;
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
