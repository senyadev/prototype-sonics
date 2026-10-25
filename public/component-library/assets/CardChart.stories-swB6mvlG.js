import{n as e}from"./iframe-BzXzTfmr.js";import{t}from"./getResponsiveSizeDataAttributes-Bw-V-6dy.js";import{n}from"./resolveResponsiveValue-BKzPYf0q.js";import{t as r}from"./dateFormatting-CbjP1cYO.js";import{a as i,c as a,i as o,n as s,s as c,t as l}from"./SmallAreaChart-B2d9uqlI.js";import{n as u,t as d}from"./cardChartSize-BzHcq54W.js";import{n as f}from"./rolldown-runtime-DkW27tQK.js";var p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=f((()=>{p=`_card_ads9p_1`,m=`_infoBox_ads9p_21`,h=`_bottomBox_ads9p_29`,g=`_headerBox_ads9p_120`,_=`_title_ads9p_129`,v=`_titleValue_ads9p_138`,y=`_section_ads9p_158`,b=`_sectionDescription_ads9p_168`,x=`_sectionValue_ads9p_180`,S=`_chartBox_ads9p_192`,C={card:p,infoBox:m,bottomBox:h,headerBox:g,title:_,titleValue:v,section:y,sectionDescription:b,sectionValue:x,chartBox:S}})))()}function T(e){let{title:r,value:i,stats:a,chartData:o,series:s,tooltip:c,size:u}=e,f=n(u,d),p=t(f);return(0,E.jsxs)(`div`,{className:C.card,"data-size":f.desktop,...p,children:[(0,E.jsxs)(`div`,{className:C.infoBox,children:[(0,E.jsxs)(`div`,{className:C.headerBox,children:[(0,E.jsx)(`div`,{className:C.title,children:r}),(0,E.jsx)(`div`,{className:C.titleValue,children:i})]}),(0,E.jsx)(`div`,{className:C.bottomBox,children:a.map(e=>(0,E.jsxs)(`div`,{className:C.section,children:[(0,E.jsx)(`div`,{className:C.sectionDescription,children:e.label}),(0,E.jsx)(`div`,{className:C.sectionValue,children:e.value})]},e.label))})]}),(0,E.jsx)(`div`,{className:C.chartBox,children:(0,E.jsx)(l,{type:`one-line`,chartData:o,series:{encoded:s},tooltip:{...c,labels:{encoded:r}},showHorizontal:!1,showVertical:!1,showXAxis:!1,showYAxis:!1})})]})}var E;function D(){return(D=f((()=>{u(),s(),w(),E=e(),T.__docgenInfo={description:``,methods:[],displayName:`CardChart`,props:{title:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`string`},description:``},stats:{required:!0,tsType:{name:`unknown`},description:``},chartData:{required:!0,tsType:{name:`unknown`},description:``},series:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  color: AreaChartColorScheme;
}`,signature:{properties:[{key:`color`,value:{name:`AreaChartColorScheme`,required:!0}}]}},description:``},tooltip:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  formatDate: (date: string) => string;
  formatValue: (value: number, series: AreaChartSeriesKey) => string;
}`,signature:{properties:[{key:`formatDate`,value:{name:`signature`,type:`function`,raw:`(date: string) => string`,signature:{arguments:[{type:{name:`string`},name:`date`}],return:{name:`string`}},required:!0}},{key:`formatValue`,value:{name:`signature`,type:`function`,raw:`(value: number, series: AreaChartSeriesKey) => string`,signature:{arguments:[{type:{name:`number`},name:`value`},{type:{name:`union`,raw:`"encoded" | "decoded"`,elements:[{name:`literal`,value:`"encoded"`},{name:`literal`,value:`"decoded"`}]},name:`series`}],return:{name:`string`}},required:!0}}]}},description:``},size:{required:!1,tsType:{name:`union`,raw:`T | Partial<ResolvedResponsiveValue<T>>`,elements:[{name:`union`,raw:`"desktop" | "mobile"`,elements:[{name:`literal`,value:`"desktop"`},{name:`literal`,value:`"mobile"`}]},{name:`Partial`,elements:[{name:`Record`,elements:[{name:`unknown[number]`,raw:`(typeof RESPONSIVE_BREAKPOINTS)[number]`},{name:`union`,raw:`"desktop" | "mobile"`,elements:[{name:`literal`,value:`"desktop"`},{name:`literal`,value:`"mobile"`}]}],raw:`Record<ResponsiveBreakpoint, T>`}],raw:`Partial<ResolvedResponsiveValue<T>>`}]},description:``}}}})))()}var O,k,A,j,M,N,P,F,I;function L(){return(L=f((()=>{a(),i(),D(),O=e(),k=r(`ru-RU`,{day:`numeric`,month:`long`,year:`numeric`}),A=new Intl.NumberFormat(`ru-RU`),j={formatDate:k,formatValue:e=>A.format(e)},M={title:`ui-kit/charts/AreaChart/CardChart`,component:T,argTypes:{},parameters:{controls:{exclude:/.*/g,hideNoControlsWarning:!0}}},N={render:e=>(0,O.jsx)(T,{...e,chartData:c}),args:{title:`Наблюдений`,value:`1 123 456 567`,stats:[{label:`за неделю`,value:`6`},{label:`за месяц`,value:`32`}],series:{color:o.GREEN},tooltip:j},parameters:{backgrounds:{default:`dark`}}},P={render:e=>(0,O.jsx)(T,{...e,chartData:c}),args:{title:`Наблюдений`,value:`1 123 456 567`,stats:[{label:`за неделю`,value:`6`},{label:`за месяц`,value:`32`}],series:{color:o.GREEN},tooltip:j,size:`desktop`},parameters:{backgrounds:{default:`dark`}}},F={render:e=>(0,O.jsx)(T,{...e,chartData:c}),args:{title:`Наблюдений`,value:`1 123 456 567`,stats:[{label:`за неделю`,value:`6`},{label:`за месяц`,value:`32`}],series:{color:o.GREEN},tooltip:j,size:`mobile`},parameters:{backgrounds:{default:`dark`}}},I=[`Default`,`Desktop`,`Mobile`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <CardChart {...args} chartData={CHART_MOCK_ENCODED_DATA} />;
  },
  args: {
    title: "Наблюдений",
    value: "1 123 456 567",
    stats: [{
      label: "за неделю",
      value: "6"
    }, {
      label: "за месяц",
      value: "32"
    }],
    series: {
      color: AreaChartColorScheme.GREEN
    },
    tooltip
  },
  parameters: {
    backgrounds: {
      default: "dark"
    }
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <CardChart {...args} chartData={CHART_MOCK_ENCODED_DATA} />;
  },
  args: {
    title: "Наблюдений",
    value: "1 123 456 567",
    stats: [{
      label: "за неделю",
      value: "6"
    }, {
      label: "за месяц",
      value: "32"
    }],
    series: {
      color: AreaChartColorScheme.GREEN
    },
    tooltip,
    size: "desktop"
  },
  parameters: {
    backgrounds: {
      default: "dark"
    }
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <CardChart {...args} chartData={CHART_MOCK_ENCODED_DATA} />;
  },
  args: {
    title: "Наблюдений",
    value: "1 123 456 567",
    stats: [{
      label: "за неделю",
      value: "6"
    }, {
      label: "за месяц",
      value: "32"
    }],
    series: {
      color: AreaChartColorScheme.GREEN
    },
    tooltip,
    size: "mobile"
  },
  parameters: {
    backgrounds: {
      default: "dark"
    }
  }
}`,...F.parameters?.docs?.source}}}})))()}L();export{N as Default,P as Desktop,F as Mobile,I as __namedExportsOrder,M as default};