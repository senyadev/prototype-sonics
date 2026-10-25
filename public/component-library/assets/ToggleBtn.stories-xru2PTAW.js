import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{i as n,r}from"./Icon-DcOdqD_T.js";import{n as i,t as a}from"./clsx-CTwy9ux-.js";import{n as o,t as s}from"./BtnToggleAtom-CxltpZAf.js";import{n as c}from"./rolldown-runtime-DkW27tQK.js";var l,u;function d(){return(d=c((()=>{l=`_toggleBtn_qorta_1`,u={toggleBtn:l}})))()}function f({options:e,value:t,onChange:n,className:r}){let i=e.map(({value:e,text:r,iconName:i})=>(0,p.jsx)(s,{value:e,text:r,icon:i,isActive:t===e,onChange:n},e));return(0,p.jsx)(`div`,{className:a(r,u.toggleBtn),children:i})}var p;function m(){return(m=c((()=>{i(),o(),d(),p=e(),f.__docgenInfo={description:``,methods:[],displayName:`ToggleBtn`,props:{options:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  value: T;
  text?: string;
  iconName?: IconName;
}`,signature:{properties:[{key:`value`,value:{name:`T`,required:!0}},{key:`text`,value:{name:`string`,required:!1}},{key:`iconName`,value:{name:`IconName`,required:!1}}]}}],raw:`ToggleOption<T>[]`},description:``},value:{required:!0,tsType:{name:`T`},description:``},className:{required:!1,tsType:{name:`string`},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(value: T) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var h,g,_,v,y,b;function x(){return(x=c((()=>{n(),h=t(),m(),g=e(),_={title:`ui-kit/checkbox/ToggleBtn/ToggleBtn`,component:f,argTypes:{onChange:{action:`onChange`}}},v=[{value:`1`,text:`Button1`,iconName:r.Table},{value:`2`,text:`Button2`,iconName:r.Table},{value:`3`,text:`Button3`,iconName:r.Table}],y={args:{options:v,value:`1`},render:e=>{let[t,n]=(0,h.useState)(e.value);return(0,g.jsx)(f,{...e,value:t,onChange:t=>{n(t),e.onChange(t)}})}},b=[`Default`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    value: "1"
  },
  render: args => {
    const [value, setValue] = useState<Value>(args.value);
    return <ToggleBtn<Value> {...args} value={value} onChange={next => {
      setValue(next);
      args.onChange(next);
    }} />;
  }
}`,...y.parameters?.docs?.source}}}})))()}x();export{y as Default,b as __namedExportsOrder,_ as default};