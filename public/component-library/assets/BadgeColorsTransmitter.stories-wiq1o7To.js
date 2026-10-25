import{n as e}from"./iframe-BzXzTfmr.js";import{n as t,r as n,t as r}from"./BadgeColorsBase-C5K38ePy.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";function a(e){let{type:n}=e;return(0,o.jsx)(t,{...(()=>{switch(n){case s.ACTIVE:return{text:`Активный`,color:r.GREEN};case s.INACTIVE:return{text:`Неактивный`,color:r.RED};case s.UNKNOWN:return{text:`Неизвестный`,color:r.GRAY};case s.NO_DATA:return{text:`Нет данных`,color:r.GRAY}}})()})}var o,s;function c(){return(c=i((()=>{n(),o=e(),s=function(e){return e.ACTIVE=`ACTIVE`,e.INACTIVE=`INACTIVE`,e.UNKNOWN=`UNKNOWN`,e.NO_DATA=`NO_DATA`,e}({}),a.__docgenInfo={description:``,methods:[],displayName:`BadgeColorsTransmitter`,props:{type:{required:!0,tsType:{name:`BadgeColorsTransmitterType`},description:``}}}})))()}var l,u,d,f,p;function m(){return(m=i((()=>{c(),l={title:`ui-kit/badge/BadgeColorsTransmitter`,component:a,argTypes:{type:{control:{type:`select`},options:Object.values(s)}}},u={args:{type:s.ACTIVE}},d={args:{type:s.INACTIVE}},f={args:{type:s.UNKNOWN}},p=[`Active`,`Inactive`,`Unknown`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsTransmitterType.ACTIVE
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsTransmitterType.INACTIVE
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: BadgeColorsTransmitterType.UNKNOWN
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Active,d as Inactive,f as Unknown,p as __namedExportsOrder,l as default};