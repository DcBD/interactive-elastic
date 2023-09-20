var u = Object.defineProperty;
var d = (s, t, e) => t in s ? u(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var n = (s, t, e) => (d(s, typeof t != "symbol" ? t + "" : t, e), e);
import { AwsV4Signer as p } from "aws4fetch";
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
    const e = typeof this.credentials == "function" ? await this.credentials() : this.credentials, i = new p({
      ...e,
      headers: {
        "Content-Type": "application/x-ldjson"
      },
      url: t.url,
      body: t.body
    }), { headers: a } = await i.sign();
    return {
      authorization: a.get("authorization"),
      "x-amz-date": a.get("x-amz-date"),
      "x-amz-security-token": a.get("x-amz-security-token"),
      "Content-Type": "application/x-ndjson"
    };
  }
}
class w {
  constructor({ endpoint: t, authorization: e }) {
    n(this, "endpoint");
    n(this, "authorization");
    switch (this.endpoint = t, e.type) {
      case "basic":
        const { username: i, password: a } = e;
        this.authorization = new l(i, a);
        break;
      case "awsSigned":
        const { credentials: r } = e;
        this.authorization = new c(r);
        break;
    }
  }
  async makeRequest(t, e = {}, i, a = "POST") {
    const r = this.endpoint + t;
    let o = {};
    this.authorization instanceof c && (o = {
      url: r,
      body: i
    });
    const h = await this.authorization.getAuthorizationHeader(o);
    return await (await fetch(r, {
      method: a,
      headers: {
        ...h,
        ...e
      },
      body: i
    })).json();
  }
}
class y {
  constructor({
    apiOptions: t
  }) {
    n(this, "api");
    this.api = new w(t);
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
class A extends y {
  async getClusterHealth() {
    return this.get({ path: "/_cluster/health" });
  }
}
export {
  A as ReadOnlyClient
};
