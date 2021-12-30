import axios from "axios";
import nock from "nock";
import AxiosClient from "../src/index";
import { Blob } from "buffer";

interface DemoModel {
    p1: number;
}

// noinspection HttpUrlsUsage
const protocol = "http://0.0.0.0:8989";
const defaultClient = new AxiosClient(axios, { baseURL: protocol });

const api = {
    requestDemo: defaultClient.request({
        url: "/requestDemo",
        method: "post",
        pathVars: { id: "id" },
        params: { query: "query" },
        data: { body: "body" },
    }),
    getDemo: defaultClient.get<DemoModel>("/getDemo/{pv}"),
    postDemo: defaultClient.post("/postDemo/{pv}"),
    postFormDemo: defaultClient.postForm("/postFormDemo/{pv}"),
    postFormDataDemo: defaultClient.postFormData("/postFormDataDemo/{pv}"),
    putDemo: defaultClient.put("/putDemo/{pv}"),
    patchDemo: defaultClient.patch("/patchDemo/{pv}"),
    deleteDemo: defaultClient.delete("/deleteDemo/{pv}"),
};

test("getDemo", async () => {
    const scope = nock(protocol)
        .get("/getDemo/demo?p1=1")
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.getDemo({ pathVars: { pv: "demo" }, params: { p1: 1 } });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});

test("postDemo", async () => {
    const scope = nock(protocol)
        .post("/postDemo/demo", { d1: 1 })
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.postDemo({ pathVars: { pv: "demo" }, data: { d1: 1 } });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});

test("postFormDemo", async () => {
    const scope = nock(protocol)
        .post("/postFormDemo/demo", "d1=1&d2=2")
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.postFormDemo({
        pathVars: { pv: "demo" },
        data: { d1: 1, d2: 2 },
    });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});

test("postFormDataDemo", async () => {
    const scope = nock(protocol)
        .post("/postFormDataDemo/demo", () => true)
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.postFormDataDemo({
        pathVars: { pv: "demo" },
        data: { d1: 1, d2: 2, f1: new Blob([]) },
    });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});

test("putDemo", async () => {
    const scope = nock(protocol)
        .put("/putDemo/demo", { d1: 1 })
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.putDemo({ pathVars: { pv: "demo" }, data: { d1: 1 } });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});

test("patchDemo", async () => {
    const scope = nock(protocol)
        .patch("/patchDemo/demo", { d1: 1 })
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.patchDemo({ pathVars: { pv: "demo" }, data: { d1: 1 } });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});

test("deleteDemo", async () => {
    const scope = nock(protocol)
        .delete("/deleteDemo/demo?p1=1")
        .reply(200, JSON.stringify({ hello: "world" }));

    const data = await api.deleteDemo({ pathVars: { pv: "demo" }, params: { p1: 1 } });
    expect(data).toStrictEqual({ hello: "world" });
    scope.done();
});
