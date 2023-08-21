var o = Object.defineProperty;
var c = (e, t, s) => t in e ? o(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var a = (e, t, s) => (c(e, typeof t != "symbol" ? t + "" : t, s), s);
import { AwsV4Signer as h } from "aws4fetch";
class u {
  constructor(t, s) {
    a(this, "username");
    a(this, "password");
    this.username = t, this.password = s;
  }
  async getAuthorizationHeader() {
    return {
      Authorization: "Basic " + btoa(this.username + ":" + this.password)
    };
  }
}
class p {
  constructor(t) {
    a(this, "credentials");
    this.credentials = t;
  }
  async getAuthorizationHeader(t) {
    const s = new h({
      ...this.credentials,
      headers: {
        "Content-Type": "application/x-ldjson"
      },
      url: t.url,
      body: t.body
    }), { headers: n } = await s.sign();
    return n;
  }
}
class d {
  constructor({ endpoint: t, authorization: s }) {
    a(this, "endpoint");
    a(this, "authorization");
    switch (this.endpoint = t, s.type) {
      case "basic":
        const { username: n, password: r } = s;
        this.authorization = new u(n, r);
        break;
      case "awsSigned":
        const { credentials: i } = s;
        this.authorization = new p(i);
        break;
    }
  }
  async makeRequest(t, s = {}, n, r = "POST") {
    return await (await fetch(this.endpoint + t, {
      method: r,
      headers: {
        ...await this.authorization.getAuthorizationHeader(),
        ...s
      },
      body: n
    })).json();
  }
}
class l {
  constructor({
    apiOptions: t
  }) {
    a(this, "api");
    this.api = new d(t);
  }
  async get({ path: t }) {
    return this.api.makeRequest(t, {}, null, "GET");
  }
  async post({ path: t, body: s }) {
    return this.api.makeRequest(t, {
      "Content-Type": "application/json"
    }, s, "POST");
  }
  async search({ index: t, body: s }) {
    return this.post({ path: `/${t}/_search`, body: s });
  }
}
class g extends l {
  async getClusterHealth() {
    return this.get({ path: "/_cluster/health" });
  }
}
export {
  g as ReadOnlyClient
};
