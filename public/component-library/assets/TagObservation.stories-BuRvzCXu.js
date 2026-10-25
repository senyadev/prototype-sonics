import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Tag-BIu4wjYY.js";import{n as a}from"./rolldown-runtime-DkW27tQK.js";function o(e){let{type:t}=e;return(0,s.jsx)(i,{...(()=>{switch(t){case c.GOOD:return{text:`Хорошее`,state:r.INACTIVE,type:n.GREEN};case c.UNKNOWN:return{text:`Неизвестное`,state:r.INACTIVE,type:n.PRIMARY};case c.FAILED:return{text:`Неудавшийся`,state:r.INACTIVE,type:n.GRAY};case c.BAD:return{text:`Плохое`,state:r.INACTIVE,type:n.RED};case c.FUTURE:return{text:`Будущее`,state:r.INACTIVE,type:n.BLUE}}})()})}var s,c;function l(){return(l=a((()=>{t(),s=e(),c=function(e){return e.GOOD=`GOOD`,e.UNKNOWN=`UNKNOWN`,e.FAILED=`FAILED`,e.BAD=`BAD`,e.FUTURE=`FUTURE`,e}({}),o.__docgenInfo={description:``,methods:[],displayName:`TagObservation`,props:{type:{required:!0,tsType:{name:`TagObservationType`},description:``}}}})))()}var u,d,f,p,m,h,g,_;function v(){return(v=a((()=>{l(),u={title:`ui-kit/tags/TagObservation`,component:o,argTypes:{type:{control:`select`,options:Object.values(c)}}},d={args:{type:c.GOOD}},f={args:{type:c.UNKNOWN}},p={args:{type:c.FAILED}},m={args:{type:c.BAD}},h={args:{type:c.FUTURE}},g={args:{type:c.GOOD},argTypes:{type:{control:`select`,options:Object.values(c)}}},_=[`Good`,`Unknown`,`Failed`,`Bad`,`Future`,`Playground`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagObservationType.GOOD
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagObservationType.UNKNOWN
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagObservationType.FAILED
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagObservationType.BAD
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagObservationType.FUTURE
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: TagObservationType.GOOD
  },
  argTypes: {
    type: {
      control: "select",
      options: Object.values(TagObservationType)
    }
  }
}`,...g.parameters?.docs?.source}}}})))()}v();export{m as Bad,p as Failed,h as Future,d as Good,g as Playground,f as Unknown,_ as __namedExportsOrder,u as default};