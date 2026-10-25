import{n as e}from"./iframe-BzXzTfmr.js";import{n as t,t as n}from"./clsx-CTwy9ux-.js";import{n as r}from"./rolldown-runtime-DkW27tQK.js";var i,a,o,s,c,l,u,d,f,p;function m(){return(m=r((()=>{i=`_bigLineChartBase_11h64_1`,a=`_withLabels_11h64_9`,o=`_labels_11h64_12`,s=`_line_11h64_17`,c=`_supported_11h64_22`,l=`_unsupported_11h64_25`,u=`_label_11h64_12`,d=`_leftLabel_11h64_50`,f=`_rightLabel_11h64_54`,p={bigLineChartBase:i,withLabels:a,labels:o,line:s,supported:c,unsupported:l,label:u,leftLabel:d,rightLabel:f}})))()}var h;function g(){return(g=r((()=>{h=function(e){return e.SUPPORTED=`supported`,e.UNSUPPORTED=`unsupported`,e}({})})))()}function _({variant:e=h.SUPPORTED,leftText:t,rightText:r,hasLeftText:i=!0,hasRightText:a=!0,className:o,style:s}){let c=i&&t||a&&r;return(0,v.jsxs)(`div`,{className:n(p.bigLineChartBase,c&&p.withLabels,o),style:s,children:[(0,v.jsx)(`div`,{className:n(p.line,p[e])}),(0,v.jsxs)(`div`,{className:p.labels,children:[(0,v.jsx)(`div`,{className:n(p.label,p.leftLabel),children:i?t:null}),(0,v.jsx)(`div`,{className:n(p.label,p.rightLabel),children:a?r:null})]})]})}var v;function y(){return(y=r((()=>{t(),m(),g(),v=e(),_.__docgenInfo={description:``,methods:[],displayName:`BigLineChartBase`,props:{variant:{required:!1,tsType:{name:`BigLineChartBaseVariant`},description:``,defaultValue:{value:`BigLineChartBaseVariant.SUPPORTED`,computed:!0}},leftText:{required:!1,tsType:{name:`string`},description:``},rightText:{required:!1,tsType:{name:`string`},description:``},hasLeftText:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},hasRightText:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``},style:{required:!1,tsType:{name:`ReactCSSProperties`,raw:`React.CSSProperties`},description:``}}}})))()}var b,x,S,C;function w(){return(w=r((()=>{b=`_distanceChart_1he22_1`,x=`_segments_1he22_8`,S=`_emptyState_1he22_15`,C={distanceChart:b,segments:x,emptyState:S}})))()}function T(e){return Number.isFinite(e.min)&&Number.isFinite(e.max)&&e.max>e.min}function E(e){return[...e].sort((e,t)=>e.min-t.min)}function D(e){let t=E(e.filter(T));if(!t.length)return[];let n=[];return t.forEach(e=>{let t=n[n.length-1];if(!t){n.push({...e});return}if(e.min<=t.max){t.max=Math.max(t.max,e.max);return}n.push({...e})}),n}function O(){return(O=r((()=>{})))()}function k(e){let t=D(e);if(!t.length)return[];let n=[];return t.forEach((e,r)=>{n.push({id:`supported-${e.min}-${e.max}-${r}`,variant:h.SUPPORTED,start:e.min,end:e.max,length:e.max-e.min,leftText:String(e.min),rightText:String(e.max),hasLeftText:!0,hasRightText:!0});let i=t[r+1];!i||i.min<=e.max||n.push({id:`unsupported-${e.max}-${i.min}-${r}`,variant:h.UNSUPPORTED,start:e.max,end:i.min,length:i.min-e.max,hasLeftText:!1,hasRightText:!1})}),n}function A(){return(A=r((()=>{g(),O()})))()}function j({ranges:e,emptyText:t,className:r}){let i=k(e);return!i.length||i.reduce((e,t)=>e+t.length,0)<=0?t?(0,M.jsx)(`div`,{className:n(C.emptyState,r),children:t}):null:(0,M.jsx)(`div`,{className:n(C.distanceChart,r),children:(0,M.jsx)(`div`,{className:C.segments,children:i.map(e=>(0,M.jsx)(_,{variant:e.variant,leftText:e.leftText?`${e.leftText} МГц`:void 0,rightText:e.rightText?`${e.rightText} МГц`:void 0,hasLeftText:e.hasLeftText,hasRightText:e.hasRightText,style:{flex:`${e.length} 0 0`}},e.id))})})}var M;function N(){return(N=r((()=>{t(),y(),w(),A(),M=e(),j.__docgenInfo={description:``,methods:[],displayName:`DistanceChart`,props:{ranges:{required:!0,tsType:{name:`Array`,elements:[{name:`DistanceChartRange`}],raw:`DistanceChartRange[]`},description:``},emptyText:{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}var P,F,I,L,R,z,B,V,H;function U(){return(U=r((()=>{N(),P=e(),F={title:`ui-kit/charts/LineChart/DistanceChart`,component:j,decorators:[e=>(0,P.jsx)(`div`,{style:{width:`1358px`,padding:`24px`},children:(0,P.jsx)(e,{})})],args:{emptyText:`У станции нет поддерживаемых диапазонов`}},I={args:{ranges:[{min:110,max:157}]}},L={args:{ranges:[{min:110,max:157},{min:233,max:256}]}},R={args:{ranges:[{min:88,max:108},{min:110,max:157},{min:174,max:230},{min:233,max:256}]}},z={args:{ranges:[{min:110,max:157},{min:140,max:200},{min:233,max:256}]}},B={args:{ranges:[{min:110,max:157},{min:157,max:200},{min:233,max:256}]}},V={args:{ranges:[]}},H=[`OneRange`,`TwoRanges`,`MultipleRanges`,`OverlappingRanges`,`TouchingRanges`,`EmptyState`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    ranges: [{
      min: 110,
      max: 157
    }]
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ranges: [{
      min: 110,
      max: 157
    }, {
      min: 233,
      max: 256
    }]
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ranges: [{
      min: 88,
      max: 108
    }, {
      min: 110,
      max: 157
    }, {
      min: 174,
      max: 230
    }, {
      min: 233,
      max: 256
    }]
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    ranges: [{
      min: 110,
      max: 157
    }, {
      min: 140,
      max: 200
    }, {
      min: 233,
      max: 256
    }]
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ranges: [{
      min: 110,
      max: 157
    }, {
      min: 157,
      max: 200
    }, {
      min: 233,
      max: 256
    }]
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ranges: []
  }
}`,...V.parameters?.docs?.source}}}})))()}U();export{V as EmptyState,R as MultipleRanges,I as OneRange,z as OverlappingRanges,B as TouchingRanges,L as TwoRanges,H as __namedExportsOrder,F as default};