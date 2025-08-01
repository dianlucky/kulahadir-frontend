import{r as p,f as I,u as E,S as De,V as Pe,j as u,M as H,X as so,Z as le,ag as ao,P as W,aq as ie,ae as de,ar as lo,o as je,ab as ce,aM as Ie,p as co,ah as io,af as uo,a as po}from"./index-WTq-jBmO.js";import{I as _e}from"./Input-D56DVYoT.js";import{a as bo}from"./CheckIcon-DsLgxQ_k.js";import{I as ke}from"./InputBase-D3mEq3x3.js";function mo(e){const o=p.useRef(void 0);return p.useEffect(()=>{o.current=e},[e]),o.current}function Te(e){return typeof e=="string"?{value:e,label:e}:"value"in e&&!("label"in e)?{value:e.value,label:e.value,disabled:e.disabled}:typeof e=="number"?{value:e.toString(),label:e.toString()}:"group"in e?{group:e.group,items:e.items.map(o=>Te(o))}:e}function fo(e){return e?e.map(o=>Te(o)):[]}function Re(e){return e.reduce((o,t)=>"group"in t?{...o,...Re(t.items)}:(o[t.value]=t,o),{})}var N={dropdown:"m_88b62a41",search:"m_985517d8",options:"m_b2821a6e",option:"m_92253aa5",empty:"m_2530cd1d",header:"m_858f94bd",footer:"m_82b967cb",group:"m_254f3e4f",groupLabel:"m_2bb2e9e5",chevron:"m_2943220b",optionsDropdownOption:"m_390b5f4",optionsDropdownCheckIcon:"m_8ee53fc2"};const xo={error:null},ho=Pe((e,{size:o,color:t})=>({chevron:{"--combobox-chevron-size":le(o,"combobox-chevron-size"),"--combobox-chevron-color":t?so(t,e):void 0}})),ue=I((e,o)=>{const t=E("ComboboxChevron",xo,e),{size:r,error:s,style:a,className:n,classNames:l,styles:c,unstyled:i,vars:b,mod:d,...f}=t,g=De({name:"ComboboxChevron",classes:N,props:t,style:a,className:n,classNames:l,styles:c,unstyled:i,vars:b,varsResolver:ho,rootSelector:"chevron"});return u.jsx(H,{component:"svg",...f,...g("chevron"),size:r,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",mod:["combobox-chevron",{error:s},d],ref:o,children:u.jsx("path",{d:"M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})});ue.classes=N;ue.displayName="@mantine/core/ComboboxChevron";const[go,T]=ao("Combobox component was not found in tree"),$e=p.forwardRef(({size:e,onMouseDown:o,onClick:t,onClear:r,...s},a)=>u.jsx(_e.ClearButton,{ref:a,tabIndex:-1,"aria-hidden":!0,...s,onMouseDown:n=>{n.preventDefault(),o==null||o(n)},onClick:n=>{r(),t==null||t(n)}}));$e.displayName="@mantine/core/ComboboxClearButton";const vo={},pe=I((e,o)=>{const{classNames:t,styles:r,className:s,style:a,hidden:n,...l}=E("ComboboxDropdown",vo,e),c=T();return u.jsx(W.Dropdown,{...l,ref:o,role:"presentation","data-hidden":n||void 0,...c.getStyles("dropdown",{className:s,style:a,classNames:t,styles:r})})});pe.classes=N;pe.displayName="@mantine/core/ComboboxDropdown";const yo={refProp:"ref"},Fe=I((e,o)=>{const{children:t,refProp:r}=E("ComboboxDropdownTarget",yo,e);if(T(),!ie(t))throw new Error("Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return u.jsx(W.Target,{ref:o,refProp:r,children:t})});Fe.displayName="@mantine/core/ComboboxDropdownTarget";const Co={},be=I((e,o)=>{const{classNames:t,className:r,style:s,styles:a,vars:n,...l}=E("ComboboxEmpty",Co,e),c=T();return u.jsx(H,{ref:o,...c.getStyles("empty",{className:r,classNames:t,styles:a,style:s}),...l})});be.classes=N;be.displayName="@mantine/core/ComboboxEmpty";function me({onKeyDown:e,withKeyboardNavigation:o,withAriaAttributes:t,withExpandedAttribute:r,targetType:s,autoComplete:a}){const n=T(),[l,c]=p.useState(null),i=d=>{if(e==null||e(d),!n.readOnly&&o){if(d.nativeEvent.isComposing)return;if(d.nativeEvent.code==="ArrowDown"&&(d.preventDefault(),n.store.dropdownOpened?c(n.store.selectNextOption()):(n.store.openDropdown("keyboard"),c(n.store.selectActiveOption()),n.store.updateSelectedOptionIndex("selected",{scrollIntoView:!0}))),d.nativeEvent.code==="ArrowUp"&&(d.preventDefault(),n.store.dropdownOpened?c(n.store.selectPreviousOption()):(n.store.openDropdown("keyboard"),c(n.store.selectActiveOption()),n.store.updateSelectedOptionIndex("selected",{scrollIntoView:!0}))),d.nativeEvent.code==="Enter"||d.nativeEvent.code==="NumpadEnter"){if(d.nativeEvent.keyCode===229)return;const f=n.store.getSelectedOptionIndex();n.store.dropdownOpened&&f!==-1?(d.preventDefault(),n.store.clickSelectedOption()):s==="button"&&(d.preventDefault(),n.store.openDropdown("keyboard"))}d.key==="Escape"&&n.store.closeDropdown("keyboard"),d.nativeEvent.code==="Space"&&s==="button"&&(d.preventDefault(),n.store.toggleDropdown("keyboard"))}};return{...t?{"aria-haspopup":"listbox","aria-expanded":r&&!!(n.store.listId&&n.store.dropdownOpened)||void 0,"aria-controls":n.store.dropdownOpened?n.store.listId:void 0,"aria-activedescendant":n.store.dropdownOpened&&l||void 0,autoComplete:a,"data-expanded":n.store.dropdownOpened||void 0,"data-mantine-stop-propagation":n.store.dropdownOpened||void 0}:{},onKeyDown:i}}const wo={refProp:"ref",targetType:"input",withKeyboardNavigation:!0,withAriaAttributes:!0,withExpandedAttribute:!1,autoComplete:"off"},Ve=I((e,o)=>{const{children:t,refProp:r,withKeyboardNavigation:s,withAriaAttributes:a,withExpandedAttribute:n,targetType:l,autoComplete:c,...i}=E("ComboboxEventsTarget",wo,e);if(!ie(t))throw new Error("Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const b=T(),d=me({targetType:l,withAriaAttributes:a,withKeyboardNavigation:s,withExpandedAttribute:n,onKeyDown:t.props.onKeyDown,autoComplete:c});return p.cloneElement(t,{...d,...i,[r]:de(o,b.store.targetRef,lo(t))})});Ve.displayName="@mantine/core/ComboboxEventsTarget";const So={},fe=I((e,o)=>{const{classNames:t,className:r,style:s,styles:a,vars:n,...l}=E("ComboboxFooter",So,e),c=T();return u.jsx(H,{ref:o,...c.getStyles("footer",{className:r,classNames:t,style:s,styles:a}),...l,onMouseDown:i=>{i.preventDefault()}})});fe.classes=N;fe.displayName="@mantine/core/ComboboxFooter";const Oo={},xe=I((e,o)=>{const{classNames:t,className:r,style:s,styles:a,vars:n,children:l,label:c,...i}=E("ComboboxGroup",Oo,e),b=T();return u.jsxs(H,{ref:o,...b.getStyles("group",{className:r,classNames:t,style:s,styles:a}),...i,children:[c&&u.jsx("div",{...b.getStyles("groupLabel",{classNames:t,styles:a}),children:c}),l]})});xe.classes=N;xe.displayName="@mantine/core/ComboboxGroup";const Ao={},he=I((e,o)=>{const{classNames:t,className:r,style:s,styles:a,vars:n,...l}=E("ComboboxHeader",Ao,e),c=T();return u.jsx(H,{ref:o,...c.getStyles("header",{className:r,classNames:t,style:s,styles:a}),...l,onMouseDown:i=>{i.preventDefault()}})});he.classes=N;he.displayName="@mantine/core/ComboboxHeader";function Le({value:e,valuesDivider:o=",",...t}){return u.jsx("input",{type:"hidden",value:Array.isArray(e)?e.join(o):e||"",...t})}Le.displayName="@mantine/core/ComboboxHiddenInput";const No={},ge=I((e,o)=>{const t=E("ComboboxOption",No,e),{classNames:r,className:s,style:a,styles:n,vars:l,onClick:c,id:i,active:b,onMouseDown:d,onMouseOver:f,disabled:g,selected:D,mod:P,...O}=t,v=T(),F=p.useId(),w=i||F;return u.jsx(H,{...v.getStyles("option",{className:s,classNames:r,styles:n,style:a}),...O,ref:o,id:w,mod:["combobox-option",{"combobox-active":b,"combobox-disabled":g,"combobox-selected":D},P],role:"option",onClick:h=>{var j;g?h.preventDefault():((j=v.onOptionSubmit)==null||j.call(v,t.value,t),c==null||c(h))},onMouseDown:h=>{h.preventDefault(),d==null||d(h)},onMouseOver:h=>{v.resetSelectionOnOptionHover&&v.store.resetSelectedOption(),f==null||f(h)}})});ge.classes=N;ge.displayName="@mantine/core/ComboboxOption";const Eo={},ve=I((e,o)=>{const t=E("ComboboxOptions",Eo,e),{classNames:r,className:s,style:a,styles:n,id:l,onMouseDown:c,labelledBy:i,...b}=t,d=T(),f=je(l);return p.useEffect(()=>{d.store.setListId(f)},[f]),u.jsx(H,{ref:o,...d.getStyles("options",{className:s,style:a,classNames:r,styles:n}),...b,id:f,role:"listbox","aria-labelledby":i,onMouseDown:g=>{g.preventDefault(),c==null||c(g)}})});ve.classes=N;ve.displayName="@mantine/core/ComboboxOptions";const Io={withAriaAttributes:!0,withKeyboardNavigation:!0},ye=I((e,o)=>{const t=E("ComboboxSearch",Io,e),{classNames:r,styles:s,unstyled:a,vars:n,withAriaAttributes:l,onKeyDown:c,withKeyboardNavigation:i,size:b,...d}=t,f=T(),g=f.getStyles("search"),D=me({targetType:"input",withAriaAttributes:l,withKeyboardNavigation:i,withExpandedAttribute:!1,onKeyDown:c,autoComplete:"off"});return u.jsx(_e,{ref:de(o,f.store.searchRef),classNames:[{input:g.className},r],styles:[{input:g.style},s],size:b||f.size,...D,...d,__staticSelector:"Combobox"})});ye.classes=N;ye.displayName="@mantine/core/ComboboxSearch";const Do={refProp:"ref",targetType:"input",withKeyboardNavigation:!0,withAriaAttributes:!0,withExpandedAttribute:!1,autoComplete:"off"},ze=I((e,o)=>{const{children:t,refProp:r,withKeyboardNavigation:s,withAriaAttributes:a,withExpandedAttribute:n,targetType:l,autoComplete:c,...i}=E("ComboboxTarget",Do,e);if(!ie(t))throw new Error("Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const b=T(),d=me({targetType:l,withAriaAttributes:a,withKeyboardNavigation:s,withExpandedAttribute:n,onKeyDown:t.props.onKeyDown,autoComplete:c}),f=p.cloneElement(t,{...d,...i});return u.jsx(W.Target,{ref:de(o,b.store.targetRef),children:f})});ze.displayName="@mantine/core/ComboboxTarget";function Po(e,o,t){for(let r=e-1;r>=0;r-=1)if(!o[r].hasAttribute("data-combobox-disabled"))return r;if(t){for(let r=o.length-1;r>-1;r-=1)if(!o[r].hasAttribute("data-combobox-disabled"))return r}return e}function jo(e,o,t){for(let r=e+1;r<o.length;r+=1)if(!o[r].hasAttribute("data-combobox-disabled"))return r;if(t){for(let r=0;r<o.length;r+=1)if(!o[r].hasAttribute("data-combobox-disabled"))return r}return e}function _o(e){for(let o=0;o<e.length;o+=1)if(!e[o].hasAttribute("data-combobox-disabled"))return o;return-1}function He({defaultOpened:e,opened:o,onOpenedChange:t,onDropdownClose:r,onDropdownOpen:s,loop:a=!0,scrollBehavior:n="instant"}={}){const[l,c]=ce({value:o,defaultValue:e,finalValue:!1,onChange:t}),i=p.useRef(null),b=p.useRef(-1),d=p.useRef(null),f=p.useRef(null),g=p.useRef(-1),D=p.useRef(-1),P=p.useRef(-1),O=p.useCallback((m="unknown")=>{l||(c(!0),s==null||s(m))},[c,s,l]),v=p.useCallback((m="unknown")=>{l&&(c(!1),r==null||r(m))},[c,r,l]),F=p.useCallback((m="unknown")=>{l?v(m):O(m)},[v,O,l]),w=p.useCallback(()=>{const m=document.querySelector(`#${i.current} [data-combobox-selected]`);m==null||m.removeAttribute("data-combobox-selected"),m==null||m.removeAttribute("aria-selected")},[]),h=p.useCallback(m=>{const S=document.getElementById(i.current),y=S==null?void 0:S.querySelectorAll("[data-combobox-option]");if(!y)return null;const A=m>=y.length?0:m<0?y.length-1:m;return b.current=A,y!=null&&y[A]&&!y[A].hasAttribute("data-combobox-disabled")?(w(),y[A].setAttribute("data-combobox-selected","true"),y[A].setAttribute("aria-selected","true"),y[A].scrollIntoView({block:"nearest",behavior:n}),y[A].id):null},[n,w]),j=p.useCallback(()=>{const m=document.querySelector(`#${i.current} [data-combobox-active]`);if(m){const S=document.querySelectorAll(`#${i.current} [data-combobox-option]`),y=Array.from(S).findIndex(A=>A===m);return h(y)}return h(0)},[h]),R=p.useCallback(()=>h(jo(b.current,document.querySelectorAll(`#${i.current} [data-combobox-option]`),a)),[h,a]),X=p.useCallback(()=>h(Po(b.current,document.querySelectorAll(`#${i.current} [data-combobox-option]`),a)),[h,a]),J=p.useCallback(()=>h(_o(document.querySelectorAll(`#${i.current} [data-combobox-option]`))),[h]),Q=p.useCallback((m="selected",S)=>{P.current=window.setTimeout(()=>{var G;const y=document.querySelectorAll(`#${i.current} [data-combobox-option]`),A=Array.from(y).findIndex(re=>re.hasAttribute(`data-combobox-${m}`));b.current=A,S!=null&&S.scrollIntoView&&((G=y[A])==null||G.scrollIntoView({block:"nearest",behavior:n}))},0)},[]),Y=p.useCallback(()=>{b.current=-1,w()},[w]),K=p.useCallback(()=>{const m=document.querySelectorAll(`#${i.current} [data-combobox-option]`),S=m==null?void 0:m[b.current];S==null||S.click()},[]),V=p.useCallback(m=>{i.current=m},[]),ee=p.useCallback(()=>{g.current=window.setTimeout(()=>d.current.focus(),0)},[]),oe=p.useCallback(()=>{D.current=window.setTimeout(()=>f.current.focus(),0)},[]),te=p.useCallback(()=>b.current,[]);return p.useEffect(()=>()=>{window.clearTimeout(g.current),window.clearTimeout(D.current),window.clearTimeout(P.current)},[]),{dropdownOpened:l,openDropdown:O,closeDropdown:v,toggleDropdown:F,selectedOptionIndex:b.current,getSelectedOptionIndex:te,selectOption:h,selectFirstOption:J,selectActiveOption:j,selectNextOption:R,selectPreviousOption:X,resetSelectedOption:Y,updateSelectedOptionIndex:Q,listId:i.current,setListId:V,clickSelectedOption:K,searchRef:d,focusSearchInput:ee,targetRef:f,focusTarget:oe}}const ko={keepMounted:!0,withinPortal:!0,resetSelectionOnOptionHover:!1,width:"target",transitionProps:{transition:"fade",duration:0}},To=Pe((e,{size:o,dropdownPadding:t})=>({options:{"--combobox-option-fz":Ie(o),"--combobox-option-padding":le(o,"combobox-option-padding")},dropdown:{"--combobox-padding":t===void 0?void 0:co(t),"--combobox-option-fz":Ie(o),"--combobox-option-padding":le(o,"combobox-option-padding")}}));function x(e){const o=E("Combobox",ko,e),{classNames:t,styles:r,unstyled:s,children:a,store:n,vars:l,onOptionSubmit:c,onClose:i,size:b,dropdownPadding:d,resetSelectionOnOptionHover:f,__staticSelector:g,readOnly:D,...P}=o,O=He(),v=n||O,F=De({name:g||"Combobox",classes:N,props:o,classNames:t,styles:r,unstyled:s,vars:l,varsResolver:To}),w=()=>{i==null||i(),v.closeDropdown()};return u.jsx(go,{value:{getStyles:F,store:v,onOptionSubmit:c,size:b,resetSelectionOnOptionHover:f,readOnly:D},children:u.jsx(W,{opened:v.dropdownOpened,...P,onChange:h=>!h&&w(),withRoles:!1,unstyled:s,children:a})})}const Ro=e=>e;x.extend=Ro;x.classes=N;x.displayName="@mantine/core/Combobox";x.Target=ze;x.Dropdown=pe;x.Options=ve;x.Option=ge;x.Search=ye;x.Empty=be;x.Chevron=ue;x.Footer=fe;x.Header=he;x.EventsTarget=Ve;x.DropdownTarget=Fe;x.Group=xe;x.ClearButton=$e;x.HiddenInput=Le;function M(e){return"group"in e}function Be({options:e,search:o,limit:t}){const r=o.trim().toLowerCase(),s=[];for(let a=0;a<e.length;a+=1){const n=e[a];if(s.length===t)return s;M(n)&&s.push({group:n.group,items:Be({options:n.items,search:o,limit:t-s.length})}),M(n)||n.label.toLowerCase().includes(r)&&s.push(n)}return s}function $o(e){if(e.length===0)return!0;for(const o of e)if(!("group"in o)||o.items.length>0)return!1;return!0}function qe(e,o=new Set){if(Array.isArray(e))for(const t of e)if(M(t))qe(t.items,o);else{if(typeof t.value>"u")throw new Error("[@mantine/core] Each option must have value property");if(typeof t.value!="string")throw new Error(`[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof t.value}`);if(o.has(t.value))throw new Error(`[@mantine/core] Duplicate options are not supported. Option with value "${t.value}" was provided more than once`);o.add(t.value)}}function Fo(e,o){return Array.isArray(e)?e.includes(o):e===o}function Ke({data:e,withCheckIcon:o,value:t,checkIconPosition:r,unstyled:s,renderOption:a}){if(!M(e)){const l=Fo(t,e.value),c=o&&l&&u.jsx(bo,{className:N.optionsDropdownCheckIcon}),i=u.jsxs(u.Fragment,{children:[r==="left"&&c,u.jsx("span",{children:e.label}),r==="right"&&c]});return u.jsx(x.Option,{value:e.value,disabled:e.disabled,className:uo({[N.optionsDropdownOption]:!s}),"data-reverse":r==="right"||void 0,"data-checked":l||void 0,"aria-selected":l,active:l,children:typeof a=="function"?a({option:e,checked:l}):i})}const n=e.items.map(l=>u.jsx(Ke,{data:l,value:t,unstyled:s,withCheckIcon:o,checkIconPosition:r,renderOption:a},l.value));return u.jsx(x.Group,{label:e.group,children:n})}function Vo({data:e,hidden:o,hiddenWhenEmpty:t,filter:r,search:s,limit:a,maxDropdownHeight:n,withScrollArea:l=!0,filterOptions:c=!0,withCheckIcon:i=!1,value:b,checkIconPosition:d,nothingFoundMessage:f,unstyled:g,labelId:D,renderOption:P,scrollAreaProps:O,"aria-label":v}){qe(e);const w=typeof s=="string"?(r||Be)({options:e,search:c?s:"",limit:a??1/0}):e,h=$o(w),j=w.map(R=>u.jsx(Ke,{data:R,withCheckIcon:i,value:b,checkIconPosition:d,unstyled:g,renderOption:P},M(R)?R.group:R.value));return u.jsx(x.Dropdown,{hidden:o||t&&h,"data-composed":!0,children:u.jsxs(x.Options,{labelledBy:D,"aria-label":v,children:[l?u.jsx(io.Autosize,{mah:n??220,type:"scroll",scrollbarSize:"var(--combobox-padding)",offsetScrollbars:"y",...O,children:j}):j,h&&f&&u.jsx(x.Empty,{children:f})]})})}const Lo={searchable:!1,withCheckIcon:!0,allowDeselect:!0,checkIconPosition:"left"},Me=I((e,o)=>{const t=E("Select",Lo,e),{classNames:r,styles:s,unstyled:a,vars:n,dropdownOpened:l,defaultDropdownOpened:c,onDropdownClose:i,onDropdownOpen:b,onFocus:d,onBlur:f,onClick:g,onChange:D,data:P,value:O,defaultValue:v,selectFirstOptionOnChange:F,onOptionSubmit:w,comboboxProps:h,readOnly:j,disabled:R,filter:X,limit:J,withScrollArea:Q,maxDropdownHeight:Y,size:K,searchable:V,rightSection:ee,checkIconPosition:oe,withCheckIcon:te,nothingFoundMessage:m,name:S,form:y,searchValue:A,defaultSearchValue:G,onSearchChange:re,allowDeselect:Ge,error:Ce,rightSectionPointerEvents:Ue,id:Ze,clearable:We,clearButtonProps:Xe,hiddenInputProps:Je,renderOption:Qe,onClear:ne,autoComplete:Ye,scrollAreaProps:eo,__defaultRightSection:zo,__clearSection:Ho,__clearable:Bo,chevronColor:oo,...U}=t,se=p.useMemo(()=>fo(P),[P]),B=p.useMemo(()=>Re(se),[se]),we=je(Ze),[_,Se,Oe]=ce({value:O,defaultValue:v,finalValue:null,onChange:D}),$=typeof _=="string"?B[_]:void 0,q=mo($),[Z,to,ro]=ce({value:A,defaultValue:G,finalValue:$?$.label:"",onChange:re}),k=He({opened:l,defaultOpened:c,onDropdownOpen:()=>{b==null||b(),k.updateSelectedOptionIndex("active",{scrollIntoView:!0})},onDropdownClose:()=>{i==null||i(),k.resetSelectedOption()}}),z=C=>{to(C),k.resetSelectedOption()},{resolvedClassNames:Ae,resolvedStyles:Ne}=po({props:t,styles:s,classNames:r});p.useEffect(()=>{F&&k.selectFirstOption()},[F,Z]),p.useEffect(()=>{O===null&&z(""),typeof O=="string"&&$&&((q==null?void 0:q.value)!==$.value||(q==null?void 0:q.label)!==$.label)&&z($.label)},[O,$]),p.useEffect(()=>{var C;!Oe&&!ro&&z(typeof _=="string"&&((C=B[_])==null?void 0:C.label)||"")},[P,_]);const no=u.jsx(x.ClearButton,{...Xe,onClear:()=>{Se(null,null),z(""),ne==null||ne()}}),Ee=We&&!!_&&!R&&!j;return u.jsxs(u.Fragment,{children:[u.jsxs(x,{store:k,__staticSelector:"Select",classNames:Ae,styles:Ne,unstyled:a,readOnly:j,onOptionSubmit:C=>{w==null||w(C);const L=Ge&&B[C].value===_?null:B[C],ae=L?L.value:null;ae!==_&&Se(ae,L),!Oe&&z(typeof ae=="string"&&(L==null?void 0:L.label)||""),k.closeDropdown()},size:K,...h,children:[u.jsx(x.Target,{targetType:V?"input":"button",autoComplete:Ye,children:u.jsx(ke,{id:we,ref:o,__defaultRightSection:u.jsx(x.Chevron,{size:K,error:Ce,unstyled:a,color:oo}),__clearSection:no,__clearable:Ee,rightSection:ee,rightSectionPointerEvents:Ue||(Ee?"all":"none"),...U,size:K,__staticSelector:"Select",disabled:R,readOnly:j||!V,value:Z,onChange:C=>{z(C.currentTarget.value),k.openDropdown(),F&&k.selectFirstOption()},onFocus:C=>{V&&k.openDropdown(),d==null||d(C)},onBlur:C=>{var L;V&&k.closeDropdown(),z(_!=null&&((L=B[_])==null?void 0:L.label)||""),f==null||f(C)},onClick:C=>{V?k.openDropdown():k.toggleDropdown(),g==null||g(C)},classNames:Ae,styles:Ne,unstyled:a,pointer:!V,error:Ce})}),u.jsx(Vo,{data:se,hidden:j||R,filter:X,search:Z,limit:J,hiddenWhenEmpty:!m,withScrollArea:Q,maxDropdownHeight:Y,filterOptions:V&&($==null?void 0:$.label)!==Z,value:_,checkIconPosition:oe,withCheckIcon:te,nothingFoundMessage:m,unstyled:a,labelId:U.label?`${we}-label`:void 0,"aria-label":U.label?void 0:U["aria-label"],renderOption:Qe,scrollAreaProps:eo})]}),u.jsx(x.HiddenInput,{value:_,name:S,form:y,disabled:R,...Je})]})});Me.classes={...ke.classes,...x.classes};Me.displayName="@mantine/core/Select";export{x as C,Vo as O,Me as S,Re as a,fo as g,M as i,He as u};
