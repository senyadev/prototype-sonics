import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{i as n,n as r,r as i,t as a}from"./Icon-DcOdqD_T.js";import{n as o,t as s}from"./clsx-CTwy9ux-.js";import{i as c,r as l}from"./Option-B_2clCaD.js";import{i as u,r as d}from"./SelectorSection.module-Dfj9r_JQ.js";import{n as f,t as p}from"./Trigger-CONmZE4D.js";import{n as m,t as h}from"./SelectorSection-F_po-H7P.js";import{n as g}from"./rolldown-runtime-DkW27tQK.js";var _,v,y,b,x,S;function C(){return(C=g((()=>{_=`_wrapper_17avd_1`,v=`_dropdown_17avd_11`,y=`_overlay_17avd_18`,b=`_open_17avd_28`,x=`_fadeIn_17avd_1`,S={wrapper:_,dropdown:v,overlay:y,open:b,fadeIn:x}})))()}function w(e){let{options:t,onChange:n,placeholder:r=`Select...`,search:i,searchPlaceholder:a,className:o}=e,[l,u]=(0,T.useState)(``),f=t.filter(e=>e.label.toLowerCase().includes(l.toLowerCase())),{isOpen:m,selectedItem:g,getToggleButtonProps:_,getInputProps:v,getMenuProps:y,getItemProps:b,highlightedIndex:x}=c({inputValue:l,items:f,itemToString:e=>e?.label||``,onSelectedItemChange:({selectedItem:e})=>{n(e?.value??null),u(``)},onStateChange:({inputValue:e,type:t})=>{t===c.stateChangeTypes.InputChange&&u(e||``)},stateReducer:(e,t)=>{let{changes:n,type:r}=t;return r===c.stateChangeTypes.InputClick?{...n,isOpen:!0}:n}});return(0,E.jsxs)(`div`,{className:s(o,S.wrapper),children:[(0,E.jsx)(p,{placeholder:r,selectedItem:g,isOpen:m,toggleButtonProps:_()}),(0,E.jsx)(d,{className:S.dropdown,isOpen:m,children:(0,E.jsx)(h,{options:f,highlightedIndex:x,showCheckbox:!1,selectedItem:g,menuProps:y(),inputProps:v(),getItemProps:b,showTitle:!0,search:i,placeholder:a})}),(0,E.jsx)(`div`,{className:s(S.overlay,{[S.open]:m})})]})}var T,E;function D(){return(D=g((()=>{o(),l(),T=t(),f(),u(),m(),C(),E=e(),w.__docgenInfo={description:``,methods:[],displayName:`MobileSelector`,props:{options:{required:!0,tsType:{name:`Array`,elements:[{name:`IOption`,elements:[{name:`string`}],raw:`IOption<string>`}],raw:`IOption<string>[]`},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: string | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``},search:{required:!1,tsType:{name:`boolean`},description:``},searchPlaceholder:{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var O,k,A,j,M,N;function P(){return(P=g((()=>{n(),r(),D(),O=e(),k={title:`ui-kit/selectors/MobileSelector`,component:w,argTypes:{onChange:{action:`onChange`}}},A=[{value:`1`,label:`Option 1`},{value:`2`,label:`Option 2`,icon:(0,O.jsx)(a,{iconName:i.Geoscan})},{value:`3`,label:`Option 3`,icon:(0,O.jsx)(a,{iconName:i.Geoscan})},{value:`4`,label:`Option 4`},{value:`5`,label:`Option 5`},{value:`6`,label:`Option 6`},{value:`7`,label:`Option 7`}],j={args:{options:A},parameters:{viewport:{defaultViewport:`mobile1`}}},M={args:{options:A,search:!0},parameters:{viewport:{defaultViewport:`mobile1`}}},N=[`Default`,`WithSearch`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    options: sampleOptions
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    search: true
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    }
  }
}`,...M.parameters?.docs?.source}}}})))()}P();export{j as Default,M as WithSearch,N as __namedExportsOrder,k as default};