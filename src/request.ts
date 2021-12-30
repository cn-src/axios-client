import axios, { AxiosError, Axios } from "axios";
import pathRender from "./pathRender";
import paramConverter from "./paramConverter";

import isAxiosCancel from "axios/lib/cancel/isCancel";
import { AxiosClientRequestConfig } from "./types";

export default async function request<D = any, PV = any, P = any>(
    _axios: Axios,
    _config: AxiosClientRequestConfig<D, PV, P>,
    _args?: AxiosClientRequestConfig<D, PV, P>
) {
    const cfg = Object.assign(Object.assign({}, _config), _args);
    const isCancel = cfg.onPre?.(cfg) === false;

    if (isCancel) {
        throw new axios.Cancel(`Cancel Request: ${cfg.method} ${cfg.url}`);
    }
    const axiosCfg = Object.assign({}, cfg);
    if (axiosCfg.pathVars) {
        axiosCfg.url = pathRender(<string>axiosCfg.url, axiosCfg.pathVars);
    }
    if (axiosCfg.data) {
        axiosCfg["data"] = axiosCfg.dataSerializer
            ? axiosCfg.dataSerializer(axiosCfg.data)
            : (axiosCfg.data as any);
    }
    if (axiosCfg.params) {
        axiosCfg["params"] = paramConverter(URLSearchParams, axiosCfg.params);
    }
    try {
        const promise = await _axios.request(axiosCfg);
        cfg.onThen?.(cfg, promise);
        return cfg.onlyResponseData === true ? promise.data : promise;
    } catch (e) {
        if (isAxiosCancel(e)) {
            throw e;
        }
        const ex = e as AxiosError;
        cfg.onCatch?.(cfg, ex);
        throw cfg.onlyCatchData === true && ex.response ? ex.response.data : ex;
    }
}
