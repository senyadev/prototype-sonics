import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,r as n}from"./Icon-DcOdqD_T.js";import{a as r,i}from"./types-BrwFYH1u.js";import{n as a,t as o}from"./IconButton-DwZAirCq.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";function c({theme:e,onThemeChange:t,className:r,labels:a}){let s=e===null,c=e===`dark`,u=c?`light`:`dark`,d=s?a.pending:c?a.switchToLight:a.switchToDark;return(0,l.jsx)(o,{className:r,iconName:s||c?n.Sun:n.Moon,buttonType:i.SECONDARY,type:`button`,"aria-label":d,title:d,disabled:s,onClick:()=>t(u)})}var l;function u(){return(u=s((()=>{t(),a(),r(),l=e(),c.__docgenInfo={description:``,methods:[],displayName:`ThemeToggle`,props:{theme:{required:!0,tsType:{name:`union`,raw:`"light" | "dark" | null`,elements:[{name:`literal`,value:`"light"`},{name:`literal`,value:`"dark"`},{name:`null`}]},description:``},onThemeChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(theme: "light" | "dark") => void`,signature:{arguments:[{type:{name:`union`,raw:`"light" | "dark"`,elements:[{name:`literal`,value:`"light"`},{name:`literal`,value:`"dark"`}]},name:`theme`}],return:{name:`void`}}},description:``},className:{required:!1,tsType:{name:`string`},description:``},labels:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  pending: string;
  switchToDark: string;
  switchToLight: string;
}`,signature:{properties:[{key:`pending`,value:{name:`string`,required:!0}},{key:`switchToDark`,value:{name:`string`,required:!0}},{key:`switchToLight`,value:{name:`string`,required:!0}}]}},description:``}}}})))()}var d,f,p,m,h;function g(){return(g=s((()=>{u(),d={title:`ui-kit/buttons/ThemeToggle`,component:c},f={args:{theme:`light`,onThemeChange:()=>void 0,labels:{pending:`Switch theme`,switchToDark:`Switch to dark theme`,switchToLight:`Switch to light theme`}}},p={args:{...f.args,theme:`dark`}},m={args:{...f.args,theme:null}},h=[`Light`,`Dark`,`Pending`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    theme: "light",
    onThemeChange: () => undefined,
    labels: {
      pending: "Switch theme",
      switchToDark: "Switch to dark theme",
      switchToLight: "Switch to light theme"
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...Light.args,
    theme: "dark"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...Light.args,
    theme: null
  }
}`,...m.parameters?.docs?.source}}}})))()}g();export{p as Dark,f as Light,m as Pending,h as __namedExportsOrder,d as default};