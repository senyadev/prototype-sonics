import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{n,t as r}from"./clsx-CTwy9ux-.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";var a,o,s,c,l,u,d,f;function p(){return(p=i((()=>{a=`_wrapper_1mjfu_1`,o=`_tooltip_1mjfu_6`,s=`_arrow_1mjfu_30`,c=`_up_1mjfu_36`,l=`_down_1mjfu_50`,u=`_left_1mjfu_64`,d=`_right_1mjfu_78`,f={wrapper:a,tooltip:o,arrow:s,up:c,down:l,left:u,right:d}})))()}function m(e){let{content:t,children:n,placement:i=`up`,className:a}=e,[o,s]=(0,h.useState)(!1);return(0,g.jsxs)(`span`,{className:r(f.wrapper,a),onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),children:[n,o&&(0,g.jsxs)(`span`,{className:r(f.tooltip,f[i]),children:[t,(0,g.jsx)(`span`,{className:f.arrow})]})]})}var h,g;function _(){return(_=i((()=>{n(),h=t(),p(),g=e(),m.__docgenInfo={description:``,methods:[],displayName:`Tooltip`,props:{content:{required:!0,tsType:{name:`ReactNode`},description:``},children:{required:!0,tsType:{name:`ReactNode`},description:``},placement:{required:!1,tsType:{name:`union`,raw:`"up" | "down" | "left" | "right"`,elements:[{name:`literal`,value:`"up"`},{name:`literal`,value:`"down"`},{name:`literal`,value:`"left"`},{name:`literal`,value:`"right"`}]},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var v,y,b,x,S,C,w;function T(){return(T=i((()=>{_(),v=e(),y={title:`ui-kit/tooltips/Tooltip`,component:m,argTypes:{placement:{control:`select`,options:[`up`,`down`,`left`,`right`]},content:{control:`text`}},decorators:[e=>(0,v.jsx)(`div`,{style:{padding:80,display:`flex`,justifyContent:`center`,alignItems:`center`,height:`300px`},children:(0,v.jsx)(e,{})})]},b={args:{placement:`up`,content:`Подсказка сверху`,children:(0,v.jsx)(`button`,{type:`button`,children:`Наведи на меня`})}},x={args:{placement:`down`,content:`Подсказка снизу`,children:(0,v.jsx)(`button`,{type:`button`,children:`Наведи на меня`})}},S={args:{placement:`left`,content:`Подсказка слева`,children:(0,v.jsx)(`button`,{type:`button`,children:`Наведи на меня`})}},C={args:{placement:`right`,content:`Подсказка справа`,children:(0,v.jsx)(`button`,{type:`button`,children:`Наведи на меня`})}},w=[`Up`,`Down`,`Left`,`Right`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    placement: "up",
    content: "Подсказка сверху",
    children: <button type="button">Наведи на меня</button>
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    placement: "down",
    content: "Подсказка снизу",
    children: <button type="button">Наведи на меня</button>
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    placement: "left",
    content: "Подсказка слева",
    children: <button type="button">Наведи на меня</button>
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    placement: "right",
    content: "Подсказка справа",
    children: <button type="button">Наведи на меня</button>
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Down,S as Left,C as Right,b as Up,w as __namedExportsOrder,y as default};