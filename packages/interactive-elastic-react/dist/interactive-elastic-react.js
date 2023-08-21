import { jsx as H } from "react/jsx-runtime";
import { createContext as E, useMemo as R, useContext as X } from "react";
import { QueryClient as O, QueryClientProvider as I, useQuery as K } from "@tanstack/react-query";
/**
 * @license MIT <https://opensource.org/licenses/MIT>
 * @copyright Michael Hart 2022
 */
const g = new TextEncoder(), W = {
  appstream2: "appstream",
  cloudhsmv2: "cloudhsm",
  email: "ses",
  marketplace: "aws-marketplace",
  mobile: "AWSMobileHubService",
  pinpoint: "mobiletargeting",
  queue: "sqs",
  "git-codecommit": "codecommit",
  "mturk-requester-sandbox": "mturk-requester",
  "personalize-runtime": "personalize"
}, U = /* @__PURE__ */ new Set([
  "authorization",
  "content-type",
  "content-length",
  "user-agent",
  "presigned-expires",
  "expect",
  "x-amzn-trace-id",
  "range",
  "connection"
]);
class D {
  constructor({ method: e, url: t, headers: a, body: o, accessKeyId: i, secretAccessKey: n, sessionToken: h, service: m, region: y, cache: T, datetime: P, signQuery: k, appendSessionToken: x, allHeaders: j, singleEncode: q }) {
    if (t == null)
      throw new TypeError("url is a required option");
    if (i == null)
      throw new TypeError("accessKeyId is a required option");
    if (n == null)
      throw new TypeError("secretAccessKey is a required option");
    this.method = e || (o ? "POST" : "GET"), this.url = new URL(t), this.headers = new Headers(a || {}), this.body = o, this.accessKeyId = i, this.secretAccessKey = n, this.sessionToken = h;
    let f, S;
    (!m || !y) && ([f, S] = M(this.url, this.headers)), this.service = m || f || "", this.region = y || S || "us-east-1", this.cache = T || /* @__PURE__ */ new Map(), this.datetime = P || (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, ""), this.signQuery = k, this.appendSessionToken = x || this.service === "iotdevicegateway", this.headers.delete("Host"), this.service === "s3" && !this.signQuery && !this.headers.has("X-Amz-Content-Sha256") && this.headers.set("X-Amz-Content-Sha256", "UNSIGNED-PAYLOAD");
    const c = this.signQuery ? this.url.searchParams : this.headers;
    if (c.set("X-Amz-Date", this.datetime), this.sessionToken && !this.appendSessionToken && c.set("X-Amz-Security-Token", this.sessionToken), this.signableHeaders = ["host", ...this.headers.keys()].filter((r) => j || !U.has(r)).sort(), this.signedHeaders = this.signableHeaders.join(";"), this.canonicalHeaders = this.signableHeaders.map((r) => r + ":" + (r === "host" ? this.url.host : (this.headers.get(r) || "").replace(/\s+/g, " "))).join(`
`), this.credentialString = [this.datetime.slice(0, 8), this.region, this.service, "aws4_request"].join("/"), this.signQuery && (this.service === "s3" && !c.has("X-Amz-Expires") && c.set("X-Amz-Expires", "86400"), c.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256"), c.set("X-Amz-Credential", this.accessKeyId + "/" + this.credentialString), c.set("X-Amz-SignedHeaders", this.signedHeaders)), this.service === "s3")
      try {
        this.encodedPath = decodeURIComponent(this.url.pathname.replace(/\+/g, " "));
      } catch {
        this.encodedPath = this.url.pathname;
      }
    else
      this.encodedPath = this.url.pathname.replace(/\/+/g, "/");
    q || (this.encodedPath = encodeURIComponent(this.encodedPath).replace(/%2F/g, "/")), this.encodedPath = C(this.encodedPath);
    const w = /* @__PURE__ */ new Set();
    this.encodedSearch = [...this.url.searchParams].filter(([r]) => {
      if (!r)
        return !1;
      if (this.service === "s3") {
        if (w.has(r))
          return !1;
        w.add(r);
      }
      return !0;
    }).map((r) => r.map((u) => C(encodeURIComponent(u)))).sort(([r, u], [A, b]) => r < A ? -1 : r > A ? 1 : u < b ? -1 : u > b ? 1 : 0).map((r) => r.join("=")).join("&");
  }
  async sign() {
    return this.signQuery ? (this.url.searchParams.set("X-Amz-Signature", await this.signature()), this.sessionToken && this.appendSessionToken && this.url.searchParams.set("X-Amz-Security-Token", this.sessionToken)) : this.headers.set("Authorization", await this.authHeader()), {
      method: this.method,
      url: this.url,
      headers: this.headers,
      body: this.body
    };
  }
  async authHeader() {
    return [
      "AWS4-HMAC-SHA256 Credential=" + this.accessKeyId + "/" + this.credentialString,
      "SignedHeaders=" + this.signedHeaders,
      "Signature=" + await this.signature()
    ].join(", ");
  }
  async signature() {
    const e = this.datetime.slice(0, 8), t = [this.secretAccessKey, e, this.region, this.service].join();
    let a = this.cache.get(t);
    if (!a) {
      const o = await l("AWS4" + this.secretAccessKey, e), i = await l(o, this.region), n = await l(i, this.service);
      a = await l(n, "aws4_request"), this.cache.set(t, a);
    }
    return p(await l(a, await this.stringToSign()));
  }
  async stringToSign() {
    return [
      "AWS4-HMAC-SHA256",
      this.datetime,
      this.credentialString,
      p(await z(await this.canonicalString()))
    ].join(`
`);
  }
  async canonicalString() {
    return [
      this.method.toUpperCase(),
      this.encodedPath,
      this.encodedSearch,
      this.canonicalHeaders + `
`,
      this.signedHeaders,
      await this.hexBodyHash()
    ].join(`
`);
  }
  async hexBodyHash() {
    let e = this.headers.get("X-Amz-Content-Sha256") || (this.service === "s3" && this.signQuery ? "UNSIGNED-PAYLOAD" : null);
    if (e == null) {
      if (this.body && typeof this.body != "string" && !("byteLength" in this.body))
        throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");
      e = p(await z(this.body || ""));
    }
    return e;
  }
}
async function l(s, e) {
  const t = await crypto.subtle.importKey(
    "raw",
    typeof s == "string" ? g.encode(s) : s,
    { name: "HMAC", hash: { name: "SHA-256" } },
    !1,
    ["sign"]
  );
  return crypto.subtle.sign("HMAC", t, g.encode(e));
}
async function z(s) {
  return crypto.subtle.digest("SHA-256", typeof s == "string" ? g.encode(s) : s);
}
function p(s) {
  return Array.prototype.map.call(new Uint8Array(s), (e) => ("0" + e.toString(16)).slice(-2)).join("");
}
function C(s) {
  return s.replace(/[!'()*]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase());
}
function M(s, e) {
  const { hostname: t, pathname: a } = s;
  if (t.endsWith(".r2.cloudflarestorage.com"))
    return ["s3", "auto"];
  if (t.endsWith(".backblazeb2.com")) {
    const h = t.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);
    return h != null ? ["s3", h[1]] : ["", ""];
  }
  const o = t.replace("dualstack.", "").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);
  let [i, n] = (o || ["", ""]).slice(1, 3);
  if (n === "us-gov")
    n = "us-gov-west-1";
  else if (n === "s3" || n === "s3-accelerate")
    n = "us-east-1", i = "s3";
  else if (i === "iot")
    t.startsWith("iot.") ? i = "execute-api" : t.startsWith("data.jobs.iot.") ? i = "iot-jobs-data" : i = a === "/mqtt" ? "iotdevicegateway" : "iotdata";
  else if (i === "autoscaling") {
    const h = (e.get("X-Amz-Target") || "").split(".")[0];
    h === "AnyScaleFrontendService" ? i = "application-autoscaling" : h === "AnyScaleScalingPlannerFrontendService" && (i = "autoscaling-plans");
  } else
    n == null && i.startsWith("s3-") ? (n = i.slice(3).replace(/^fips-|^external-1/, ""), i = "s3") : i.endsWith("-fips") ? i = i.slice(0, -5) : n && /-\d$/.test(i) && !/-\d$/.test(n) && ([i, n] = [n, i]);
  return [W[i] || i, n];
}
var Q = Object.defineProperty, B = (s, e, t) => e in s ? Q(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, d = (s, e, t) => (B(s, typeof e != "symbol" ? e + "" : e, t), t);
class N {
  constructor(e, t) {
    d(this, "username"), d(this, "password"), this.username = e, this.password = t;
  }
  async getAuthorizationHeader() {
    return {
      Authorization: "Basic " + btoa(this.username + ":" + this.password)
    };
  }
}
class _ {
  constructor(e) {
    d(this, "credentials"), this.credentials = e;
  }
  async getAuthorizationHeader(e) {
    const t = new D({
      ...this.credentials,
      headers: {
        "Content-Type": "application/x-ldjson"
      },
      url: e.url,
      body: e.body
    }), { headers: a } = await t.sign();
    return a;
  }
}
class G {
  constructor({ endpoint: e, authorization: t }) {
    switch (d(this, "endpoint"), d(this, "authorization"), this.endpoint = e, t.type) {
      case "basic":
        const { username: a, password: o } = t;
        this.authorization = new N(a, o);
        break;
      case "awsSigned":
        const { credentials: i } = t;
        this.authorization = new _(i);
        break;
    }
  }
  async makeRequest(e, t = {}, a, o = "POST") {
    return await (await fetch(this.endpoint + e, {
      method: o,
      headers: {
        ...await this.authorization.getAuthorizationHeader(),
        ...t
      },
      body: a
    })).json();
  }
}
class L {
  constructor({
    apiOptions: e
  }) {
    d(this, "api"), this.api = new G(e);
  }
  async get({ path: e }) {
    return this.api.makeRequest(e, {}, null, "GET");
  }
  async post({ path: e, body: t }) {
    return this.api.makeRequest(e, {
      "Content-Type": "application/json"
    }, t, "POST");
  }
  async search({ index: e, body: t }) {
    return this.post({ path: `/${e}/_search`, body: t });
  }
}
class $ extends L {
  async getClusterHealth() {
    return this.get({ path: "/_cluster/health" });
  }
}
const v = E(null);
function Z({
  authorization: s,
  endpoint: e,
  children: t,
  reactQueryClient: a
}) {
  const o = new $({
    apiOptions: {
      authorization: s,
      endpoint: e
    }
  }), i = R(
    () => a || new O(),
    [a]
  );
  return /* @__PURE__ */ H(I, { client: i, children: /* @__PURE__ */ H(v.Provider, { value: o, children: t }) });
}
function F() {
  return X(v);
}
function ee(s = 1e3) {
  const e = F();
  return K({
    queryKey: ["clusterHealth"],
    queryFn: async () => await e.getClusterHealth(),
    retryDelay: s
  });
}
export {
  Z as ReadonlyOpensearch,
  F as useClient,
  ee as useClusterHealth
};
