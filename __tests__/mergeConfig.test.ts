import { mergeConfig } from "../src/AxiosClient";
import AxiosClient from "../src/index";
import { AxiosClientConfig, AxiosClientRequestConfig } from "../src/types";
import stringify from "../src/stringify";
import axios from "axios";
import nock from "nock";

const protocol = "http://0.0.0.0:8989";

test("mergeConfig", async () => {
    const clientCfg: AxiosClientConfig = {
        baseURL: protocol,
        data: { d1: 1 },
        dataSerializer: stringify,
        onThen: (args) => args.data["d2"] = 2,
        onPost: {
            onThen: (cfg) => expect(cfg.data).toStrictEqual({ d1: 1, d5: 5 }),
            onPre: (cfg) => {
                cfg.data["d4"] = 4;
                return false;
            }
        }
    };
    const methodCfg: AxiosClientRequestConfig = {
        params: { p: 1 },
        onPre: (cfg) => {
            expect(cfg.params).toStrictEqual({ p: 1 });
            expect(cfg.data).toStrictEqual({ d1: 1 });
            cfg.data["d5"] = 5;
            return true;
        },
        dataSerializer: () => "ok"
    };

    const ac = new AxiosClient(axios, clientCfg);
    const postDemo = ac.post("/postDemo/{pv}", methodCfg);

    const scope = nock(protocol)
        .post("/postDemo/demo?p=1", "ok")
        .reply(200, JSON.stringify({ hello: "world" }));
    const data = await postDemo({ pathVars: { pv: "demo" } });
    scope.done();
    expect(data).toStrictEqual({ hello: "world" });
});