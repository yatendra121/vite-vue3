if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,t)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const n={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return n;default:return e(s)}}))).then((e=>{const s=t(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-afb9f189"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.a66b3445.css",revision:"dd03024a0f7480bce9eddac8aa4b953d"},{url:"assets/index.dcf84ecd.js",revision:"4048ec5c1985dd1bb7eba7e08a3b2c39"},{url:"assets/vendor.2150b816.js",revision:"0db33930fe8beb92997410727721fdac"},{url:"index.html",revision:"95020a0a06842ce7ee57ce4072d94338"},{url:"registerSW.js",revision:"cbb7e6f71336f5c4d46480b030ebd641"},{url:"manifest.webmanifest",revision:"7bf318013bed7b8f73e2278f99cb0c98"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));