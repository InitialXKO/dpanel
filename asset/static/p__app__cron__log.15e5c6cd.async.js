"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4250],{54964:function(ne,W,t){t.d(W,{a:function(){return C}});var g=t(78267),z=t.n(g),b=t(75458),w=t.n(b),F=t(67294),L=t(12320),Y=t.n(L),Z=t(89629),J=t(85893),C={convertEol:!0,fontFamily:'Menlo, Monaco, "Courier New", monospace',fontWeight:400,fontSize:16,cursorStyle:"block",cursorBlink:!0,theme:{foreground:"#bfbfbf",cursor:"gray",selectionForeground:"#ffffff"}},h=new L.Terminal(C),K=new b.SearchAddon,$=new g.FitAddon,M=(0,F.forwardRef)(function(D,H){return(0,F.useEffect)(function(){window.addEventListener("resize",function(){D.showInModal||$.fit()}),D.style&&D.style.fontSize&&(h.options.fontSize=D.style.fontSize),h.loadAddon($),h.loadAddon(K),h.open(document.getElementById("terminal-container")),D.showInModal||$.fit()},[]),(0,F.useImperativeHandle)(H,function(){return{write:function(T){h.write(T)},clear:function(){h.clear()},getTerminal:function(){return h},findNext:function(T){K.findNext(T)},findPrev:function(T){K.findPrevious(T)},fit:function(){$.fit()},onData:function(T){h.onData(T)}}}),(0,J.jsx)("div",{id:"terminal-container",style:{width:D.width?D.width:"100%",height:D.height?D.height:"500px"}})});W.Z=M},6812:function(ne,W,t){t.r(W),t.d(W,{default:function(){return te}});var g=t(15009),z=t.n(g),b=t(99289),w=t.n(b),F=t(5574),L=t.n(F),Y=t(22191),Z=t(80821),J=t(54964),C=t(83727),h=t(67255),K=t(43425),$=t(90078),M=t(38345),D=t(10641),H=t(63713),x=t(42075),T=t(66309),N=t(96074),Q=t(28036),k=t(25593),q=t(40411),ee=t(86250),V=t(55054),y=t(67294),s=t(85893);function te(){var X,a=(0,H.useParams)(),o=(0,y.useState)(),u=L()(o,2),e=u[0],i=u[1],m=(0,y.useRef)(),_=(0,y.useRef)(),f=(0,y.useState)(),E=L()(f,2),l=E[0],R=E[1],O=(0,y.useRef)(),v=(0,y.useState)(0),B=L()(v,2),U=B[0],G=B[1];return(0,y.useEffect)(function(){var c,n;!((c=_.current)===null||c===void 0)&&c.clear&&_.current.clear(),(0,C.Ih)({id:parseInt((n=a.id)!==null&&n!==void 0?n:"")}).then(function(r){R(r.data.detail)})},[U]),(0,s.jsx)($._z,{children:(0,s.jsxs)(M.Z,{ghost:!0,direction:"column",gutter:[0,10],children:[(0,s.jsx)(M.Z,{title:(0,s.jsx)(K.Z,{}),subTitle:l==null?void 0:l.title,extra:(0,s.jsxs)(x.Z,{children:[(0,s.jsx)("span",{children:"\u4E0B\u6B21\u8FD0\u884C\u65F6\u95F4\uFF1A"}),l&&l.setting.nextRunTime&&l.setting.nextRunTime.map(function(c,n){return(0,s.jsx)(T.Z,{children:new Date(c).toLocaleString()},"runNextTime-".concat(n))})]}),children:(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(Z.Z,{action:function(){var n,r;return(n=_.current)===null||n===void 0||n.clear(),(0,C.yh)({id:parseInt((r=a.id)!==null&&r!==void 0?r:"")})},onSuccess:function(){var n,r;return!((n=m.current)===null||n===void 0)&&n.reloadAndRest&&((r=m.current)===null||r===void 0||r.reloadAndRest()),!0},onError:function(){var n,r;return!((n=m.current)===null||n===void 0)&&n.reloadAndRest&&((r=m.current)===null||r===void 0||r.reloadAndRest()),!0},messageSuccess:"run",type:"primary",children:"\u7ACB\u5373\u6267\u884C"},"runOnce"),l&&(0,s.jsx)(Z.Z,{action:function(){var n,r,j,A,p,d,P;(n=_.current)===null||n===void 0||n.clear();var S={id:l.id,title:l.title,expression:(r=l.setting.expression)!==null&&r!==void 0?r:[],containerName:(j=l.setting.containerName)!==null&&j!==void 0?j:"",script:(A=l.setting.script)!==null&&A!==void 0?A:"",enableRunBlock:(p=l.setting.enableRunBlock)!==null&&p!==void 0?p:!1,environment:(d=l.setting.environment)!==null&&d!==void 0?d:[],keepLogTotal:(P=l.setting.keepLogTotal)!==null&&P!==void 0?P:10,disable:!l.setting.disable};return(0,C.FS)(S)},onSuccess:function(){return G(U+1),!0},onError:function(){return G(U+1),!0},messageSuccess:"pause",children:l.setting.disable?"\u6062\u590D":"\u6682\u505C"},"pause"),(0,s.jsx)(N.Z,{type:"vertical"}),(0,s.jsx)(Z.Z,{action:function(){var n,r;return(n=_.current)===null||n===void 0||n.clear(),i({}),(0,C.wb)({id:parseInt((r=a.id)!==null&&r!==void 0?r:"")})},onSuccess:function(){var n,r;return!((n=m.current)===null||n===void 0)&&n.reloadAndRest&&((r=m.current)===null||r===void 0||r.reloadAndRest()),!0},onError:function(){var n,r;return!((n=m.current)===null||n===void 0)&&n.reloadAndRest&&((r=m.current)===null||r===void 0||r.reloadAndRest()),!0},type:"primary",messageSuccess:"clear",confirm:"\u662F\u5426\u6E05\u7406\u6240\u6709\u7684\u8BA1\u5212\u4EFB\u52A1\u65E5\u5FD7\uFF1F",danger:!0,children:"\u6E05\u7A7A\u65E5\u5FD7"},"clear"),(0,s.jsx)(N.Z,{type:"vertical"}),(0,s.jsx)(Y.Z,{ref:O,onFinish:function(){G(U+1)}},"create"),(0,s.jsx)(Q.ZP,{onClick:function(){var n;!((n=O.current)===null||n===void 0)&&n.edit&&l&&O.current.edit(l)},children:"\u7F16\u8F91\u4EFB\u52A1"})]})}),(0,s.jsxs)(M.Z,{split:"vertical",children:[(0,s.jsx)(M.Z,{ghost:!0,colSpan:"30%",children:(0,s.jsx)(D.Z,{actionRef:m,rowKey:"id",pagination:(0,h.O)(),columns:[{title:"Id",dataIndex:"id",render:function(n,r,j,A,p){return(0,s.jsxs)(x.Z,{children:[(0,s.jsx)(k.Z.Link,{onClick:function(){if(i(r),r.value.message){var P,S;(P=_.current)===null||P===void 0||P.clear(),(S=_.current)===null||S===void 0||S.write(r.value.message)}},children:r.id}),e!=null&&e.id&&e.id==r.id?(0,s.jsx)(q.Z,{status:"processing"}):""]})}},{title:"\u5F00\u59CB\u65F6\u95F4",render:function(n,r,j,A,p){return new Date(r.value.runTime).toLocaleString()}},{title:"\u8017\u65F6",render:function(n,r,j,A,p){return"".concat(r.value.useTime.toFixed(2),"s")}}],search:!1,request:function(){var c=w()(z()().mark(function n(r,j,A){var p,d,P,S;return z()().wrap(function(I){for(;;)switch(I.prev=I.next){case 0:return I.next=2,(0,C.bk)({id:parseInt((p=a.id)!==null&&p!==void 0?p:""),page:r.current,pageSize:r.pageSize});case 2:return d=I.sent,d.data.list&&d.data.list.length>0&&(i(d.data.list[0]),d.data.list[0].value.message&&((P=_.current)===null||P===void 0||P.clear(),(S=_.current)===null||S===void 0||S.write(d.data.list[0].value.message))),I.abrupt("return",{data:d.data.list,success:!0,total:d.data.total});case 5:case"end":return I.stop()}},n)}));return function(n,r,j){return c.apply(this,arguments)}}()})}),(0,s.jsxs)(M.Z,{ghost:!0,colSpan:"70%",split:"horizontal",children:[(0,s.jsx)(M.Z,{children:(0,s.jsxs)(ee.Z,{gap:50,align:"center",justify:"space-evenly",children:[(0,s.jsx)(V.Z,{title:"\u65E5\u5FD7Id",value:(e==null?void 0:e.id)&&(e==null?void 0:e.id)}),(0,s.jsx)(V.Z,{title:"\u6267\u884C\u65F6\u95F4",value:(e==null?void 0:e.value)&&new Date((X=e==null?void 0:e.value.runTime)!==null&&X!==void 0?X:"").toLocaleString()}),(0,s.jsx)(V.Z,{title:"\u6D88\u8017\u65F6\u95F4",value:(e==null?void 0:e.value)&&"".concat((e==null?void 0:e.value.useTime)&&e.value.useTime.toFixed(2),"s")})]})}),(0,s.jsx)(M.Z,{children:(0,s.jsx)(J.Z,{height:"100%",ref:_})})]})]})]})})}},55054:function(ne,W,t){t.d(W,{Z:function(){return X}});var g=t(67294),z=t(57838),b=t(96159),w=t(93967),F=t.n(w),L=t(64217),Y=t(53124),Z=t(48054),C=a=>{const{value:o,formatter:u,precision:e,decimalSeparator:i,groupSeparator:m="",prefixCls:_}=a;let f;if(typeof u=="function")f=u(o);else{const E=String(o),l=E.match(/^(-?)(\d*)(\.(\d+))?$/);if(!l||E==="-")f=E;else{const R=l[1];let O=l[2]||"0",v=l[4]||"";O=O.replace(/\B(?=(\d{3})+(?!\d))/g,m),typeof e=="number"&&(v=v.padEnd(e,"0").slice(0,e>0?e:0)),v&&(v=`${i}${v}`),f=[g.createElement("span",{key:"int",className:`${_}-content-value-int`},R,O),v&&g.createElement("span",{key:"decimal",className:`${_}-content-value-decimal`},v)]}}return g.createElement("span",{className:`${_}-content-value`},f)},h=t(14747),K=t(83559),$=t(83262);const M=a=>{const{componentCls:o,marginXXS:u,padding:e,colorTextDescription:i,titleFontSize:m,colorTextHeading:_,contentFontSize:f,fontFamily:E}=a;return{[o]:Object.assign(Object.assign({},(0,h.Wf)(a)),{[`${o}-title`]:{marginBottom:u,color:i,fontSize:m},[`${o}-skeleton`]:{paddingTop:e},[`${o}-content`]:{color:_,fontSize:f,fontFamily:E,[`${o}-content-value`]:{display:"inline-block",direction:"ltr"},[`${o}-content-prefix, ${o}-content-suffix`]:{display:"inline-block"},[`${o}-content-prefix`]:{marginInlineEnd:u},[`${o}-content-suffix`]:{marginInlineStart:u}}})}},D=a=>{const{fontSizeHeading3:o,fontSize:u}=a;return{titleFontSize:u,contentFontSize:o}};var H=(0,K.I$)("Statistic",a=>{const o=(0,$.IX)(a,{});return[M(o)]},D),x=function(a,o){var u={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&o.indexOf(e)<0&&(u[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,e=Object.getOwnPropertySymbols(a);i<e.length;i++)o.indexOf(e[i])<0&&Object.prototype.propertyIsEnumerable.call(a,e[i])&&(u[e[i]]=a[e[i]]);return u},N=a=>{const{prefixCls:o,className:u,rootClassName:e,style:i,valueStyle:m,value:_=0,title:f,valueRender:E,prefix:l,suffix:R,loading:O=!1,formatter:v,precision:B,decimalSeparator:U=".",groupSeparator:G=",",onMouseEnter:c,onMouseLeave:n}=a,r=x(a,["prefixCls","className","rootClassName","style","valueStyle","value","title","valueRender","prefix","suffix","loading","formatter","precision","decimalSeparator","groupSeparator","onMouseEnter","onMouseLeave"]),{getPrefixCls:j,direction:A,statistic:p}=g.useContext(Y.E_),d=j("statistic",o),[P,S,re]=H(d),I=g.createElement(C,{decimalSeparator:U,groupSeparator:G,prefixCls:d,formatter:v,precision:B,value:_}),ae=F()(d,{[`${d}-rtl`]:A==="rtl"},p==null?void 0:p.className,u,e,S,re),oe=(0,L.Z)(r,{aria:!0,data:!0});return P(g.createElement("div",Object.assign({},oe,{className:ae,style:Object.assign(Object.assign({},p==null?void 0:p.style),i),onMouseEnter:c,onMouseLeave:n}),f&&g.createElement("div",{className:`${d}-title`},f),g.createElement(Z.Z,{paragraph:!1,loading:O,className:`${d}-skeleton`},g.createElement("div",{style:m,className:`${d}-content`},l&&g.createElement("span",{className:`${d}-content-prefix`},l),E?E(I):I,R&&g.createElement("span",{className:`${d}-content-suffix`},R)))))};const Q=[["Y",1e3*60*60*24*365],["M",1e3*60*60*24*30],["D",1e3*60*60*24],["H",1e3*60*60],["m",1e3*60],["s",1e3],["S",1]];function k(a,o){let u=a;const e=/\[[^\]]*]/g,i=(o.match(e)||[]).map(E=>E.slice(1,-1)),m=o.replace(e,"[]"),_=Q.reduce((E,l)=>{let[R,O]=l;if(E.includes(R)){const v=Math.floor(u/O);return u-=v*O,E.replace(new RegExp(`${R}+`,"g"),B=>{const U=B.length;return v.toString().padStart(U,"0")})}return E},m);let f=0;return _.replace(e,()=>{const E=i[f];return f+=1,E})}function q(a,o){const{format:u=""}=o,e=new Date(a).getTime(),i=Date.now(),m=Math.max(e-i,0);return k(m,u)}var ee=function(a,o){var u={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&o.indexOf(e)<0&&(u[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,e=Object.getOwnPropertySymbols(a);i<e.length;i++)o.indexOf(e[i])<0&&Object.prototype.propertyIsEnumerable.call(a,e[i])&&(u[e[i]]=a[e[i]]);return u};const V=1e3/30;function y(a){return new Date(a).getTime()}const s=a=>{const{value:o,format:u="HH:mm:ss",onChange:e,onFinish:i}=a,m=ee(a,["value","format","onChange","onFinish"]),_=(0,z.Z)(),f=g.useRef(null),E=()=>{i==null||i(),f.current&&(clearInterval(f.current),f.current=null)},l=()=>{const v=y(o);v>=Date.now()&&(f.current=setInterval(()=>{_(),e==null||e(v-Date.now()),v<Date.now()&&E()},V))};g.useEffect(()=>(l(),()=>{f.current&&(clearInterval(f.current),f.current=null)}),[o]);const R=(v,B)=>q(v,Object.assign(Object.assign({},B),{format:u})),O=v=>(0,b.Tm)(v,{title:void 0});return g.createElement(N,Object.assign({},m,{value:o,valueRender:O,formatter:R}))};var te=g.memo(s);N.Countdown=te;var X=N}}]);