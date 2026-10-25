import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{n,t as r}from"./Pagination-DPKxn_yw.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";var a,o,s,c,l,u,d,f,p;function m(){return(m=i((()=>{a=t(),n(),o=e(),s={title:`ui-kit/pagination/Pagination`,component:r,argTypes:{totalPages:{control:`number`,min:1},variant:{control:`select`,options:[`desktop`,`mobile`]}}},c=({totalPages:e,variant:t})=>{let[n,i]=(0,a.useState)(1);return(0,o.jsx)(r,{currentPage:n,totalPages:e,variant:t,onPageChange:e=>i(e)})},l={args:{totalPages:10,variant:`desktop`},render:e=>(0,o.jsx)(c,{...e})},u={args:{totalPages:10,variant:`mobile`},render:e=>(0,o.jsx)(c,{...e})},d={args:{totalPages:3,variant:`mobile`},render:e=>(0,o.jsx)(c,{...e})},f={args:{totalPages:25,variant:`desktop`},render:e=>(0,o.jsx)(c,{...e})},p=[`Desktop`,`Mobile`,`FewPagesMobile`,`ManyPagesDesktop`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 10,
    variant: "desktop"
  },
  render: args => <PaginationWrapper {...args} />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 10,
    variant: "mobile"
  },
  render: args => <PaginationWrapper {...args} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 3,
    variant: "mobile"
  },
  render: args => <PaginationWrapper {...args} />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    totalPages: 25,
    variant: "desktop"
  },
  render: args => <PaginationWrapper {...args} />
}`,...f.parameters?.docs?.source}}}})))()}m();export{l as Desktop,d as FewPagesMobile,f as ManyPagesDesktop,u as Mobile,p as __namedExportsOrder,s as default};