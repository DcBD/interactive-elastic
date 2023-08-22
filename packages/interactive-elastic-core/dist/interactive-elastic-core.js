var u = Object.defineProperty;
var p = (s, t, e) => t in s ? u(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var n = (s, t, e) => (p(s, typeof t != "symbol" ? t + "" : t, e), e);
import { AwsV4Signer as d } from "aws4fetch";
class l {
  constructor(t, e) {
    n(this, "username");
    n(this, "password");
    this.username = t, this.password = e;
  }
  async getAuthorizationHeader() {
    return {
      Authorization: "Basic " + btoa(this.username + ":" + this.password)
    };
  }
}
class c {
  constructor(t) {
    n(this, "credentials");
    this.credentials = t;
  }
  async getAuthorizationHeader(t) {
    const e = new d({
      ...this.credentials,
      headers: {
        "Content-Type": "application/x-ldjson"
      },
      url: t.url,
      body: t.body
    }), { headers: a } = await e.sign();
    return {
      authorization: a.get("authorization"),
      "x-amz-date": a.get("x-amz-date"),
      "x-amz-security-token": a.get("x-amz-security-token"),
      "X-Amz-Content-Sha256": a.get("X-Amz-Content-Sha256"),
      "Content-Type": "application/x-ndjson"
    };
  }
}
class z {
  constructor({ endpoint: t, authorization: e }) {
    n(this, "endpoint");
    n(this, "authorization");
    switch (this.endpoint = t, e.type) {
      case "basic":
        const { username: a, password: r } = e;
        this.authorization = new l(a, r);
        break;
      case "awsSigned":
        const { credentials: i } = e;
        this.authorization = new c(i);
        break;
    }
  }
  async makeRequest(t, e = {}, a, r = "POST") {
    const i = this.endpoint + t;
    let o = {};
    this.authorization instanceof c && (o = {
      url: i,
      body: a
    });
    const h = await this.authorization.getAuthorizationHeader(o);
    return await (await fetch(i, {
      method: r,
      headers: {
        ...h,
        ...e
      },
      body: a
    })).json();
  }
}
class w {
  constructor({
    apiOptions: t
  }) {
    n(this, "api");
    this.api = new z(t);
  }
  async get({ path: t }) {
    return this.api.makeRequest(t, {}, null, "GET");
  }
  async post({ path: t, body: e }) {
    return this.api.makeRequest(t, {
      "Content-Type": "application/json"
    }, e, "POST");
  }
  async search({ index: t, body: e }) {
    return this.post({ path: `/${t}/_search`, body: e });
  }
}
class A extends w {
  async getClusterHealth() {
    return this.get({ path: "/_cluster/health" });
  }
}
export {
  A as ReadOnlyClient
};
