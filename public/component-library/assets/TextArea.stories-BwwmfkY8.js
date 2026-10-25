import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{i as n,r}from"./Icon-DcOdqD_T.js";import{i,r as a}from"./InputBase-D1AfVEwd.js";import{n as o,t as s}from"./TextArea-vJUgxO8U.js";import{n as c}from"./rolldown-runtime-DkW27tQK.js";function l(){let[e,t]=(0,u.useState)(``);return(0,d.jsx)(s,{text:`Description`,value:e,onChange:e=>t(e.currentTarget.value)})}var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=c((()=>{n(),u=t(),i(),o(),d=e(),f={title:`ui-kit/inputs/text-area`,component:s,parameters:{docs:{story:{inline:!1}}},argTypes:{inputSize:{control:`radio`,options:[a.SMALL,a.BIG]},leftIconName:{control:`select`,options:[void 0,...Object.values(r)]},rightIconName:{control:`select`,options:[void 0,...Object.values(r)]},showTitle:{control:`boolean`},showLeftIcon:{control:`boolean`},showRightIcon:{control:`boolean`},showCaption:{control:`boolean`},showSubtitle:{control:`boolean`},showLoader:{control:`boolean`},error:{control:`boolean`},disabled:{control:`boolean`},readOnly:{control:`boolean`},caption:{control:`text`},subtitle:{control:`text`},leftIcon:{control:!1},rightIcon:{control:!1},loader:{control:!1},leftIconProps:{control:!1},rightIconProps:{control:!1}},decorators:[e=>(0,d.jsx)(`div`,{style:{width:436,maxWidth:`100%`},children:(0,d.jsx)(e,{})})]},p={args:{text:`Description`,placeholder:`Write a description`}},m={args:{text:`Description`,defaultValue:`First line
Second line`}},h={args:{"aria-label":`Description`,placeholder:`Write a description`}},g={args:{...m.args,disabled:!0}},_={args:{...m.args,readOnly:!0}},v={args:{...m.args,autoFocus:!0}},y={args:p.args,parameters:{theme:`dark`}},b={render:()=>(0,d.jsx)(l,{})},x={args:{text:`Title`,placeholder:`Placeholder`,subtitle:`Subtitle`,caption:`Caption`,showTitle:!0,showLeftIcon:!0,showRightIcon:!0,showCaption:!0,showSubtitle:!0,showLoader:!0}},S={args:{...x.args,inputSize:a.BIG}},C={args:{...p.args,error:!0,subtitle:`Check the description`}},w={args:{...x.args,"aria-label":`Description`,showTitle:!1,showLeftIcon:!1,showRightIcon:!1,showCaption:!1,showSubtitle:!1,showLoader:!1}},T={args:{...x.args,leftIconName:r.Plus,rightIcon:(0,d.jsx)(`span`,{children:`★`}),loader:(0,d.jsx)(`span`,{children:`…`}),caption:(0,d.jsx)(`strong`,{children:`Optional`}),subtitle:`Any prepared help text`}},E={args:{...p.args,rows:6,showRightIcon:!1}},D={args:{...p.args,showRightIcon:!1,style:{resize:`vertical`}}},O={args:{...x.args,inputSize:{desktop:a.BIG,laptopL:a.SMALL,mobile:a.SMALL}}},k=[`Empty`,`Filled`,`NoLabel`,`Disabled`,`ReadOnly`,`Focus`,`Dark`,`Controlled`,`AllSlots`,`BigAllSlots`,`Invalid`,`HiddenSlots`,`CustomSlots`,`Rows`,`NativeResize`,`Responsive`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Description",
    placeholder: "Write a description"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Description",
    defaultValue: "First line\\nSecond line"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    "aria-label": "Description",
    placeholder: "Write a description"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...Filled.args,
    disabled: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...Filled.args,
    readOnly: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...Filled.args,
    autoFocus: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: Empty.args,
  parameters: {
    theme: "dark"
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <ControlledTextArea />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Title",
    placeholder: "Placeholder",
    subtitle: "Subtitle",
    caption: "Caption",
    showTitle: true,
    showLeftIcon: true,
    showRightIcon: true,
    showCaption: true,
    showSubtitle: true,
    showLoader: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    inputSize: InputSize.BIG
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    ...Empty.args,
    error: true,
    subtitle: "Check the description"
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    "aria-label": "Description",
    showTitle: false,
    showLeftIcon: false,
    showRightIcon: false,
    showCaption: false,
    showSubtitle: false,
    showLoader: false
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    leftIconName: IconName.Plus,
    rightIcon: <span>★</span>,
    loader: <span>…</span>,
    caption: <strong>Optional</strong>,
    subtitle: "Any prepared help text"
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...Empty.args,
    rows: 6,
    showRightIcon: false
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    ...Empty.args,
    showRightIcon: false,
    style: {
      resize: "vertical"
    }
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    inputSize: {
      desktop: InputSize.BIG,
      laptopL: InputSize.SMALL,
      mobile: InputSize.SMALL
    }
  }
}`,...O.parameters?.docs?.source}}}})))()}A();export{x as AllSlots,S as BigAllSlots,b as Controlled,T as CustomSlots,y as Dark,g as Disabled,p as Empty,m as Filled,v as Focus,w as HiddenSlots,C as Invalid,D as NativeResize,h as NoLabel,_ as ReadOnly,O as Responsive,E as Rows,k as __namedExportsOrder,f as default};