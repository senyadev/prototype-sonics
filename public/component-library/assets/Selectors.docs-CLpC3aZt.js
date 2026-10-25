import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,r as n}from"./react-DdPkxNay.js";import{a as r,o as i}from"./blocks-ByXJhJhn.js";import{n as a}from"./rolldown-runtime-DkW27tQK.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`ui-kit/selectors`}),`
`,(0,c.jsx)(n.h1,{id:`компоненты-селекторов`,children:`Компоненты селекторов`}),`
`,(0,c.jsxs)(n.p,{children:[`Для реализации логики селекторов используется библиотека `,(0,c.jsx)(n.a,{href:`https://www.downshift-js.com`,rel:`nofollow`,children:`downshift`}),`.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Downshift предоставляет хук `,(0,c.jsx)(n.a,{href:`https://www.downshift-js.com/use-select`,rel:`nofollow`,children:`useSelect`}),`, реализующий логику нативного селекта. Хук возвращает функции, возвращающие пропсы для каждой из частей селектора.`]}),`
`,(0,c.jsx)(n.p,{children:`Пример вызова хука`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-typescript`,children:`const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, getItemProps, highlightedIndex } = useSelect({
  items: options,
  itemToString: (item) => item?.label || "",
  onSelectedItemChange: ({ selectedItem }) => {
    onChange(selectedItem?.value ?? null);
  },
});
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=a((()=>{c=e(),n(),i()})))()}l();export{s as default};