import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,r as n}from"./Icon-DcOdqD_T.js";import{n as r,t as i}from"./country-BvhgJirg.js";import{a,n as o,o as s,t as c}from"./Table-Ctk449xb.js";import{n as l}from"./rolldown-runtime-DkW27tQK.js";function u(e){return e.flatMap(e=>{let t=i(e);return t?[{iconName:t,label:e.toUpperCase()}]:[]})}var d,f,p,m,h,g,_,v,y,b;function x(){return(x=l((()=>{r(),t(),s(),o(),d=e(),f={title:`ui-kit/table/TableCellText`,component:a,args:{text:`TRANSIT 5B-5`,type:`stroke`}},p={args:{icons:u([`ru`])}},m={args:{icons:u([`us`,`fr`,`sg`])}},h={args:{icons:u([`unknown`])}},g={args:{text:`Text`,type:`text`,icon:n.Table}},_=[{name:`TRANSIT 5B-5`,countries:[`ru`]},{name:`Satellite with several countries`,countries:[`us`,`fr`,`sg`]},{name:`A satellite name that is too long to fit in the available column width`,countries:[`gb`,`de`]},{name:`Satellite without a known country`,countries:[`unknown`]}],v=[{accessorKey:`name`,header:`Satellite name`,cell:({row:e})=>(0,d.jsx)(a,{text:e.original.name,type:`stroke`,icons:u(e.original.countries)}),meta:{mode:`fixed`,width:300,skeleton:`text`}}],y={render:()=>(0,d.jsx)(c,{columns:v,data:_,scrollMode:`horizontal`})},b=[`OneCountry`,`SeveralCountries`,`WithoutCountries`,`ExistingIcon`,`InTable`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    icons: countryIcons(["ru"])
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    icons: countryIcons(["us", "fr", "sg"])
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    icons: countryIcons(["unknown"])
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Text",
    type: "text",
    icon: IconName.Table
  }
}`,...g.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={columns} data={satellites} scrollMode="horizontal" />
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as ExistingIcon,y as InTable,p as OneCountry,m as SeveralCountries,h as WithoutCountries,b as __namedExportsOrder,f as default};