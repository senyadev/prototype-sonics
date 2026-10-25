import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{n,t as r}from"./NavigationButton-E6zldjuE.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";var a,o;function s(){return(s=i((()=>{a=`_wrapper_dgxo8_1`,o={wrapper:a}})))()}function c(e){let{items:t}=e;return(0,u.jsx)(`div`,{className:o.wrapper,children:t.map(e=>(0,l.createElement)(r,{...e,key:e.href??e.text}))})}var l,u;function d(){return(d=i((()=>{s(),n(),l=t(),u=e(),c.__docgenInfo={description:``,methods:[],displayName:`NavigationBar`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`NavigationItemBase &
({ onClick?: () => void; href?: never; as?: never } | (LinkRendererProps & { as?: ElementType<LinkRendererProps> }))`,elements:[{name:`signature`,type:`object`,raw:`{ text: string; isActive?: boolean }`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`isActive`,value:{name:`boolean`,required:!1}}]}},{name:`unknown`}]}],raw:`NavigationButtonItem[]`},description:``}}}})))()}function f({children:e,focus:t=!1}){let n=(0,p.useRef)(null);return(0,p.useEffect)(()=>{t&&n.current?.querySelector(`button, a`)?.focus()},[t]),(0,m.jsx)(`div`,{ref:n,children:e})}var p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=i((()=>{p=t(),d(),n(),m=e(),h={title:`ui-kit/navbar/NavigationBar`,component:c,parameters:{docs:{story:{inline:!1}}}},g=[{text:`Главная`,isActive:!0},{text:`Дашборд`},{text:`Сводка`}],_=()=>{let[e,t]=(0,p.useState)(0);return(0,m.jsx)(c,{items:[{text:`Главная`,onClick:()=>t(0),isActive:e===0},{text:`Каталог`,onClick:()=>t(1),isActive:e===1},{text:`Профиль`,onClick:()=>t(2),isActive:e===2}]})},v={render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(_,{})})},y={parameters:{theme:`light`},render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(c,{items:g})})},b={parameters:{theme:`dark`},render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(c,{items:g})})},x={parameters:{docs:{description:{story:`Hover each item, then use Tab and Shift+Tab to check the keyboard focus outline.`}}},render:()=>(0,m.jsx)(f,{focus:!0,children:(0,m.jsx)(c,{items:g})})},S={render:()=>(0,m.jsxs)(f,{children:[(0,m.jsx)(r,{text:`Главная`,isActive:!0}),(0,m.jsx)(r,{text:`Дашборд`})]})},C={render:()=>(0,m.jsxs)(f,{children:[(0,m.jsx)(c,{items:[{text:`Первый раздел`,href:`#navigation-first`,isActive:!0},{text:`Второй раздел`,href:`#navigation-second`}]}),(0,m.jsx)(`section`,{id:`navigation-first`,children:`Первый раздел`}),(0,m.jsx)(`section`,{id:`navigation-second`,children:`Второй раздел`})]})},w=[`Interactive`,`Light`,`Dark`,`HoverAndFocus`,`StandaloneButton`,`Links`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Preview>
      <InteractiveNavBar />
    </Preview>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    theme: "light"
  },
  render: () => <Preview>
      <NavigationBar items={stateItems} />
    </Preview>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    theme: "dark"
  },
  render: () => <Preview>
      <NavigationBar items={stateItems} />
    </Preview>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Hover each item, then use Tab and Shift+Tab to check the keyboard focus outline."
      }
    }
  },
  render: () => <Preview focus>
      <NavigationBar items={stateItems} />
    </Preview>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Preview>
      <NavigationButton text="Главная" isActive />
      <NavigationButton text="Дашборд" />
    </Preview>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Preview>
      <NavigationBar items={[{
      text: "Первый раздел",
      href: "#navigation-first",
      isActive: true
    }, {
      text: "Второй раздел",
      href: "#navigation-second"
    }]} />
      <section id="navigation-first">Первый раздел</section>
      <section id="navigation-second">Второй раздел</section>
    </Preview>
}`,...C.parameters?.docs?.source}}}})))()}T();export{b as Dark,x as HoverAndFocus,v as Interactive,y as Light,C as Links,S as StandaloneButton,w as __namedExportsOrder,h as default};