(this["webpackJsonpuse-query-state"]=this["webpackJsonpuse-query-state"]||[]).push([[0],{156:function(e,t,a){e.exports=a(341)},161:function(e,t,a){},197:function(e,t,a){},341:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),c=a(8),l=a.n(c),o=(a(161),a(35)),u=a(64),i=a(142),s=a.n(i),m=a(118),y=(a(163),a(149)),p=(a(165),a(87)),f=(a(166),a(119)),v=(a(168),a(152)),b=(a(121),a(65)),O=(a(343),a(151)),d=(a(344),a(37)),E=(a(176),a(150)),h=(a(342),a(58)),g=(a(122),a(11)),j=a.n(g),k=a(49),w=a(43),C=a(83);function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function A(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(a,!0).forEach((function(t){Object(k.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var x=function(e){return void 0===e||null===e},N=function(e,t){return e===t||!x(e)&&!x(t)&&e.toString()===t.toString()},P={string:"",number:0,boolean:!1,array:[]},I=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!(Array.isArray(e)||Object.keys(P).indexOf(typeof e)>-1||t&&(null===e||void 0===e)))throw console.log("isValidType",e),new Error("useQueryState: the type is not supported.")},S=function(e,t){switch(t.type){case"LOCATION_CHANGE":var a=t.payload,r=a.currentQueryValue,n=a.key;if(!N(r,e[n])){var c=r;return""===r?c=P[e.type]:"array"!==e.type||Array.isArray(r)||(c=[r]),A({},e,Object(k.a)({},n,c))}return e;case"STATE_CHANGE":var l=t.payload,o=l.newValue,u=l.key;return A({},e,Object(k.a)({},u,o))}},F=function(e,t){var a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=n.action,l=void 0===c?"push":c,u=n.delay,i=void 0===u?0:u,s=Object(w.e)(),m=Object(w.d)();I(e);var y=Array.isArray(e)?"array":typeof e,p=Object(r.useReducer)(S,(a={},Object(k.a)(a,t,e),Object(k.a)(a,"type",y),a)),f=Object(o.a)(p,2),v=f[0],b=f[1],O=Object(r.useRef)(),d=Object(r.useRef)(!1),E=Object(r.useRef)(!1),h=Object(r.useCallback)((function(){d.current=!1,O.current&&clearTimeout(O.current)}),[]),g=Object(r.useCallback)((function(e,t){d.current=!0,O.current&&clearTimeout(O.current),O.current=setTimeout((function(){d.current=!1,e()}),t)}),[]);Object(r.useEffect)((function(){if(!d.current){var e=s.search,a=C.parse(e,{arrayFormat:"comma"})[t];(void 0!==a||E.current)&&(E.current=!0,b({type:"LOCATION_CHANGE",payload:{key:t,currentQueryValue:a}}))}return h}),[t,s,h]);var j=Object(r.useCallback)((function(e){I(e,!0);var a=m.location,r=a.search,n=a.pathname,c=C.parse(r,{arrayFormat:"comma"}),o=c[t];if(!N(o,e)){var u="?".concat(C.stringify(A({},c,Object(k.a)({},t,e)),{arrayFormat:"comma"}));m.location.search=u,g(m[l].bind(null,"".concat(n).concat(u)),i)}b({type:"STATE_CHANGE",payload:{key:t,newValue:e}})}),[t,l,i,m,g]);return[v[t],j]},G=(a(197),E.a.RangePicker),R=function(e){return e?j()(+e):null},V=[{text:"Tourism",value:"0"},{text:"Visiting family or friends",value:"1"},{text:"Cultural",value:"2"},{text:"Sports",value:"3"},{text:"Official visit",value:"4"},{text:"Medical reasons",value:"5"},{text:"Study",value:"6"},{text:"Transit",value:"7"},{text:"Other",value:"8"}],B=function(){var e=F("","name",{action:"replace",delay:300}),t=Object(o.a)(e,2),a=t[0],r=t[1],c=F("","gender"),l=Object(o.a)(c,2),i=l[0],s=l[1],E=F("","travelByYourself"),g=Object(o.a)(E,2),j=g[0],k=g[1],w=F(0,"currency",{action:"replace",delay:300}),C=Object(o.a)(w,2),T=C[0],A=C[1],x=F(["1","2","3"],"purpose"),N=Object(o.a)(x,2),P=N[0],I=N[1],S=F("","startTime"),B=Object(o.a)(S,2),D=B[0],H=B[1],Q=F("","endTime"),Y=Object(o.a)(Q,2),_=Y[0],q=Y[1];return n.a.createElement(n.a.Fragment,null,n.a.createElement(m.a,null,n.a.createElement(d.a,{layout:"horizontal",labelCol:{span:6},wrapperCol:{span:18}},n.a.createElement(d.a.Item,{label:"Name"},n.a.createElement(v.a,{placeholder:"name",style:{width:200},value:a,onChange:function(e){r(e.target.value)}})),n.a.createElement(d.a.Item,{label:"Gender"},n.a.createElement(b.a,{placeholder:"gender",style:{width:100},value:i,onChange:function(e){s(e)}},n.a.createElement(b.a.Option,{key:"0"},"Male"),n.a.createElement(b.a.Option,{key:"1"},"Female"),n.a.createElement(b.a.Option,{key:"2"},"Other"))),n.a.createElement(d.a.Item,{label:"Travel By Yourself"},n.a.createElement(p.a.Group,{value:j,onChange:function(e){k(e.target.value)}},n.a.createElement(p.a,{value:"0"},"No"),n.a.createElement(p.a,{value:"1"},"Yes"))),n.a.createElement(d.a.Item,{label:"Total Currency Carried"},n.a.createElement(O.a,{style:{width:500},tipFormatter:function(e){return"".concat(e/10,"k")},min:0,max:100,marks:{0:"0",10:"1k",30:"3k",50:"5k",70:"7k",90:"9k",100:"10k+"},value:+T,onChange:function(e){A(e)}})),n.a.createElement(d.a.Item,{label:"Purpose of Travel"},n.a.createElement(f.a.Group,{style:{width:"100%"},value:P,onChange:function(e){I(e)}},n.a.createElement(m.a,null,V.map((function(e){return n.a.createElement(y.a,{key:e.value,span:8},n.a.createElement(f.a,{value:e.value},e.text))}))))),n.a.createElement(d.a.Item,{label:"Travel Period"},n.a.createElement(G,{value:[R(D),R(_)],onChange:function(e){H(0===e.length?"":"".concat(+e[0])),q(0===e.length?"":"".concat(+e[1]))}})),n.a.createElement(d.a.Item,{label:"",wrapperCol:{offset:6,span:18}},n.a.createElement(h.a,{className:"margin-right",type:"primary"},n.a.createElement(u.b,{to:"/?name=Jason&gender=0&travelByYourself=1&currency=10&purpose=1,2&startTime=1573896342384&endTime=1576661142384"},"Fill")),n.a.createElement(h.a,{type:"primary"},n.a.createElement(u.b,{to:"/"},"Reset"))))))},D=function(){return n.a.createElement("div",{className:"header"},"Use Query State")},H=function(){return n.a.createElement(u.a,null,n.a.createElement("div",{className:"App"},n.a.createElement(D,null),n.a.createElement("div",{className:"content"},n.a.createElement(B,null)),n.a.createElement(s.a,{bannerColor:"#1890ff",href:"https://github.com/yuanfux/use-query-state"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[156,1,2]]]);
//# sourceMappingURL=main.b0bcfbce.chunk.js.map