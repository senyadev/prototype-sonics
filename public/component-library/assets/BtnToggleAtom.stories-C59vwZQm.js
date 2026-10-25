import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{i as n,r}from"./Icon-DcOdqD_T.js";import{n as i,t as a}from"./BtnToggleAtom-CxltpZAf.js";import{n as o}from"./rolldown-runtime-DkW27tQK.js";var s,c,l,u,d,f,p,m;function h(){return(h=o((()=>{n(),s=t(),i(),c=e(),l={title:`ui-kit/checkbox/ToggleBtn/BtnToggleAtom`,component:a,argTypes:{onChange:{action:`onChange`}}},u={args:{value:`chart`,text:`Chart`,icon:r.Graphic,isActive:!0}},d={args:{value:`chart`,text:`Chart`,icon:r.Graphic,isActive:!0},render:e=>{let[t,n]=(0,s.useState)(e.isActive);return(0,c.jsx)(a,{...e,isActive:t,onChange:t=>{n(e=>!e),e.onChange(t)}})}},f={args:{value:`table`,icon:r.Table,isActive:!1}},p={args:{value:`table`,text:`Table`,isActive:!1}},m=[`Default`,`Interactive`,`IconOnly`,`TextOnly`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: "chart",
    text: "Chart",
    icon: IconName.Graphic,
    isActive: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: "chart",
    text: "Chart",
    icon: IconName.Graphic,
    isActive: true
  },
  render: args => {
    const [isActive, setIsActive] = useState<boolean>(args.isActive);
    return <BtnToggleAtom<Value> {...args} isActive={isActive} onChange={val => {
      setIsActive(prev => !prev);
      args.onChange(val);
    }} />;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: "table",
    icon: IconName.Table,
    isActive: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: "table",
    text: "Table",
    isActive: false
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{u as Default,f as IconOnly,d as Interactive,p as TextOnly,m as __namedExportsOrder,l as default};