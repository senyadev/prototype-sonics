import{n as e}from"./iframe-BzXzTfmr.js";import{n as t,t as n}from"./Checkbox-BBbGMS7x.js";import{n as r}from"./rolldown-runtime-DkW27tQK.js";var i,a,o,s,c,l;function u(){return(u=r((()=>{t(),i=e(),{useArgs:a}=__STORYBOOK_MODULE_PREVIEW_API__,o={title:`ui-kit/checkbox/Checkbox/Checkbox`,component:n,argTypes:{checked:{control:`boolean`}}},s={args:{checked:!0,onChange:void 0},render:function(e){let[{checked:t},r]=a(),o=t=>{let n=t.target.checked;r({checked:n}),e.onChange?.(t)};return(0,i.jsx)(n,{...e,checked:t,onChange:o})}},c={args:{checked:!1,onChange:void 0},render:function(e){let[{checked:t},r]=a(),o=t=>{let n=t.target.checked;r({checked:n}),e.onChange?.(t)};return(0,i.jsx)(n,{...e,checked:t,onChange:o})}},l=[`Checked`,`Unchecked`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    return <Checkbox {...args} checked={checked} onChange={handleChange} />;
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
    return <Checkbox {...args} checked={checked} onChange={handleChange} />;
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{s as Checked,c as Unchecked,l as __namedExportsOrder,o as default};