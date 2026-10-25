import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{n,t as r}from"./NavigationButton-E6zldjuE.js";import{n as i}from"./rolldown-runtime-DkW27tQK.js";var a,o;function s(){return(s=i((()=>{a=`_wrapper_pdkab_1`,o={wrapper:a}})))()}function c(e){let{items:t}=e;return(0,u.jsx)(`div`,{className:o.wrapper,children:t.map(e=>(0,l.createElement)(r,{...e,key:e.href??e.text}))})}var l,u;function d(){return(d=i((()=>{n(),s(),l=t(),u=e(),c.__docgenInfo={description:``,methods:[],displayName:`MenuBar`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`NavigationItemBase &
({ onClick?: () => void; href?: never; as?: never } | (LinkRendererProps & { as?: ElementType<LinkRendererProps> }))`,elements:[{name:`signature`,type:`object`,raw:`{ text: string; isActive?: boolean }`,signature:{properties:[{key:`text`,value:{name:`string`,required:!0}},{key:`isActive`,value:{name:`boolean`,required:!1}}]}},{name:`unknown`}]}],raw:`NavigationButtonItem[]`},description:``}}}})))()}function f({children:e,focus:t=!1}){let n=(0,p.useRef)(null);return(0,p.useEffect)(()=>{t&&n.current?.querySelector(`button, a`)?.focus()},[t]),(0,m.jsx)(`div`,{ref:n,children:e})}var p,m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=i((()=>{p=t(),d(),m=e(),h={title:`ui-kit/navbar/MenuBar`,component:c,parameters:{docs:{story:{inline:!1}}}},g=[{text:`Главная`,isActive:!0},{text:`Дашборд`},{text:`Сводка`}],_=()=>{let[e,t]=(0,p.useState)(0);return(0,m.jsx)(c,{items:[{text:`Главная`,onClick:()=>t(0),isActive:e===0},{text:`Каталог`,onClick:()=>t(1),isActive:e===1},{text:`Профиль`,onClick:()=>t(2),isActive:e===2}]})},v={render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(_,{})})},y={parameters:{theme:`light`},render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(c,{items:g})})},b={parameters:{theme:`dark`},render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(c,{items:g})})},x={parameters:{docs:{description:{story:`Hover each item, then use Tab and Shift+Tab to check the keyboard focus outline.`}}},render:()=>(0,m.jsx)(f,{focus:!0,children:(0,m.jsx)(c,{items:g})})},S={render:()=>(0,m.jsxs)(f,{children:[(0,m.jsx)(c,{items:[{text:`Первый раздел`,href:`#menu-first`,isActive:!0},{text:`Второй раздел`,href:`#menu-second`},{text:`Третий раздел`,href:`#menu-third`}]}),(0,m.jsx)(`section`,{id:`menu-first`,children:`Первый раздел`}),(0,m.jsx)(`section`,{id:`menu-second`,children:`Второй раздел`}),(0,m.jsx)(`section`,{id:`menu-third`,children:`Третий раздел`})]})},C={render:()=>(0,m.jsx)(f,{children:(0,m.jsx)(`div`,{style:{width:320,maxWidth:`100%`},children:(0,m.jsx)(c,{items:g})})})},w={render:()=>(0,m.jsxs)(`div`,{style:{display:`grid`,gap:24,padding:16,background:`var(--surface-bg-1)`},children:[(0,m.jsx)(`button`,{type:`button`,onClick:()=>document.documentElement.classList.toggle(`dark`),children:`Переключить светлую/тёмную тему`}),(0,m.jsx)(_,{})]})},T={render:()=>(0,m.jsx)(`div`,{style:{width:280,maxWidth:`100%`},children:(0,m.jsx)(_,{})})},E=[`Interactive`,`Light`,`Dark`,`HoverAndFocus`,`Links`,`Responsive`,`Themes`,`NarrowContainer`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Preview>
      <InteractiveMenuBar />
    </Preview>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    theme: "light"
  },
  render: () => <Preview>
      <MenuBar items={stateItems} />
    </Preview>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    theme: "dark"
  },
  render: () => <Preview>
      <MenuBar items={stateItems} />
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
      <MenuBar items={stateItems} />
    </Preview>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Preview>
      <MenuBar items={[{
      text: "Первый раздел",
      href: "#menu-first",
      isActive: true
    }, {
      text: "Второй раздел",
      href: "#menu-second"
    }, {
      text: "Третий раздел",
      href: "#menu-third"
    }]} />
      <section id="menu-first">Первый раздел</section>
      <section id="menu-second">Второй раздел</section>
      <section id="menu-third">Третий раздел</section>
    </Preview>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Preview>
      <div style={{
      width: 320,
      maxWidth: "100%"
    }}>
        <MenuBar items={stateItems} />
      </div>
    </Preview>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gap: 24,
    padding: 16,
    background: "var(--surface-bg-1)"
  }}>
      <button type="button" onClick={() => document.documentElement.classList.toggle("dark")}>
        Переключить светлую/тёмную тему
      </button>
      <InteractiveMenuBar />
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 280,
    maxWidth: "100%"
  }}>
      <InteractiveMenuBar />
    </div>
}`,...T.parameters?.docs?.source}}}})))()}D();export{b as Dark,x as HoverAndFocus,v as Interactive,y as Light,S as Links,T as NarrowContainer,C as Responsive,w as Themes,E as __namedExportsOrder,h as default};