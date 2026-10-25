import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Icon-DcOdqD_T.js";import{n as a,t as o}from"./clsx-CTwy9ux-.js";import{i as s,n as c,r as l,t as u}from"./BaseBadge-D31GTOn4.js";import{n as d,t as f}from"./getBaseBadgeTextClass-DP0UsVf3.js";import{n as p}from"./rolldown-runtime-DkW27tQK.js";var m,h,g,_,v,y,b,x,S;function C(){return(C=p((()=>{m=`_primary_ha9w1_1`,h=`_icon_ha9w1_1`,g=`_iconButton_ha9w1_2`,_=`_iconBox_ha9w1_3`,v=`_secondary_ha9w1_7`,y=`_large_ha9w1_13`,b=`_medium_ha9w1_20`,x=`_small_ha9w1_27`,S={primary:m,icon:h,iconButton:g,iconBox:_,secondary:v,large:y,medium:b,small:x}})))()}function w(e,t){return e?(0,E.jsx)(`button`,{type:`button`,className:S.iconButton,onClick:e,"aria-label":t,children:(0,E.jsx)(i,{iconName:r.Cross,className:S.icon})}):(0,E.jsx)(`span`,{className:S.iconBox,"aria-hidden":`true`,children:(0,E.jsx)(i,{iconName:r.Cross,className:S.icon})})}function T(e){let{text:t,badgeType:n=l.PRIMARY,round:r=!1,size:i=c.MEDIUM,showLeftIcon:a=!1,showRightIcon:s=!1,leftIcon:d,rightIcon:p,onLeftIconClick:m,onRightIconClick:h,className:g,..._}=e,v=f(i);return(0,E.jsxs)(u,{badgeType:n,round:r,size:i,className:o(S[n],S[i],g),..._,children:[d??(a?w(m,`Левая иконка`):null),(0,E.jsx)(`span`,{className:v,title:t,children:t}),p??(s?w(h,`Правая иконка`):null)]})}var E;function D(){return(D=p((()=>{t(),a(),n(),s(),d(),C(),E=e(),T.__docgenInfo={description:``,methods:[],displayName:`TextBadge`,props:{text:{required:!0,tsType:{name:`string`},description:``},badgeType:{required:!1,tsType:{name:`BaseBadgeType`},description:``},round:{required:!1,tsType:{name:`boolean`},description:``},size:{required:!1,tsType:{name:`BaseBadgeSize`},description:``},showLeftIcon:{required:!1,tsType:{name:`boolean`},description:``},showRightIcon:{required:!1,tsType:{name:`boolean`},description:``},leftIcon:{required:!1,tsType:{name:`ReactNode`},description:``},rightIcon:{required:!1,tsType:{name:`ReactNode`},description:``},onLeftIconClick:{required:!1,tsType:{name:`MouseEventHandler`,elements:[{name:`HTMLButtonElement`}],raw:`MouseEventHandler<HTMLButtonElement>`},description:``},onRightIconClick:{required:!1,tsType:{name:`MouseEventHandler`,elements:[{name:`HTMLButtonElement`}],raw:`MouseEventHandler<HTMLButtonElement>`},description:``}},composes:[`HTMLAttributes`]}})))()}var O,k,A,j,M,N,P,F,I,L;function R(){return(R=p((()=>{t(),n(),D(),C(),O=e(),k={title:`ui-kit/badge/TextBadge`,component:T,argTypes:{text:{control:`text`},badgeType:{control:`select`,options:Object.values(l)},size:{control:`select`,options:Object.values(c)},round:{control:`boolean`},showLeftIcon:{control:`boolean`},showRightIcon:{control:`boolean`},leftIcon:{control:!1},rightIcon:{control:!1},onLeftIconClick:{action:`left icon click`},onRightIconClick:{action:`right icon click`}},args:{text:`Text badge`,badgeType:l.PRIMARY,size:c.MEDIUM,round:!1,showLeftIcon:!1,showRightIcon:!1}},A={},j={args:{badgeType:l.SECONDARY}},M={args:{round:!0}},N={args:{showLeftIcon:!0,showRightIcon:!0}},P={args:{text:`Badge with custom icons`,leftIcon:(0,O.jsx)(i,{iconName:r.Eye,className:S.icon}),rightIcon:(0,O.jsx)(i,{iconName:r.Bot,className:S.icon})}},F={args:{text:`Very long badge text that should be truncated`,badgeType:l.SECONDARY,size:c.SMALL,round:!0,showLeftIcon:!0,showRightIcon:!0}},I={args:{text:`Very long badge text that should be truncated`,badgeType:l.SECONDARY,size:c.SMALL,round:!0,leftIcon:(0,O.jsx)(i,{iconName:r.Eye,className:S.icon}),rightIcon:(0,O.jsx)(i,{iconName:r.Bot,className:S.icon})}},L=[`Primary`,`Secondary`,`Round`,`WithIcons`,`WithCustomIcons`,`SmallSecondaryRoundWithIcons`,`SmallSecondaryRoundWithCustomIcons`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    badgeType: TextBadgeType.SECONDARY
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    round: true
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    showLeftIcon: true,
    showRightIcon: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Badge with custom icons",
    leftIcon: <Icon iconName={IconName.Eye} className={classes.icon} />,
    rightIcon: <Icon iconName={IconName.Bot} className={classes.icon} />
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Very long badge text that should be truncated",
    badgeType: TextBadgeType.SECONDARY,
    size: TextBadgeSize.SMALL,
    round: true,
    showLeftIcon: true,
    showRightIcon: true
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Very long badge text that should be truncated",
    badgeType: TextBadgeType.SECONDARY,
    size: TextBadgeSize.SMALL,
    round: true,
    leftIcon: <Icon iconName={IconName.Eye} className={classes.icon} />,
    rightIcon: <Icon iconName={IconName.Bot} className={classes.icon} />
  }
}`,...I.parameters?.docs?.source}}}})))()}R();export{A as Primary,M as Round,j as Secondary,I as SmallSecondaryRoundWithCustomIcons,F as SmallSecondaryRoundWithIcons,P as WithCustomIcons,N as WithIcons,L as __namedExportsOrder,k as default};