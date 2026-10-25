import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Icon-DcOdqD_T.js";import{n as a,t as o}from"./TextSecondary-DEQ1QScp.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=s((()=>{c=`_secondaryFooter_18zsy_1`,l=`_secondaryCopyright_18zsy_16`,u=`_tertiaryCopyright_18zsy_17`,d=`_tertiaryFooter_18zsy_33`,f=`_tertiaryControls_18zsy_51`,p=`_footer_18zsy_63`,m=`_main_18zsy_87`,h=`_heading_18zsy_102`,g=`_linkBox_18zsy_109`,_=`_footerTextButton_18zsy_124`,v=`_footerTextButtonIcon_18zsy_155`,y=`_title_18zsy_164`,b=`_icon_18zsy_173`,x=`_navigation_18zsy_179`,S=`_column_18zsy_188`,C=`_navigationTitle_18zsy_196`,w=`_navigationLink_18zsy_207`,T=`_navigationText_18zsy_221`,E=`_caption_18zsy_229`,D=`_copyright_18zsy_245`,O=`_license_18zsy_258`,k=`_email_18zsy_276`,A=`_background_18zsy_294`,j={secondaryFooter:c,secondaryCopyright:l,tertiaryCopyright:u,tertiaryFooter:d,tertiaryControls:f,footer:p,main:m,heading:h,linkBox:g,footerTextButton:_,footerTextButtonIcon:v,title:y,icon:b,navigation:x,column:S,navigationTitle:C,navigationLink:w,navigationText:T,caption:E,copyright:D,license:O,email:k,background:A}})))()}function N(e){if(e.variant===F.Secondary)return(0,P.jsx)(`footer`,{className:j.secondaryFooter,children:(0,P.jsxs)(`div`,{className:j.secondaryCopyright,children:[(0,P.jsx)(i,{iconName:r.Soniks,className:j.icon}),e.copyright]})});if(e.variant===F.Tertiary)return(0,P.jsxs)(`footer`,{className:j.tertiaryFooter,children:[(0,P.jsxs)(`div`,{className:j.tertiaryCopyright,children:[(0,P.jsx)(i,{iconName:r.Soniks,className:j.icon}),e.copyright]}),(0,P.jsx)(`div`,{className:j.tertiaryControls,children:e.controls})]});let t=e.linkRenderer??`a`;return(0,P.jsxs)(`footer`,{className:j.footer,children:[(0,P.jsxs)(`div`,{className:j.main,children:[(0,P.jsxs)(`div`,{className:j.heading,children:[(0,P.jsx)(`div`,{className:j.title,children:e.headline}),e.socialLinks?.length?(0,P.jsx)(`div`,{className:j.linkBox,children:e.socialLinks.map(({label:e,href:t,iconName:n})=>(0,P.jsxs)(`a`,{href:t,className:j.footerTextButton,children:[(0,P.jsx)(i,{iconName:n,className:j.footerTextButtonIcon}),(0,P.jsx)(`span`,{children:e})]},`${t}-${e}`))}):null]}),(0,P.jsx)(`div`,{className:j.navigation,children:e.navigationColumns.map(({title:e,links:n})=>(0,P.jsxs)(`div`,{className:j.column,children:[(0,P.jsx)(`div`,{className:j.navigationTitle,children:e}),n.map(({text:e,href:n})=>(0,P.jsx)(t,{href:n,className:j.navigationLink,children:(0,P.jsx)(o,{className:j.navigationText,children:e})},`${n}-${e}`))]},e))})]}),(0,P.jsxs)(`div`,{className:j.caption,children:[(0,P.jsxs)(`div`,{className:j.copyright,children:[(0,P.jsx)(i,{iconName:r.Soniks,className:j.icon}),e.copyright]}),(0,P.jsx)(`div`,{className:j.license,children:e.license}),e.email?(0,P.jsx)(`div`,{className:j.email,children:e.email}):null]}),(0,P.jsx)(i,{"aria-hidden":!0,iconName:r.FooterLogo,className:j.background})]})}var P,F;function I(){return(I=s((()=>{t(),n(),a(),M(),P=e(),F=function(e){return e.Main=`main`,e.Secondary=`secondary`,e.Tertiary=`tertiary`,e}({}),N.__docgenInfo={description:``,methods:[],displayName:`Footer`}})))()}var L,R,z,B,V,H,U;function W(){return(W=s((()=>{t(),I(),L=e(),R={title:`ui-kit/shell/Footer`,component:N,parameters:{layout:`fullscreen`}},z=[{title:`Network`,links:[{text:`Satellites`,href:`#`},{text:`Transmitters`,href:`#`},{text:`Stations`,href:`#`}]},{title:`Project`,links:[{text:`About`,href:`#`},{text:`Documentation`,href:`#`}]}],B={args:{headline:(0,L.jsxs)(L.Fragment,{children:[`Everything interesting`,(0,L.jsx)(`br`,{}),`about Soniks`]}),socialLinks:[{label:`Telegram`,href:`#`,iconName:r.Telegram}],navigationColumns:z,copyright:`SONIKS 2026 ©`,license:`Example license text owned by the consumer.`,email:`sonik@example.com`}},V={args:{variant:F.Secondary,copyright:`SONIKS 2026 ©`}},H={args:{variant:F.Tertiary,copyright:`SONIKS 2026 ©`,controls:(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`button`,{type:`button`,children:`Language`}),(0,L.jsx)(`button`,{type:`button`,children:`Theme`})]})}},U=[`Main`,`Secondary`,`Tertiary`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    headline: <>
        Everything interesting
        <br />
        about Soniks
      </>,
    socialLinks: [{
      label: "Telegram",
      href: "#",
      iconName: IconName.Telegram
    }],
    navigationColumns,
    copyright: "SONIKS 2026 ©",
    license: "Example license text owned by the consumer.",
    email: "sonik@example.com"
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    variant: FooterVariant.Secondary,
    copyright: "SONIKS 2026 ©"
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    variant: FooterVariant.Tertiary,
    copyright: "SONIKS 2026 ©",
    controls: <>
        <button type="button">Language</button>
        <button type="button">Theme</button>
      </>
  }
}`,...H.parameters?.docs?.source}}}})))()}W();export{B as Main,V as Secondary,H as Tertiary,U as __namedExportsOrder,R as default};