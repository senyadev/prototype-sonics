import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Icon-DcOdqD_T.js";import{n as a,t as o}from"./clsx-CTwy9ux-.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";var c,l,u,d;function f(){return(f=s((()=>{c=`_button_w896p_1`,l=`_likeIcon_w896p_53`,u=`_active_w896p_56`,d={button:c,likeIcon:l,active:u}})))()}function p(e){let{count:t,active:n=!1,className:a,...s}=e;return(0,m.jsxs)(`button`,{className:o(d.button,a,{[d.active]:n}),...s,children:[(0,m.jsx)(i,{iconName:n?r.HeartFill:r.Heart,className:d.likeIcon}),t]})}var m;function h(){return(h=s((()=>{t(),a(),n(),f(),m=e(),p.__docgenInfo={description:``,methods:[],displayName:`SocialBtn`,props:{count:{required:!1,tsType:{name:`number`},description:``},active:{required:!1,tsType:{name:`boolean`},description:``}},composes:[`ButtonHTMLAttributes`]}})))()}var g,_,v,y,b;function x(){return(x=s((()=>{h(),g=e(),{useArgs:_}=__STORYBOOK_MODULE_PREVIEW_API__,v={title:`ui-kit/buttons/SocialButton`,component:p},y=()=>{let[e,t]=_(),n=()=>{t({active:!e.active,count:e.active?e.count-1:e.count+1})};return(0,g.jsx)(p,{...e,onClick:n})},y.args={count:1,active:!1},y.__docgenInfo={description:``,methods:[],displayName:`Default`},b=[`Default`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [args, updateArgs] = useArgs();
  const handleClick = () => {
    updateArgs({
      active: !args.active,
      count: args.active ? args.count - 1 : args.count + 1
    });
  };
  return <SocialBtn {...args} onClick={handleClick} />;
}`,...y.parameters?.docs?.source}}}})))()}x();export{y as Default,b as __namedExportsOrder,v as default};