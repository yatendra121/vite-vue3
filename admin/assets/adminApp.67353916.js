import{g as o,l as a,m as r,o as i,k as l,n,t as s,p as t,F as c}from"./vendor.8f3151c5.js";import{_ as p}from"./plugin-vue_export-helper.5a098b48.js";const d=o({setup(){const e=a();return console.log(e.getters.authProfile),{authProfile:r(()=>e.getters.authProfile)}}}),u={class:"p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"},m={class:"flex-shrink-0"},f=["src"],h={class:"text-xl font-medium text-black"},_={class:"text-gray-500"};function g(e,x,P,v,k,w){return i(),l(c,null,[n(s(e.authProfile)+" ",1),t("div",u,[t("div",m,[t("img",{class:"h-12 w-12",src:e.authProfile.profile_image?e.authProfile.profile_image.path:"",alt:"ChitChat Logo"},null,8,f)]),t("div",null,[t("div",h,s(e.authProfile.name),1),t("p",_,s(e.authProfile.email),1)])])],64)}var B=p(d,[["render",g]]);export{B as default};
