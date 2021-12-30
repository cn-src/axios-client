import { Axios } from "axios";
import { AxiosClientRequestConfig } from "./types";
export default function request<D = any, PV = any, P = any>(
    _axios: Axios,
    _config: AxiosClientRequestConfig<D, PV, P>,
    _args?: AxiosClientRequestConfig<D, PV, P>
): Promise<any>;
