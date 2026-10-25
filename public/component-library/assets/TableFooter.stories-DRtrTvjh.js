import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{n,t as r}from"./TableFooter-D8l4wwZD.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";var a,o,s,c,l,u,d,f,p;function m(){return(m=i((()=>{a=t(),n(),o=e(),s={title:`ui-kit/table/TableFooter`,component:r,argTypes:{onPageChange:{action:`page changed`},onPageSizeChange:{action:`page size changed`}},decorators:[e=>(0,o.jsx)(`div`,{style:{width:1600,padding:24},children:(0,o.jsx)(e,{})})]},c=e=>{let[t,n]=(0,a.useState)(e.currentPage),[i,s]=(0,a.useState)(e.pageSize);return(0,o.jsx)(r,{...e,currentPage:t,pageSize:i,onPageChange:t=>{n(t),e.onPageChange?.(t)},onPageSizeChange:t=>{s(t),n(1),e.onPageSizeChange?.(t)}})},l={render:e=>(0,o.jsx)(c,{...e}),args:{currentPage:1,totalPages:10,pageSize:10,totalItems:95}},u={render:e=>(0,o.jsx)(c,{...e}),args:{currentPage:5,totalPages:5,pageSize:20,totalItems:100}},d={args:{currentPage:1,totalPages:1,pageSize:10,totalItems:8}},f={args:{currentPage:1,totalPages:1,pageSize:10,totalItems:0}},p=[`Default`,`LastPage`,`SinglePage`,`Empty`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <ControlledTableFooter {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 95
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <ControlledTableFooter {...args} />,
  args: {
    currentPage: 5,
    totalPages: 5,
    pageSize: 20,
    totalItems: 100
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 8
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{l as Default,f as Empty,u as LastPage,d as SinglePage,p as __namedExportsOrder,s as default};