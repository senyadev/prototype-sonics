import{n as e}from"./iframe-BzXzTfmr.js";import{i as t,n,r,t as i}from"./Icon-DcOdqD_T.js";import{n as a,t as o}from"./country-BvhgJirg.js";import{n as s}from"./rolldown-runtime-DkW27tQK.js";var c,l,u,d,f,p,m;function h(){return(h=s((()=>{a(),t(),n(),c=e(),l={title:`ui-kit/icon`,component:i},u={render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`16px`},children:Object.values(r).map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,width:64},children:[(0,c.jsx)(i,{iconName:e,width:24,height:24}),(0,c.jsx)(`span`,{style:{fontSize:10,textAlign:`center`},children:e})]},e))})},d={render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,gap:16},children:[r.AdminRole,r.ModeratorRole,r.OperatorRole,r.TeacherRole,r.StudentRole,r.StationOwnerRole].map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,c.jsx)(`span`,{style:{width:32,height:32},children:(0,c.jsx)(i,{iconName:e})}),(0,c.jsx)(`span`,{children:e})]},e))})},f={render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[`ae`,`br`,`ca`,`cn`,`de`,`FR`,`in`,`ir`,`jp`,`ru`,`sG`,`um`,`us`,`za`,`xx`,``].map(e=>{let t=o(e);return(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,c.jsx)(`span`,{style:{display:`flex`,alignItems:`center`,height:24},children:t===void 0?(0,c.jsx)(`span`,{children:`No flag`}):(0,c.jsx)(i,{iconName:t,width:24,height:24,role:`img`,"aria-label":e.toUpperCase()})}),(0,c.jsx)(`code`,{children:e||`(empty)`})]},e)})})},p={render:()=>(0,c.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:Object.values(r).filter(e=>o(e.slice(0,2))===e).map(e=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8,width:40},children:[(0,c.jsx)(i,{iconName:e,width:24,height:24,role:`img`,"aria-label":e.slice(0,2)}),(0,c.jsx)(`code`,{children:e.slice(0,2)})]},e))})},m=[`AllIcons`,`ProfileRoles`,`CountryCodes`,`AllCountryFlags`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "16px"
  }}>
      {Object.values(IconName).map(iconName => <div key={iconName} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 64
    }}>
          <Icon iconName={iconName} width={24} height={24} />
          <span style={{
        fontSize: 10,
        textAlign: "center"
      }}>{iconName}</span>
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: 16
  }}>
      {[IconName.AdminRole, IconName.ModeratorRole, IconName.OperatorRole, IconName.TeacherRole, IconName.StudentRole, IconName.StationOwnerRole].map(iconName => <div key={iconName} style={{
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
          <span style={{
        width: 32,
        height: 32
      }}>
            <Icon iconName={iconName} />
          </span>
          <span>{iconName}</span>
        </div>)}
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 16
  }}>
      {["ae", "br", "ca", "cn", "de", "FR", "in", "ir", "jp", "ru", "sG", "um", "us", "za", "xx", ""].map(code => {
      const iconName = getCountryIcon(code);
      return <div key={code} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
      }}>
            <span style={{
          display: "flex",
          alignItems: "center",
          height: 24
        }}>
              {iconName === undefined ? <span>No flag</span> : <Icon iconName={iconName} width={24} height={24} role="img" aria-label={code.toUpperCase()} />}
            </span>
            <code>{code || "(empty)"}</code>
          </div>;
    })}
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 16
  }}>
      {Object.values(IconName).filter(iconName => getCountryIcon(iconName.slice(0, 2)) === iconName).map(iconName => <div key={iconName} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      width: 40
    }}>
            <Icon iconName={iconName} width={24} height={24} role="img" aria-label={iconName.slice(0, 2)} />
            <code>{iconName.slice(0, 2)}</code>
          </div>)}
    </div>
}`,...p.parameters?.docs?.source}}}})))()}h();export{p as AllCountryFlags,u as AllIcons,f as CountryCodes,d as ProfileRoles,m as __namedExportsOrder,l as default};