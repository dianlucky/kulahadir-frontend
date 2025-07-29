import{g as o,e as t,s as a,k as i}from"./index-DB885r8G.js";/**
 * @license @tabler/icons-react v3.34.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var d=o("filled","arrow-big-up-filled","IconArrowBigUpFilled",[["path",{d:"M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z",key:"svg-0"}]]);const r="https://dianlucky.my.id/api";async function s(e){return(await t.get(`${r}/outgoing-details/by-outgoingId?outgoingId=${e}`,{headers:{Authorization:`Bearer ${a.getToken()}`}})).data.data}const l=e=>i({queryKey:["incoming-details",e],queryFn:()=>s(e)});async function g(e){return(await t.get(`${r}/outgoing-details/by-itemId?itemId=${e}`,{headers:{Authorization:`Bearer ${a.getToken()}`}})).data.data}const y=e=>i({queryKey:["incoming-details",e],queryFn:()=>g(e)});export{d as I,g as a,y as b,s as g,l as u};
