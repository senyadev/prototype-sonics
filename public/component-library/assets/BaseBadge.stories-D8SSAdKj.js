import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./BaseBadge-D31GTOn4.js";import{n as a,t as o}from"./getBaseBadgeTextClass-DP0UsVf3.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";var c,l,u,d,f,p;function m(){return(m=s((()=>{t(),a(),c=e(),l={title:`ui-kit/badge/BaseBadge`,component:i,argTypes:{badgeType:{control:`radio`,options:Object.values(r)},size:{control:`radio`,options:Object.values(n)},round:{control:`boolean`},children:{control:!1}}},u={args:{badgeType:r.PRIMARY,size:n.BIG,round:!1},render:e=>(0,c.jsx)(i,{...e,children:(0,c.jsx)(`span`,{className:o(e.size??n.BIG),title:`100+`,children:`100+`})})},d={args:{badgeType:r.SECONDARY,size:n.MEDIUM,round:!1},render:e=>(0,c.jsx)(i,{...e,children:(0,c.jsx)(`span`,{className:o(e.size??n.MEDIUM),title:`100+`,children:`100+`})})},f={args:{badgeType:r.PRIMARY,size:n.SMALL,round:!0},render:e=>(0,c.jsx)(i,{...e,children:(0,c.jsx)(`span`,{className:o(e.size??n.SMALL),title:`100+`,children:`100+`})})},p=[`PrimaryLarge`,`SecondaryMedium`,`SmallRound`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    badgeType: BaseBadgeType.PRIMARY,
    size: BaseBadgeSize.BIG,
    round: false
  },
  render: args => <BaseBadge {...args}>
      <span className={getBaseBadgeTextClass(args.size ?? BaseBadgeSize.BIG)} title="100+">
        100+
      </span>
    </BaseBadge>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    badgeType: BaseBadgeType.SECONDARY,
    size: BaseBadgeSize.MEDIUM,
    round: false
  },
  render: args => <BaseBadge {...args}>
      <span className={getBaseBadgeTextClass(args.size ?? BaseBadgeSize.MEDIUM)} title="100+">
        100+
      </span>
    </BaseBadge>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    badgeType: BaseBadgeType.PRIMARY,
    size: BaseBadgeSize.SMALL,
    round: true
  },
  render: args => <BaseBadge {...args}>
      <span className={getBaseBadgeTextClass(args.size ?? BaseBadgeSize.SMALL)} title="100+">
        100+
      </span>
    </BaseBadge>
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as PrimaryLarge,d as SecondaryMedium,f as SmallRound,p as __namedExportsOrder,l as default};