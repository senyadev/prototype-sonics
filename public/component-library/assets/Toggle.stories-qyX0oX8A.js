import{n as e}from"./iframe-BzXzTfmr.js";import{n as t}from"./rolldown-runtime-DkW27tQK.js";var n,r,i,a;function o(){return(o=t((()=>{n=`_toggle_ai2bw_1`,r=`_checkbox_ai2bw_17`,i=`_slider_ai2bw_22`,a={toggle:n,checkbox:r,slider:i}})))()}function s(e){return(0,c.jsxs)(`label`,{className:a.toggle,children:[(0,c.jsx)(`input`,{className:a.checkbox,type:`checkbox`,...e}),(0,c.jsx)(`span`,{className:a.slider})]})}var c;function l(){return(l=t((()=>{o(),c=e(),s.__docgenInfo={description:``,methods:[],displayName:`Toggle`}})))()}var u,d,f,p,m,h;function g(){return(g=t((()=>{l(),u=e(),{useArgs:d}=__STORYBOOK_MODULE_PREVIEW_API__,f={title:`ui-kit/checkbox/Toggle/Toggle`,component:s,argTypes:{checked:{control:`boolean`}}},p={args:{checked:!0,onChange:void 0},render:function(e){let[{checked:t},n]=d(),r=t=>{let r=t.target.checked;n({checked:r}),e.onChange?.(t)};return(0,u.jsx)(s,{...e,checked:t,onChange:r})}},m={args:{checked:!1,onChange:void 0},render:function(e){let[{checked:t},n]=d(),r=t=>{let r=t.target.checked;n({checked:r}),e.onChange?.(t)};return(0,u.jsx)(s,{...e,checked:t,onChange:r})}},h=[`Checked`,`Unchecked`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    checked: true,
    onChange: undefined
  },
  render: function Render(args) {
    const [{
      checked
    }, updateArgs] = useArgs();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      updateArgs({
        checked: newChecked
      });
      args.onChange?.(event);
    };
    return <Toggle {...args} checked={checked} onChange={handleChange} />;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    checked: false,
    onChange: undefined
  },
  render: function Render(args) {
    const [{
      checked
    }, updateArgs] = useArgs();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      updateArgs({
        checked: newChecked
      });
      args.onChange?.(event);
    };
    return <Toggle {...args} checked={checked} onChange={handleChange} />;
  }
}`,...m.parameters?.docs?.source}}}})))()}g();export{p as Checked,m as Unchecked,h as __namedExportsOrder,f as default};