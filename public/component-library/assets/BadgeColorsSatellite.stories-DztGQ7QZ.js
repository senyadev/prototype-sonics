import{n as e}from"./iframe-BzXzTfmr.js";import{n as t,r as n,t as r}from"./BadgeColorsBase-C5K38ePy.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";function a(e){let{type:n}=e;return(0,o.jsx)(t,{...(()=>{switch(n){case s.ACTIVE:return{text:`Активный`,color:r.GREEN};case s.FUTURE:return{text:`Будущий`,color:r.BLUE};case s.DESCENDING:return{text:`Сошёл`,color:r.RED};case s.INACTIVE:return{text:`Неактивный`,color:r.BRAND};case s.UNKNOWN:return{text:`Неизвестный`,color:r.GRAY}}})()})}var o,s;function c(){return(c=i((()=>{n(),o=e(),s=function(e){return e.ACTIVE=`ACTIVE`,e.FUTURE=`FUTURE`,e.DESCENDING=`DESCENDING`,e.INACTIVE=`INACTIVE`,e.UNKNOWN=`UNKNOWN`,e}({}),a.__docgenInfo={description:``,methods:[],displayName:`BadgeColorsSatellite`,props:{type:{required:!0,tsType:{name:`BadgeColorsSatelliteType`},description:``}}}})))()}var l,u,d,f,p,m,h;function g(){return(g=i((()=>{c(),l={title:`ui-kit/badge/BadgeColorsSatellite`,component:a,argTypes:{type:{control:{type:`select`,options:Object.values(s)}}}},u={args:{type:s.ACTIVE}},d={args:{type:s.FUTURE}},f={args:{type:s.DESCENDING}},p={args:{type:s.INACTIVE}},m={args:{type:s.UNKNOWN}},h=[`Active`,`Future`,`Descending`,`Inactive`,`Unknown`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsSatelliteType.ACTIVE
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsSatelliteType.FUTURE
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsSatelliteType.DESCENDING
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsSatelliteType.INACTIVE
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsSatelliteType.UNKNOWN
  }
}`,...m.parameters?.docs?.source}}}})))()}g();export{u as Active,f as Descending,d as Future,p as Inactive,m as Unknown,h as __namedExportsOrder,l as default};