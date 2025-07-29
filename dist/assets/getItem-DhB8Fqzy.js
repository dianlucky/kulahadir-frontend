import{g as o,k as t,e as a,s as r}from"./index-CR13SSJV.js";/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var i=o("outline","search","IconSearch",[["path",{d:"M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",key:"svg-0"}],["path",{d:"M21 21l-6 -6",key:"svg-1"}]]);const s="https://dianlucky.my.id/api";async function y(e){return(await a.get(`${s}/items/by-category?category=${e}`,{headers:{Authorization:`Bearer ${r.getToken()}`}})).data.data}const g=e=>t({queryKey:["item",e],queryFn:()=>y(e)});async function u(e){return(await a.get(`${s}/items/${e}`,{headers:{Authorization:`Bearer ${r.getToken()}`}})).data.data}const d=e=>t({queryKey:["item",e],queryFn:()=>u(e)});export{i as I,d as a,g as u};
