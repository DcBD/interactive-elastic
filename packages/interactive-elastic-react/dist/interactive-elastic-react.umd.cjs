(function(c,d){typeof exports=="object"&&typeof module<"u"?d(exports,require("react/jsx-runtime"),require("react"),require("@tanstack/react-query")):typeof define=="function"&&define.amd?define(["exports","react/jsx-runtime","react","@tanstack/react-query"],d):(c=typeof globalThis<"u"?globalThis:c||self,d(c["interactive-elastic-react"]={},c["react/jsx-runtime"],c.React,c.ReactQuery))})(this,function(c,d,m,y){"use strict";/**
 * @license MIT <https://opensource.org/licenses/MIT>
 * @copyright Michael Hart 2022
 */const f=new TextEncoder,q={appstream2:"appstream",cloudhsmv2:"cloudhsm",email:"ses",marketplace:"aws-marketplace",mobile:"AWSMobileHubService",pinpoint:"mobiletargeting",queue:"sqs","git-codecommit":"codecommit","mturk-requester-sandbox":"mturk-requester","personalize-runtime":"personalize"},E=new Set(["authorization","content-type","content-length","user-agent","presigned-expires","expect","x-amzn-trace-id","range","connection"]);class R{constructor({method:e,url:t,headers:n,body:o,accessKeyId:s,secretAccessKey:a,sessionToken:h,service:C,region:T,cache:B,datetime:N,signQuery:_,appendSessionToken:G,allHeaders:L,singleEncode:$}){if(t==null)throw new TypeError("url is a required option");if(s==null)throw new TypeError("accessKeyId is a required option");if(a==null)throw new TypeError("secretAccessKey is a required option");this.method=e||(o?"POST":"GET"),this.url=new URL(t),this.headers=new Headers(n||{}),this.body=o,this.accessKeyId=s,this.secretAccessKey=a,this.sessionToken=h;let v,x;(!C||!T)&&([v,x]=O(this.url,this.headers)),this.service=C||v||"",this.region=T||x||"us-east-1",this.cache=B||new Map,this.datetime=N||new Date().toISOString().replace(/[:-]|\.\d{3}/g,""),this.signQuery=_,this.appendSessionToken=G||this.service==="iotdevicegateway",this.headers.delete("Host"),this.service==="s3"&&!this.signQuery&&!this.headers.has("X-Amz-Content-Sha256")&&this.headers.set("X-Amz-Content-Sha256","UNSIGNED-PAYLOAD");const u=this.signQuery?this.url.searchParams:this.headers;if(u.set("X-Amz-Date",this.datetime),this.sessionToken&&!this.appendSessionToken&&u.set("X-Amz-Security-Token",this.sessionToken),this.signableHeaders=["host",...this.headers.keys()].filter(r=>L||!E.has(r)).sort(),this.signedHeaders=this.signableHeaders.join(";"),this.canonicalHeaders=this.signableHeaders.map(r=>r+":"+(r==="host"?this.url.host:(this.headers.get(r)||"").replace(/\s+/g," "))).join(`
`),this.credentialString=[this.datetime.slice(0,8),this.region,this.service,"aws4_request"].join("/"),this.signQuery&&(this.service==="s3"&&!u.has("X-Amz-Expires")&&u.set("X-Amz-Expires","86400"),u.set("X-Amz-Algorithm","AWS4-HMAC-SHA256"),u.set("X-Amz-Credential",this.accessKeyId+"/"+this.credentialString),u.set("X-Amz-SignedHeaders",this.signedHeaders)),this.service==="s3")try{this.encodedPath=decodeURIComponent(this.url.pathname.replace(/\+/g," "))}catch{this.encodedPath=this.url.pathname}else this.encodedPath=this.url.pathname.replace(/\/+/g,"/");$||(this.encodedPath=encodeURIComponent(this.encodedPath).replace(/%2F/g,"/")),this.encodedPath=A(this.encodedPath);const k=new Set;this.encodedSearch=[...this.url.searchParams].filter(([r])=>{if(!r)return!1;if(this.service==="s3"){if(k.has(r))return!1;k.add(r)}return!0}).map(r=>r.map(g=>A(encodeURIComponent(g)))).sort(([r,g],[j,P])=>r<j?-1:r>j?1:g<P?-1:g>P?1:0).map(r=>r.join("=")).join("&")}async sign(){return this.signQuery?(this.url.searchParams.set("X-Amz-Signature",await this.signature()),this.sessionToken&&this.appendSessionToken&&this.url.searchParams.set("X-Amz-Security-Token",this.sessionToken)):this.headers.set("Authorization",await this.authHeader()),{method:this.method,url:this.url,headers:this.headers,body:this.body}}async authHeader(){return["AWS4-HMAC-SHA256 Credential="+this.accessKeyId+"/"+this.credentialString,"SignedHeaders="+this.signedHeaders,"Signature="+await this.signature()].join(", ")}async signature(){const e=this.datetime.slice(0,8),t=[this.secretAccessKey,e,this.region,this.service].join();let n=this.cache.get(t);if(!n){const o=await p("AWS4"+this.secretAccessKey,e),s=await p(o,this.region),a=await p(s,this.service);n=await p(a,"aws4_request"),this.cache.set(t,n)}return S(await p(n,await this.stringToSign()))}async stringToSign(){return["AWS4-HMAC-SHA256",this.datetime,this.credentialString,S(await w(await this.canonicalString()))].join(`
`)}async canonicalString(){return[this.method.toUpperCase(),this.encodedPath,this.encodedSearch,this.canonicalHeaders+`
`,this.signedHeaders,await this.hexBodyHash()].join(`
`)}async hexBodyHash(){let e=this.headers.get("X-Amz-Content-Sha256")||(this.service==="s3"&&this.signQuery?"UNSIGNED-PAYLOAD":null);if(e==null){if(this.body&&typeof this.body!="string"&&!("byteLength"in this.body))throw new Error("body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header");e=S(await w(this.body||""))}return e}}async function p(i,e){const t=await crypto.subtle.importKey("raw",typeof i=="string"?f.encode(i):i,{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign"]);return crypto.subtle.sign("HMAC",t,f.encode(e))}async function w(i){return crypto.subtle.digest("SHA-256",typeof i=="string"?f.encode(i):i)}function S(i){return Array.prototype.map.call(new Uint8Array(i),e=>("0"+e.toString(16)).slice(-2)).join("")}function A(i){return i.replace(/[!'()*]/g,e=>"%"+e.charCodeAt(0).toString(16).toUpperCase())}function O(i,e){const{hostname:t,pathname:n}=i;if(t.endsWith(".r2.cloudflarestorage.com"))return["s3","auto"];if(t.endsWith(".backblazeb2.com")){const h=t.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);return h!=null?["s3",h[1]]:["",""]}const o=t.replace("dualstack.","").match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);let[s,a]=(o||["",""]).slice(1,3);if(a==="us-gov")a="us-gov-west-1";else if(a==="s3"||a==="s3-accelerate")a="us-east-1",s="s3";else if(s==="iot")t.startsWith("iot.")?s="execute-api":t.startsWith("data.jobs.iot.")?s="iot-jobs-data":s=n==="/mqtt"?"iotdevicegateway":"iotdata";else if(s==="autoscaling"){const h=(e.get("X-Amz-Target")||"").split(".")[0];h==="AnyScaleFrontendService"?s="application-autoscaling":h==="AnyScaleScalingPlannerFrontendService"&&(s="autoscaling-plans")}else a==null&&s.startsWith("s3-")?(a=s.slice(3).replace(/^fips-|^external-1/,""),s="s3"):s.endsWith("-fips")?s=s.slice(0,-5):a&&/-\d$/.test(s)&&!/-\d$/.test(a)&&([s,a]=[a,s]);return[q[s]||s,a]}var X=Object.defineProperty,I=(i,e,t)=>e in i?X(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,l=(i,e,t)=>(I(i,typeof e!="symbol"?e+"":e,t),t);class K{constructor(e,t){l(this,"username"),l(this,"password"),this.username=e,this.password=t}async getAuthorizationHeader(){return{Authorization:"Basic "+btoa(this.username+":"+this.password)}}}class b{constructor(e){l(this,"credentials"),this.credentials=e}async getAuthorizationHeader(e){const t=new R({...this.credentials,headers:{"Content-Type":"application/x-ldjson"},url:e.url,body:e.body}),{headers:n}=await t.sign();return{authorization:n.get("authorization"),"x-amz-date":n.get("x-amz-date"),"x-amz-security-token":n.get("x-amz-security-token"),"Content-Type":"application/x-ndjson"}}}class W{constructor({endpoint:e,authorization:t}){switch(l(this,"endpoint"),l(this,"authorization"),this.endpoint=e,t.type){case"basic":const{username:n,password:o}=t;this.authorization=new K(n,o);break;case"awsSigned":const{credentials:s}=t;this.authorization=new b(s);break}}async makeRequest(e,t={},n,o="POST"){const s=this.endpoint+e;let a={};this.authorization instanceof b&&(a={url:s,body:n});const h=await this.authorization.getAuthorizationHeader(a);return await(await fetch(s,{method:o,headers:{...h,...t},body:n})).json()}}class U{constructor({apiOptions:e}){l(this,"api"),this.api=new W(e)}async get({path:e}){return this.api.makeRequest(e,{},null,"GET")}async post({path:e,body:t}){return this.api.makeRequest(e,{"Content-Type":"application/json"},t,"POST")}async search({index:e,body:t}){return this.post({path:`/${e}/_search`,body:t})}}class M extends U{async getClusterHealth(){return this.get({path:"/_cluster/health"})}}const z=m.createContext(null);function D({authorization:i,endpoint:e,children:t,reactQueryClient:n}){const o=new M({apiOptions:{authorization:i,endpoint:e}}),s=m.useMemo(()=>n||new y.QueryClient,[n]);return d.jsx(y.QueryClientProvider,{client:s,children:d.jsx(z.Provider,{value:o,children:t})})}function H(){return m.useContext(z)}function Q(i=1e3){const e=H();return y.useQuery({queryKey:["clusterHealth"],queryFn:async()=>await e.getClusterHealth(),retryDelay:i})}c.ReadonlyOpensearch=D,c.useClient=H,c.useClusterHealth=Q,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
