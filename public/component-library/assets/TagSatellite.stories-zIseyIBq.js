import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Tag-BIu4wjYY.js";import{n as a}from"./rolldown-runtime-DkW27tQK.js";function o(e){let{type:t,onClick:a,active:o}=e;return(0,s.jsx)(i,{state:o?r.ACTIVE:r.INACTIVE,onClick:a,...(()=>{switch(t){case c.ACTIVE:return{text:`Активный`,type:n.GREEN};case c.INACTIVE:return{text:`Неактивный`,type:n.PRIMARY};case c.UNKNOWN:return{text:`Неизвестный`,type:n.GRAY};case c.DESCENDED:return{text:`Сошёл`,type:n.RED};case c.FUTURE:return{text:`Будущий`,type:n.BLUE}}})()})}var s,c;function l(){return(l=a((()=>{t(),s=e(),c=function(e){return e.ACTIVE=`ACTIVE`,e.INACTIVE=`INACTIVE`,e.UNKNOWN=`UNKNOWN`,e.DESCENDED=`DESCENDED`,e.FUTURE=`FUTURE`,e}({}),o.__docgenInfo={description:``,methods:[],displayName:`TagSatellite`,props:{type:{required:!0,tsType:{name:`TagSatelliteType`},description:``},onClick:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},active:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var u,d,f,p,m,h,g;function _(){return(_=a((()=>{l(),u={title:`ui-kit/tags/TagSatellite`,component:o,argTypes:{type:{control:`select`,options:Object.values(c)},active:{control:`boolean`}}},d={args:{type:c.ACTIVE,active:!0}},f={args:{type:c.INACTIVE,active:!1}},p={args:{type:c.UNKNOWN,active:!1}},m={args:{type:c.DESCENDED,active:!1}},h={args:{type:c.FUTURE,active:!1}},g=[`Active`,`Inactive`,`Unknown`,`Descended`,`Future`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagSatelliteType.ACTIVE,
    active: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagSatelliteType.INACTIVE,
    active: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagSatelliteType.UNKNOWN,
    active: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagSatelliteType.DESCENDED,
    active: false
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagSatelliteType.FUTURE,
    active: false
  }
}`,...h.parameters?.docs?.source}}}})))()}_();export{d as Active,m as Descended,h as Future,f as Inactive,p as Unknown,g as __namedExportsOrder,u as default};