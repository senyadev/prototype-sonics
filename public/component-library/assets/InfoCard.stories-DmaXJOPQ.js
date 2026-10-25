import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Icon-DcOdqD_T.js";import{n as a,t as o}from"./clsx-CTwy9ux-.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";var c,l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=s((()=>{c=`_wrapper_1oln1_1`,l=`_desktop_1oln1_17`,u=`_mobile_1oln1_22`,d=`_header_1oln1_28`,f=`_footer_1oln1_34`,p=`_valueBlock_1oln1_41`,m=`_label_1oln1_48`,h=`_value_1oln1_41`,g=`_percentage_1oln1_71`,_=`_profile_1oln1_81`,v=`_icon_1oln1_108`,y={wrapper:c,desktop:l,mobile:u,header:d,footer:f,valueBlock:p,label:m,value:h,percentage:g,profile:_,icon:v}})))()}var x,S,C,w,T,E,D;function O(){return(O=s((()=>{x=`_marker_1pyb6_1`,S=`_green_1pyb6_7`,C=`_blue_1pyb6_11`,w=`_red_1pyb6_15`,T=`_brand_1pyb6_19`,E=`_gray_1pyb6_23`,D={marker:x,green:S,blue:C,red:w,brand:T,gray:E}})))()}function k({color:e,className:t}){return(0,A.jsx)(`div`,{className:o(D.marker,M[e],t)})}var A,j,M;function N(){return(N=s((()=>{a(),O(),A=e(),j=function(e){return e.GREEN=`green`,e.BLUE=`blue`,e.RED=`red`,e.BRAND=`brand`,e.GRAY=`gray`,e}({}),M={[j.GREEN]:D.green,[j.BLUE]:D.blue,[j.RED]:D.red,[j.BRAND]:D.brand,[j.GRAY]:D.gray},k.__docgenInfo={description:``,methods:[],displayName:`InfoCardMarkerBase`,props:{color:{required:!0,tsType:{name:`InfoCardMarkerColor`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}function P({label:e,value:t,percentage:n,className:r,actionSlot:i,iconSlot:a,markerColor:s,variant:c=I.DESKTOP}){return(0,F.jsxs)(`div`,{className:o(y.wrapper,y[c],r),children:[(0,F.jsxs)(`div`,{className:y.header,children:[a&&(0,F.jsx)(`span`,{className:y.icon,children:a}),s&&(0,F.jsx)(k,{color:s}),(0,F.jsx)(`p`,{className:y.label,children:e})]}),(0,F.jsxs)(`div`,{className:y.footer,children:[(0,F.jsxs)(`div`,{className:y.valueBlock,children:[(0,F.jsx)(`p`,{className:y.value,children:t}),n&&(0,F.jsx)(`span`,{className:y.percentage,children:n})]}),i&&(0,F.jsx)(`div`,{className:y.action,children:i})]})]})}var F,I;function L(){return(L=s((()=>{a(),b(),N(),F=e(),I=function(e){return e.DESKTOP=`desktop`,e.MOBILE=`mobile`,e.PROFILE=`profile`,e}({}),P.__docgenInfo={description:``,methods:[],displayName:`InfoCard`,props:{label:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`string`},description:``},percentage:{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``},actionSlot:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},iconSlot:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},markerColor:{required:!1,tsType:{name:`InfoCardMarkerColor`},description:``},variant:{required:!1,tsType:{name:`InfoCardVariant`},description:``,defaultValue:{value:`InfoCardVariant.DESKTOP`,computed:!0}}}}})))()}var R,z,B,V,H,U,W;function G(){return(G=s((()=>{t(),n(),L(),N(),R=e(),z={title:`ui-kit/info-card`,component:P,parameters:{layout:`centered`},argTypes:{markerColor:{control:`select`,options:Object.values(j)},variant:{control:`radio`,options:Object.values(I)},percentage:{control:`text`},actionSlot:{control:!1},iconSlot:{control:!1}}},B={args:{label:`В сети`,value:`117`,percentage:`32%`,markerColor:j.GREEN,variant:I.DESKTOP}},V={args:{label:`Не в сети`,value:`117`,percentage:`32%`,markerColor:j.RED,variant:I.MOBILE}},H={args:{label:`Всего`,value:`366`,variant:I.DESKTOP}},U={args:{label:`Станций`,value:`5`,iconSlot:(0,R.jsx)(i,{iconName:r.SatelliteDish,width:24,height:24,"aria-hidden":`true`}),variant:I.PROFILE}},W=[`Playground`,`Mobile`,`WithoutMarker`,`ProfileStatistics`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    label: "В сети",
    value: "117",
    percentage: "32%",
    markerColor: InfoCardMarkerColor.GREEN,
    variant: InfoCardVariant.DESKTOP
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Не в сети",
    value: "117",
    percentage: "32%",
    markerColor: InfoCardMarkerColor.RED,
    variant: InfoCardVariant.MOBILE
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Всего",
    value: "366",
    variant: InfoCardVariant.DESKTOP
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Станций",
    value: "5",
    iconSlot: <Icon iconName={IconName.SatelliteDish} width={24} height={24} aria-hidden="true" />,
    variant: InfoCardVariant.PROFILE
  }
}`,...U.parameters?.docs?.source}}}})))()}G();export{V as Mobile,B as Playground,U as ProfileStatistics,H as WithoutMarker,W as __namedExportsOrder,z as default};