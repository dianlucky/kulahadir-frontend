import{g as o,e as a,s as t,k as n}from"./index-DB885r8G.js";/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var c=o("filled","arrow-big-down-filled","IconArrowBigDownFilled",[["path",{d:"M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z",key:"svg-0"}]]);const i="https://dianlucky.my.id/api";async function s(e){return(await a.get(`${i}/incoming-details/by-incomingId?incomingId=${e}`,{headers:{Authorization:`Bearer ${t.getToken()}`}})).data.data}const g=e=>n({queryKey:["incoming-details",e],queryFn:()=>s(e)});async function d(e){return(await a.get(`${i}/incoming-details/by-itemId?itemId=${e}`,{headers:{Authorization:`Bearer ${t.getToken()}`}})).data.data}const u=e=>n({queryKey:["incoming-details",e],queryFn:()=>d(e)});export{c as I,d as a,u as b,s as g,g as u};
