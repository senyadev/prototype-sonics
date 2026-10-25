import{n as e}from"./iframe-BzXzTfmr.js";import{t}from"./getResponsiveSizeDataAttributes-Bw-V-6dy.js";import{n}from"./resolveResponsiveValue-BKzPYf0q.js";import{t as r}from"./dateFormatting-CbjP1cYO.js";import{a as i,c as a,i as o,n as s,o as c,r as l,t as u}from"./SmallAreaChart-B2d9uqlI.js";import{n as d,t as f}from"./cardChartSize-BzHcq54W.js";import{n as p,t as m}from"./LegendItem-DXfWcVk-.js";import{n as h}from"./rolldown-runtime-DkW27tQK.js";var g,_,v,y,b,x,S,C,w,T;function E(){return(E=h((()=>{g=`_card_1wkg0_1`,_=`_infoBox_1wkg0_21`,v=`_bottomBox_1wkg0_29`,y=`_headerBox_1wkg0_120`,b=`_title_1wkg0_129`,x=`_titleValue_1wkg0_138`,S=`_section_1wkg0_158`,C=`_legendItem_1wkg0_168`,w=`_chartBox_1wkg0_172`,T={card:g,infoBox:_,bottomBox:v,headerBox:y,title:b,titleValue:x,section:S,legendItem:C,chartBox:w}})))()}function D(e){let{title:r,value:i,series:a,chartData:o,tooltip:s,size:c}=e,d=n(c,f),p=t(d);return(0,O.jsxs)(`div`,{className:T.card,"data-size":d.desktop,...p,children:[(0,O.jsxs)(`div`,{className:T.infoBox,children:[(0,O.jsxs)(`div`,{className:T.headerBox,children:[(0,O.jsx)(`div`,{className:T.title,children:r}),(0,O.jsx)(`div`,{className:T.titleValue,children:i})]}),(0,O.jsxs)(`div`,{className:T.bottomBox,children:[(0,O.jsx)(`div`,{className:T.section,children:(0,O.jsx)(m,{className:T.legendItem,markerColor:l[a.encoded.color],children:a.encoded.label})}),(0,O.jsx)(`div`,{className:T.section,children:(0,O.jsx)(m,{className:T.legendItem,markerColor:l[a.decoded.color],children:a.decoded.label})})]})]}),(0,O.jsx)(`div`,{className:T.chartBox,children:(0,O.jsx)(u,{type:`two-line`,chartData:o,series:{encoded:{color:a.encoded.color},decoded:{color:a.decoded.color}},tooltip:{...s,labels:{encoded:a.encoded.label,decoded:a.decoded.label}},showHorizontal:!1,showVertical:!1,showXAxis:!1,showYAxis:!1})})]})}var O;function k(){return(k=h((()=>{p(),d(),i(),s(),E(),O=e(),D.__docgenInfo={description:``,methods:[],displayName:`CardChartTwoLines`,props:{title:{required:!0,tsType:{name:`string`},description:``},value:{required:!0,tsType:{name:`string`},description:``},series:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  encoded: CardChartLegendSeries;
  decoded: CardChartLegendSeries;
}`,signature:{properties:[{key:`encoded`,value:{name:`signature`,type:`object`,raw:`{
  color: AreaChartColorScheme;
  label: string;
}`,signature:{properties:[{key:`color`,value:{name:`AreaChartColorScheme`,required:!0}},{key:`label`,value:{name:`string`,required:!0}}]},required:!0}},{key:`decoded`,value:{name:`signature`,type:`object`,raw:`{
  color: AreaChartColorScheme;
  label: string;
}`,signature:{properties:[{key:`color`,value:{name:`AreaChartColorScheme`,required:!0}},{key:`label`,value:{name:`string`,required:!0}}]},required:!0}}]}},description:``},chartData:{required:!0,tsType:{name:`unknown`},description:``},tooltip:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  formatDate: (date: string) => string;
  formatValue: (value: number, series: AreaChartSeriesKey) => string;
}`,signature:{properties:[{key:`formatDate`,value:{name:`signature`,type:`function`,raw:`(date: string) => string`,signature:{arguments:[{type:{name:`string`},name:`date`}],return:{name:`string`}},required:!0}},{key:`formatValue`,value:{name:`signature`,type:`function`,raw:`(value: number, series: AreaChartSeriesKey) => string`,signature:{arguments:[{type:{name:`number`},name:`value`},{type:{name:`union`,raw:`"encoded" | "decoded"`,elements:[{name:`literal`,value:`"encoded"`},{name:`literal`,value:`"decoded"`}]},name:`series`}],return:{name:`string`}},required:!0}}]}},description:``},size:{required:!1,tsType:{name:`union`,raw:`T | Partial<ResolvedResponsiveValue<T>>`,elements:[{name:`union`,raw:`"desktop" | "mobile"`,elements:[{name:`literal`,value:`"desktop"`},{name:`literal`,value:`"mobile"`}]},{name:`Partial`,elements:[{name:`Record`,elements:[{name:`unknown[number]`,raw:`(typeof RESPONSIVE_BREAKPOINTS)[number]`},{name:`union`,raw:`"desktop" | "mobile"`,elements:[{name:`literal`,value:`"desktop"`},{name:`literal`,value:`"mobile"`}]}],raw:`Record<ResponsiveBreakpoint, T>`}],raw:`Partial<ResolvedResponsiveValue<T>>`}]},description:``}}}})))()}var A,j,M,N,P,F,I,L,R;function z(){return(z=h((()=>{a(),i(),k(),A=e(),j=r(`ru-RU`,{day:`numeric`,month:`long`,year:`numeric`}),M=new Intl.NumberFormat(`ru-RU`),N={formatDate:j,formatValue:e=>M.format(e)},P={title:`ui-kit/charts/AreaChart/CardChartTwoLines`,component:D,argTypes:{},parameters:{controls:{exclude:/.*/g,hideNoControlsWarning:!0},backgrounds:{default:`dark`}}},F={render:e=>(0,A.jsx)(D,{...e,chartData:c}),args:{title:`Данных`,value:`1 123 456 567`,series:{encoded:{label:`Закодированных`,color:o.ORANGE},decoded:{label:`Декодированных`,color:o.BLUE}},tooltip:N}},I={render:e=>(0,A.jsx)(D,{...e,chartData:c}),args:{title:`Данных`,value:`1 123 456 567`,series:{encoded:{label:`Закодированных`,color:o.ORANGE},decoded:{label:`Декодированных`,color:o.BLUE}},tooltip:N,size:`desktop`}},L={render:e=>(0,A.jsx)(D,{...e,chartData:c}),args:{title:`Данных`,value:`1 123 456 567`,series:{encoded:{label:`Закодированных`,color:o.ORANGE},decoded:{label:`Декодированных`,color:o.BLUE}},tooltip:N,size:`mobile`}},R=[`Default`,`Desktop`,`Mobile`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <CardChartTwoLines {...args} chartData={CHART_MOCK_DATA} />;
  },
  args: {
    title: "Данных",
    value: "1 123 456 567",
    series: {
      encoded: {
        label: "Закодированных",
        color: AreaChartColorScheme.ORANGE
      },
      decoded: {
        label: "Декодированных",
        color: AreaChartColorScheme.BLUE
      }
    },
    tooltip
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <CardChartTwoLines {...args} chartData={CHART_MOCK_DATA} />;
  },
  args: {
    title: "Данных",
    value: "1 123 456 567",
    series: {
      encoded: {
        label: "Закодированных",
        color: AreaChartColorScheme.ORANGE
      },
      decoded: {
        label: "Декодированных",
        color: AreaChartColorScheme.BLUE
      }
    },
    tooltip,
    size: "desktop"
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <CardChartTwoLines {...args} chartData={CHART_MOCK_DATA} />;
  },
  args: {
    title: "Данных",
    value: "1 123 456 567",
    series: {
      encoded: {
        label: "Закодированных",
        color: AreaChartColorScheme.ORANGE
      },
      decoded: {
        label: "Декодированных",
        color: AreaChartColorScheme.BLUE
      }
    },
    tooltip,
    size: "mobile"
  }
}`,...L.parameters?.docs?.source}}}})))()}z();export{F as Default,I as Desktop,L as Mobile,R as __namedExportsOrder,P as default};