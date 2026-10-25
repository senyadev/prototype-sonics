import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,r as n}from"./Icon-DcOdqD_T.js";import{i as r,r as i}from"./InputBase-D1AfVEwd.js";import{n as a,t as o}from"./Input-VsVYEnmp.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=s((()=>{t(),a(),r(),c=e(),l=[void 0,...Object.values(n)],u={title:`ui-kit/inputs/input`,component:o,parameters:{docs:{story:{inline:!1}}},argTypes:{leftIconName:{name:`icon-left`,control:`select`,options:l,description:`Иконка слева`},rightIconName:{name:`icon-right`,control:`select`,options:l,description:`Иконка справа`},inputSize:{name:`size`,control:`radio`,options:[i.SMALL,i.BIG]},leftIconProps:{table:{disable:!0}},rightIconProps:{table:{disable:!0}},showTitle:{control:`boolean`},showLeftIcon:{control:`boolean`},showRightIcon:{control:`boolean`},showCaption:{control:`boolean`},showSubtitle:{control:`boolean`},showLoader:{control:`boolean`},error:{control:`boolean`},caption:{control:`text`},subtitle:{control:`text`},leftIcon:{control:!1},rightIcon:{control:!1},loader:{control:!1},disabled:{control:`boolean`}},decorators:[e=>(0,c.jsx)(`div`,{style:{width:436,maxWidth:`100%`},children:(0,c.jsx)(e,{})})]},d={args:{placeholder:`Введите текст`,"aria-label":`Text without a visible label`,leftIconName:void 0,rightIconName:void 0}},f={args:{text:`Ваше имя`,placeholder:`Введите имя`}},p={args:{leftIconName:n.Search,placeholder:`Поиск`,"aria-label":`Search`}},m={args:{rightIconName:n.Eye,placeholder:`Пароль`,type:`password`,"aria-label":`Password`}},h={args:{leftIconName:n.Search,rightIconName:n.Cross,placeholder:`Введите запрос`,"aria-label":`Query`}},g={args:{inputSize:i.BIG,placeholder:`Большой инпут`,"aria-label":`Large field`}},_={args:{text:`Name`,defaultValue:`Station`,disabled:!0}},v={args:{text:`Name`,defaultValue:`Station`,readOnly:!0}},y={args:{text:`Name`,defaultValue:`Station`,autoFocus:!0}},b={args:{text:`Responsive field`,inputSize:{desktop:i.BIG,laptopL:i.SMALL,mobile:i.SMALL},leftIconName:n.Search}},x={render:()=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o,{text:`First`}),(0,c.jsx)(o,{text:`Second`}),(0,c.jsx)(o,{id:`explicit-story-input`,text:`Explicit ID`})]})},S={args:{text:`Title`,placeholder:`Placeholder`,subtitle:`Subtitle`,caption:`Caption`,showTitle:!0,showLeftIcon:!0,showRightIcon:!0,showCaption:!0,showSubtitle:!0,showLoader:!0}},C={args:{text:`Name`,placeholder:`Enter your name`,subtitle:`Check the name`,error:!0,showRightIcon:!0}},w={args:{text:`Name`,defaultValue:`Station`}},T={args:{...S.args,inputSize:i.BIG}},E={args:{...S.args,"aria-label":`Name`,showTitle:!1,showLeftIcon:!1,showRightIcon:!1,showCaption:!1,showSubtitle:!1,showLoader:!1}},D={args:{...S.args,leftIcon:(0,c.jsx)(`span`,{children:`★`}),rightIconName:n.Eye,loader:(0,c.jsx)(`span`,{children:`…`}),caption:(0,c.jsx)(`strong`,{children:`Optional`}),subtitle:`Any prepared help text`}},O={args:S.args,parameters:{theme:`dark`}},k=[`Default`,`WithLabel`,`WithLeftIcon`,`WithRightIcon`,`WithBothIcons`,`BigSize`,`Disabled`,`ReadOnly`,`Focus`,`Responsive`,`UniqueLabels`,`AllSlots`,`Invalid`,`Filled`,`BigAllSlots`,`HiddenSlots`,`CustomSlots`,`Dark`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Введите текст",
    "aria-label": "Text without a visible label",
    leftIconName: undefined,
    rightIconName: undefined
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Ваше имя",
    placeholder: "Введите имя"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    leftIconName: IconName.Search,
    placeholder: "Поиск",
    "aria-label": "Search"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    rightIconName: IconName.Eye,
    placeholder: "Пароль",
    type: "password",
    "aria-label": "Password"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    leftIconName: IconName.Search,
    rightIconName: IconName.Cross,
    placeholder: "Введите запрос",
    "aria-label": "Query"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    inputSize: InputSize.BIG,
    placeholder: "Большой инпут",
    "aria-label": "Large field"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Name",
    defaultValue: "Station",
    disabled: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Name",
    defaultValue: "Station",
    readOnly: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Name",
    defaultValue: "Station",
    autoFocus: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Responsive field",
    inputSize: {
      desktop: InputSize.BIG,
      laptopL: InputSize.SMALL,
      mobile: InputSize.SMALL
    },
    leftIconName: IconName.Search
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <Input text="First" />
      <Input text="Second" />
      <Input id="explicit-story-input" text="Explicit ID" />
    </>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Name",
    placeholder: "Enter your name",
    subtitle: "Check the name",
    error: true,
    showRightIcon: true
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Name",
    defaultValue: "Station"
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    inputSize: InputSize.BIG
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    "aria-label": "Name",
    showTitle: false,
    showLeftIcon: false,
    showRightIcon: false,
    showCaption: false,
    showSubtitle: false,
    showLoader: false
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    ...AllSlots.args,
    leftIcon: <span>★</span>,
    rightIconName: IconName.Eye,
    loader: <span>…</span>,
    caption: <strong>Optional</strong>,
    subtitle: "Any prepared help text"
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: AllSlots.args,
  parameters: {
    theme: "dark"
  }
}`,...O.parameters?.docs?.source}}}})))()}A();export{S as AllSlots,T as BigAllSlots,g as BigSize,D as CustomSlots,O as Dark,d as Default,_ as Disabled,w as Filled,y as Focus,E as HiddenSlots,C as Invalid,v as ReadOnly,b as Responsive,x as UniqueLabels,h as WithBothIcons,f as WithLabel,p as WithLeftIcon,m as WithRightIcon,k as __namedExportsOrder,u as default};