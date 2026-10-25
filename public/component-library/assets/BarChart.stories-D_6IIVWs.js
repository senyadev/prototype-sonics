import{n as e,p as t}from"./iframe-BzXzTfmr.js";import{n,t as r}from"./clsx-CTwy9ux-.js";import{n as i,t as a}from"./Skeleton-DGtKqc3D.js";import{t as o}from"./getResponsiveSizeDataAttributes-Bw-V-6dy.js";import{n as s}from"./resolveResponsiveValue-BKzPYf0q.js";import{n as c,r as l}from"./size-Q1FZ-UCY.js";import{i as u,n as ee,r as te,t as ne}from"./CartesianGrid-B9hjbAdi.js";import{a as re,i as ie,o as ae,r as d}from"./CartesianChart-BUDr-Yqb.js";import{a as f,c as p,d as m,f as h,i as g,l as _,n as v,o as y,p as b,r as x,s as S,t as oe,u as C}from"./BarItem-CkOnsLBB.js";import{n as se,t as ce}from"./ChartTooltipPortal-Bpe8USM_.js";import{n as w,t as le}from"./LegendItem-DXfWcVk-.js";import{n as T,t as ue}from"./ScrollBar-Bi3iHYdx.js";import{n as E,r as de}from"./TooltipItem-DP7lbeDx.js";import{n as D}from"./rolldown-runtime-DkW27tQK.js";var fe,pe,me,he,ge,_e,ve,ye,be,xe,O,k;function A(){return(A=D((()=>{fe=`_section_1wtcu_1`,pe=`_chartRow_1wtcu_14`,me=`_yAxis_1wtcu_21`,he=`_plotViewport_1wtcu_27`,ge=`_scrollWrapper_1wtcu_34`,_e=`_plotContent_1wtcu_45`,ve=`_plotChart_1wtcu_52`,ye=`_hoverCursor_1wtcu_59`,be=`_small_1wtcu_63`,xe=`_big_1wtcu_67`,O=`_skeletonYAxis_1wtcu_71`,k={section:fe,chartRow:pe,yAxis:me,plotViewport:he,scrollWrapper:ge,plotContent:_e,plotChart:ve,hoverCursor:ye,small:be,big:xe,skeletonYAxis:O}})))()}var j,M,N,Se,Ce,we,P;function Te(){return(Te=D((()=>{j=`_skeletonYTick_1damw_1`,M=`_skeletonPlot_1damw_7`,N=`_skeletonBars_1damw_14`,Se=`_skeletonBar_1damw_14`,Ce=`_skeletonCaption_1damw_22`,we=`_skeletonCaptions_1damw_54`,P={skeletonYTick:j,skeletonPlot:M,skeletonBars:N,skeletonBar:Se,skeletonCaption:Ce,skeletonCaptions:we}})))()}function Ee(){return(0,F.jsx)(a,{className:P.skeletonYTick})}function De({showCaption:e}){return(0,F.jsxs)(`div`,{className:P.skeletonPlot,children:[(0,F.jsx)(`div`,{className:P.skeletonBars,children:Oe.map(e=>(0,F.jsx)(a,{className:P.skeletonBar,style:{height:e}},`bar-sk-${e}`))}),e&&(0,F.jsx)(`div`,{className:P.skeletonCaptions,children:ke.map(e=>(0,F.jsx)(a,{className:P.skeletonCaption},e))})]})}var F,Oe,ke,I;function L(){return(L=D((()=>{i(),Te(),F=e(),Oe=[270,258,247,235,224,212,201,189,178,166],ke=[`caption-sk-1`,`caption-sk-2`,`caption-sk-3`,`caption-sk-4`,`caption-sk-5`,`caption-sk-6`,`caption-sk-7`,`caption-sk-8`,`caption-sk-9`,`caption-sk-10`],I={YTick:Ee,Plot:De}})))()}var Ae,je,R;function Me(){return(Me=D((()=>{Ae=`_legend_19sxq_1`,je=`_legendSkeleton_19sxq_8`,R={legend:Ae,legendSkeleton:je}})))()}function Ne(e){let{className:t,sources:n,hiddenKeys:i,toggleSource:o,setHoveredKey:s,markerColors:c,isLoading:l=!1}=e;return l?(0,z.jsxs)(`div`,{className:r(R.legend,t),children:[(0,z.jsx)(a,{className:R.legendSkeleton}),(0,z.jsx)(a,{className:R.legendSkeleton})]}):(0,z.jsx)(`div`,{className:r(R.legend,t),children:n.map(e=>{let t=i.includes(e.key);return(0,z.jsx)(le,{markerColor:c[e.key],isHidden:t,onClick:()=>o(e.key),onMouseEnter:()=>{t||s(e.key)},onMouseLeave:()=>{s(null)},children:e.label},e.key)})})}var z;function Pe(){return(Pe=D((()=>{n(),i(),w(),Me(),z=e(),Ne.__docgenInfo={description:``,methods:[],displayName:`BarChartLegend`,props:{className:{required:!1,tsType:{name:`string`},description:``},sources:{required:!0,tsType:{name:`Array`,elements:[{name:`BarChartSource`}],raw:`BarChartSource[]`},description:``},hiddenKeys:{required:!0,tsType:{name:`Array`,elements:[{name:`string`}],raw:`BarChartSourceKey[]`},description:``},toggleSource:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(key: BarChartSourceKey) => void`,signature:{arguments:[{type:{name:`string`},name:`key`}],return:{name:`void`}}},description:``},setHoveredKey:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(key: BarChartSourceKey | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`BarChartSourceKey | null`,elements:[{name:`string`},{name:`null`}]},name:`key`}],return:{name:`void`}}},description:``},markerColors:{required:!0,tsType:{name:`Record`,elements:[{name:`string`},{name:`string`}],raw:`Record<BarChartSourceKey, string>`},description:``},isLoading:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var Fe,Ie;function Le(){return(Le=D((()=>{Fe=`_tick_f9fej_1`,Ie={tick:Fe}})))()}function Re(e){return e.length>Ve?`${e.slice(0,9)}…`:e}function ze(e){let{x:t,y:n,payload:r}=e;return typeof t!=`number`||typeof n!=`number`||!r?.value?null:(0,Be.jsx)(`text`,{x:t,y:n+He/2,textAnchor:`middle`,dominantBaseline:`middle`,className:Ie.tick,children:Re(String(r.value))})}var Be,Ve,He;function Ue(){return(Ue=D((()=>{Le(),Be=e(),Ve=10,He=64,ze.__docgenInfo={description:``,methods:[],displayName:`BarChartTick`}})))()}function We(e){return typeof e==`string`}function Ge(e){return typeof e==`number`}function Ke(e){return Array.isArray(e)&&e.length>0}function qe(e){return typeof e[0]?.payload?.name==`string`}var Je,Ye,Xe,B;function Ze(){return(Ze=D((()=>{Je=`_tooltip_p03vk_1`,Ye=`_title_p03vk_14`,Xe=`_payloadWrapper_p03vk_23`,B={tooltip:Je,title:Ye,payloadWrapper:Xe}})))()}function Qe(e){let{payload:t,stationName:n}=e;if(t.length===0)return null;let r=t.reduce((e,t)=>e+t.value,0);return(0,V.jsxs)(`div`,{className:B.tooltip,children:[(0,V.jsx)(`div`,{className:B.title,children:n}),(0,V.jsx)(`div`,{className:B.payloadWrapper,children:t.map(e=>(0,V.jsx)(E,{markerColor:e.color,description:e.dataKey.includes(`encodedPackets`)?`Закодированных`:`Декодированных`,value:e.value},e.dataKey))}),(0,V.jsx)(E,{showMarker:!1,markerColor:``,description:`Всего`,value:r})]})}var V;function $e(){return($e=D((()=>{de(),Ze(),V=e(),Qe.__docgenInfo={description:``,methods:[],displayName:`BarChartTooltip`,props:{stationName:{required:!0,tsType:{name:`string`},description:``},payload:{required:!0,tsType:{name:`Array`,elements:[{name:`BarChartTooltipItem`}],raw:`BarChartTooltipItem[]`},description:``}}}})))()}function et({active:e,payload:t,coordinate:n,chartContainerRef:r,getSchemeBySource:i,cssColors:a}){let o=Ke(t)?t.map(e=>{let n=t[0]?.payload?.source,r=i(We(n)?n:`single`),o=String(e.dataKey),s=o===`encodedPackets`;if(!s&&o!==`decodedPackets`)return null;let c=Ge(e.value)?e.value:null;return c===null?null:{dataKey:o,value:c,color:g(r,s?`encoded`:`decoded`,a)}}).filter(e=>e!==null):[];if(!e||!Ke(t)||!qe(t)||!n)return null;let s=t[0].payload?.name;return!We(s)||o.length===0?null:(0,H.jsx)(ce,{active:e,chartContainerRef:r,coordinate:n,children:(0,H.jsx)(Qe,{stationName:s,payload:o})})}var H;function tt(){return(tt=D((()=>{se(),x(),$e(),H=e(),et.__docgenInfo={description:``,methods:[],displayName:`BarChartTooltipContent`,props:{chartContainerRef:{required:!0,tsType:{name:`RefObject`,elements:[{name:`union`,raw:`HTMLDivElement | null`,elements:[{name:`HTMLDivElement`},{name:`null`}]}],raw:`RefObject<HTMLDivElement | null>`},description:``},getSchemeBySource:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(source: string) => BarChartColorScheme`,signature:{arguments:[{type:{name:`string`},name:`source`}],return:{name:`BarChartColorScheme`}}},description:``},cssColors:{required:!0,tsType:{name:`Record`,elements:[{name:`BarChartColorScheme`},{name:`signature`,type:`object`,raw:`{ medium: string; high: string }`,signature:{properties:[{key:`medium`,value:{name:`string`,required:!0}},{key:`high`,value:{name:`string`,required:!0}}]}}],raw:`Record<BarChartColorScheme, BarColorShades>`},description:``}}}})))()}var nt,rt;function it(){return(it=D((()=>{nt=`_tick_zlqkc_1`,rt={tick:nt}})))()}function at({x:e,y:t,payload:n}){return typeof e!=`number`||typeof t!=`number`||!n?null:(0,ot.jsx)(`text`,{x:e,y:t,textAnchor:`end`,dominantBaseline:`middle`,className:rt.tick,children:Number(n.value).toLocaleString()})}var ot;function st(){return(st=D((()=>{it(),ot=e(),at.__docgenInfo={description:``,methods:[],displayName:`BarChartYAxisTick`,props:{x:{required:!1,tsType:{name:`number`},description:``},y:{required:!1,tsType:{name:`number`},description:``},payload:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
  value: number | string;
}`,signature:{properties:[{key:`value`,value:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}],required:!0}}]}},description:``}}}})))()}function ct({data:e,isLoading:t,width:n,height:r}){return t?(0,U.jsx)(`div`,{className:k.skeletonYAxis,children:lt.map(e=>(0,U.jsx)(I.YTick,{},e))}):(0,U.jsx)(h,{width:n,height:r,data:e,children:(0,U.jsx)(d,{dataKey:`totalPackets`,axisLine:!1,tickLine:!1,tickCount:5,domain:[0,`auto`],tick:(0,U.jsx)(at,{}),tickFormatter:e=>e.toLocaleString()})})}var U,lt;function ut(){return(ut=D((()=>{b(),ie(),A(),L(),st(),U=e(),lt=[`y-tick-sk-1`,`y-tick-sk-2`,`y-tick-sk-3`,`y-tick-sk-4`,`y-tick-sk-5`],ct.__docgenInfo={description:``,methods:[],displayName:`BarChartYAxis`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`IBarItem`}],raw:`IBarItem[]`},description:``},isLoading:{required:!0,tsType:{name:`boolean`},description:``},width:{required:!0,tsType:{name:`number`},description:``},height:{required:!0,tsType:{name:`number`},description:``}}}})))()}function dt(e){return[{key:`single`,label:``,colorScheme:e}]}function ft(e){return Array.from(new Set(e.map(e=>e.source).filter(e=>typeof e==`string`)))}function pt(e,t){return e.map((e,n)=>({key:e,label:e,colorScheme:n===0?t:p.BLUE}))}function mt(e,t){return t.length===0?e:e.filter(e=>{let n=e.source??`single`;return!t.includes(n)})}function ht(e){let t={};return e.forEach(e=>{t[e.key]=e.colorScheme}),t}function gt(e,t){let n={};return e.forEach(e=>{n[e.key]=g(e.colorScheme,`legend`,t)}),n}function _t(){return(_t=D((()=>{m(),x()})))()}function vt({data:e,sourcesProp:t,defaultColorScheme:n}){if(t&&t.length>0)return t;let r=ft(e);return r.length>0?pt(r,n):dt(n)}function yt({data:e,sourcesProp:t,defaultColorScheme:n,cssColors:r}){let[i,a]=(0,W.useState)([]),[o,s]=(0,W.useState)(null),c=vt({data:e,sourcesProp:t,defaultColorScheme:n}),l=ht(c),u=gt(c,r);return{sources:c,hiddenKeys:i,hoveredKey:o,setHoveredKey:s,filteredData:mt(e,i),markerColors:u,toggleSource:e=>{a(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),s(null)},getSchemeBySource:e=>l[e]??n,getOpacityBySource:e=>o?o===e?1:.2:1}}var W;function bt(){return(bt=D((()=>{W=t(),_t()})))()}function xt(){if(typeof document>`u`)return St();let e=getComputedStyle(document.documentElement);return{[p.ORANGE]:{medium:e.getPropertyValue(`--chart-orange-medium`).trim(),high:e.getPropertyValue(`--chart-orange-high`).trim()},[p.BLUE]:{medium:e.getPropertyValue(`--chart-blue-medium`).trim(),high:e.getPropertyValue(`--chart-blue-high`).trim()}}}function St(){return{[p.ORANGE]:{medium:`var(--chart-orange-medium)`,high:`var(--chart-orange-high)`},[p.BLUE]:{medium:`var(--chart-blue-medium)`,high:`var(--chart-blue-high)`}}}function Ct(){return(Ct=D((()=>{m()})))()}function wt(){let[e,t]=(0,G.useState)(St);return(0,G.useEffect)(()=>{t(xt())},[]),e}var G;function Tt(){return(Tt=D((()=>{G=t(),Ct()})))()}function Et(e){let{data:t,colorScheme:n=p.ORANGE,config:i,sources:a,isLoading:l=!1,size:u=_.SMALL}=e,{type:ee,secondLayer:ie=!1,showLegend:ae=!1,showCaption:d=!1,captionKey:f=`name`}=i,m=s(u,c),g=o(m),v=wt(),{sources:y,hiddenKeys:b,setHoveredKey:x,filteredData:S,markerColors:se,toggleSource:ce,getSchemeBySource:w,getOpacityBySource:le}=yt({data:t,sourcesProp:a,defaultColorScheme:n,cssColors:v}),T=(0,K.useRef)(null),E=ae&&y.length>1;return(0,q.jsxs)(`div`,{className:r(k.section,{[k.small]:m.desktop===_.SMALL,[k.big]:m.desktop===_.BIG}),"data-size":m.desktop,...g,children:[(0,q.jsxs)(`div`,{className:k.chartRow,children:[(0,q.jsx)(`div`,{className:k.yAxis,children:(0,q.jsx)(ct,{data:S,isLoading:l,width:kt,height:Ot})}),(0,q.jsx)(`div`,{className:k.plotViewport,children:(0,q.jsx)(ue,{className:k.scrollWrapper,options:{overflow:{x:`scroll`,y:`hidden`}},children:(0,q.jsx)(`div`,{ref:T,className:k.plotContent,children:l?(0,q.jsx)(I.Plot,{showCaption:d}):(0,q.jsxs)(h,{responsive:!0,className:k.plotChart,data:S,barCategoryGap:8,children:[(0,q.jsx)(ne,{vertical:!1,stroke:`var(--surface-stroke)`,strokeWidth:1,strokeOpacity:.8}),(0,q.jsx)(re,{dataKey:f,axisLine:!1,tickLine:!1,interval:0,height:Dt,hide:!d,tick:e=>(0,q.jsx)(ze,{...e})}),ee===C.TOOLTIP&&(0,q.jsx)(te,{cursor:{className:k.hoverCursor,fill:`var(--bar-chart-hover-overlay)`},content:e=>(0,q.jsx)(et,{...e,chartContainerRef:T,getSchemeBySource:w,cssColors:v})}),(0,q.jsx)(oe,{data:S,secondLayer:ie,size:u,getSchemeBySource:w,getOpacityBySource:le})]})})})})]}),E&&(0,q.jsx)(Ne,{sources:y,hiddenKeys:b,toggleSource:ce,setHoveredKey:x,markerColors:se,isLoading:l})]})}var K,q,Dt,Ot,kt;function At(){return(At=D((()=>{n(),K=t(),ee(),b(),u(),ae(),l(),T(),v(),m(),A(),L(),Pe(),Ue(),tt(),ut(),bt(),Tt(),q=e(),Dt=64,Ot=281,kt=60,Et.__docgenInfo={description:``,methods:[],displayName:`BarChart`,props:{data:{required:!0,tsType:{name:`Array`,elements:[{name:`IBarItem`}],raw:`IBarItem[]`},description:``},colorScheme:{required:!1,tsType:{name:`BarChartColorScheme`},description:``},config:{required:!0,tsType:{name:`BarChartConfig`},description:``},sources:{required:!1,tsType:{name:`Array`,elements:[{name:`BarChartSource`}],raw:`BarChartSource[]`},description:``},isLoading:{required:!1,tsType:{name:`boolean`},description:``},size:{required:!1,tsType:{name:`union`,raw:`T | Partial<ResolvedResponsiveValue<T>>`,elements:[{name:`unknown`},{name:`Partial`,elements:[{name:`Record`,elements:[{name:`unknown[number]`,raw:`(typeof RESPONSIVE_BREAKPOINTS)[number]`},{name:`unknown`}],raw:`Record<ResponsiveBreakpoint, T>`}],raw:`Partial<ResolvedResponsiveValue<T>>`}]},description:``}}}})))()}var jt,J,Y,X,Z,Q,$,Mt;function Nt(){return(Nt=D((()=>{m(),S(),At(),jt={title:`ui-kit/charts/BarChart`,component:Et,parameters:{layout:`padded`},argTypes:{colorScheme:{control:`select`,options:Object.values(p)},isLoading:{control:`boolean`}}},J={isLoading:!1},Y={name:`Single / Default / 1 segment`,args:{...J,data:y,colorScheme:p.BLUE,config:{type:C.DEFAULT,secondLayer:!1,showLegend:!1,showCaption:!1}}},X={name:`Single / Tooltip / 2 segments`,args:{...J,data:y,colorScheme:p.ORANGE,config:{type:C.TOOLTIP,secondLayer:!0,showLegend:!1,showCaption:!0}}},Z={name:`Multi / Tooltip / Legend`,args:{...J,data:f,config:{type:C.TOOLTIP,secondLayer:!0,showLegend:!0,showCaption:!0},sources:[{key:`soniks`,label:`SONIKS`,colorScheme:p.ORANGE},{key:`satnogs`,label:`SatNOGS`,colorScheme:p.BLUE}]}},Q={name:`Multi / Default / Legend`,args:{...J,data:f,config:{type:C.DEFAULT,secondLayer:!1,showLegend:!0,showCaption:!0},sources:[{key:`soniks`,label:`SONIKS`,colorScheme:p.ORANGE},{key:`satnogs`,label:`SatNOGS`,colorScheme:p.BLUE}]}},$={name:`Loading / Skeletons`,args:{...J,isLoading:!0,data:[],config:{type:C.TOOLTIP,secondLayer:!0,showLegend:!0,showCaption:!0},sources:[{key:`soniks`,label:`SONIKS`,colorScheme:p.ORANGE},{key:`satnogs`,label:`SatNOGS`,colorScheme:p.BLUE}]}},Mt=[`SingleSourceDefault`,`SingleSourceTooltip`,`MultiSourceTooltipWithLegend`,`MultiSourceDefaultWithLegend`,`Loading`],Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Single / Default / 1 segment",
  args: {
    ...baseArgs,
    data: SINGLE_SOURCE_DATA,
    colorScheme: BarChartColorScheme.BLUE,
    config: {
      type: BarChartType.DEFAULT,
      secondLayer: false,
      showLegend: false,
      showCaption: false
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Single / Tooltip / 2 segments",
  args: {
    ...baseArgs,
    data: SINGLE_SOURCE_DATA,
    colorScheme: BarChartColorScheme.ORANGE,
    config: {
      type: BarChartType.TOOLTIP,
      secondLayer: true,
      showLegend: false,
      showCaption: true
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Multi / Tooltip / Legend",
  args: {
    ...baseArgs,
    data: MULTI_SOURCE_DATA,
    config: {
      type: BarChartType.TOOLTIP,
      secondLayer: true,
      showLegend: true,
      showCaption: true
    },
    sources: [{
      key: "soniks",
      label: "SONIKS",
      colorScheme: BarChartColorScheme.ORANGE
    }, {
      key: "satnogs",
      label: "SatNOGS",
      colorScheme: BarChartColorScheme.BLUE
    }]
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Multi / Default / Legend",
  args: {
    ...baseArgs,
    data: MULTI_SOURCE_DATA,
    config: {
      type: BarChartType.DEFAULT,
      secondLayer: false,
      showLegend: true,
      showCaption: true
    },
    sources: [{
      key: "soniks",
      label: "SONIKS",
      colorScheme: BarChartColorScheme.ORANGE
    }, {
      key: "satnogs",
      label: "SatNOGS",
      colorScheme: BarChartColorScheme.BLUE
    }]
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: "Loading / Skeletons",
  args: {
    ...baseArgs,
    isLoading: true,
    data: [],
    config: {
      type: BarChartType.TOOLTIP,
      secondLayer: true,
      showLegend: true,
      showCaption: true
    },
    sources: [{
      key: "soniks",
      label: "SONIKS",
      colorScheme: BarChartColorScheme.ORANGE
    }, {
      key: "satnogs",
      label: "SatNOGS",
      colorScheme: BarChartColorScheme.BLUE
    }]
  }
}`,...$.parameters?.docs?.source}}}})))()}Nt();export{$ as Loading,Q as MultiSourceDefaultWithLegend,Z as MultiSourceTooltipWithLegend,Y as SingleSourceDefault,X as SingleSourceTooltip,Mt as __namedExportsOrder,jt as default};