(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){},13:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(2),o=a.n(c),u=(a(12),a(1)),i=function(e){var t=e.className;return r.a.createElement("a",{className:t,href:"https://github.com/agaricide/svg-metaballs/blob/develop/react-svg-metaball/src/App.tsx"},r.a.createElement("img",{alt:"GitHub Logomark",src:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"}),"View on Github")},s=function(e,t){var a=Object(u.a)(e,2),n=a[0],r=a[1],c=Object(u.a)(t,2),o=c[0],i=c[1];return Math.pow(Math.pow(n-o,2)+Math.pow(r-i,2),.5)},l=function(e,t,a){var n=Object(u.a)(e,2),r=n[0],c=n[1];return[r+a*Math.cos(t),c+a*Math.sin(t)]},h=Math.PI/2,b=function(e,t,a,n){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:2.4,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.5,o=s(a,n),i=0,b=0;if(e<=0||t<=0)return"";if(o>e+2.5*t)return"";if(o<=Math.abs(e-t))return"";o<e+t&&(i=Math.acos((e*e+o*o-t*t)/(2*e*o)),b=Math.acos((t*t+o*o-e*e)/(2*t*o)));var m=function(e,t){var a=Object(u.a)(e,2),n=a[0],r=a[1],c=Object(u.a)(t,2),o=c[0],i=c[1];return Math.atan2(r-i,n-o)}(n,a),f=Math.acos((e-t)/o),g=m+i+(f-i)*c,v=m-i-(f-i)*c,M=m+Math.PI-b-(Math.PI-b-f)*c,d=m-Math.PI+b+(Math.PI-b-f)*c,p=l(a,g,e),j=l(a,v,e),w=l(n,M,t),O=l(n,d,t),E=[p,j,w,O],k=e+t,x=Math.min(c*r,s(p,w)/k)*Math.min(1,2*o/(e+t)),C=e*x,S=t*x;return function(e,t,a,n){var r=Object(u.a)(e,4),c=r[0],o=r[1],i=r[2],s=r[3],l=Object(u.a)(t,4),h=l[0],b=l[1];return["M",c,"C",h,l[2],i,"A",n,n,0,a?1:0,0,s,"C",l[3],b,o].join(" ")}(E,[l(p,g-h,C),l(j,v+h,C),l(w,M+h,S),l(O,d-h,S)],o>e,t)},m=a(3),f=function(e,t,a){var n=Object(u.a)(e,2),r=n[0],c=n[1];if(!t||!a)return[0,0];var o=t.createSVGPoint();o.x=r,o.y=c;var i=a.getScreenCTM().inverse(),s=o.matrixTransform(i);return[s.x,s.y]},g=(a(13),[600,350]),v=function(){var e=Object(n.useState)(g),t=Object(u.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!1),s=Object(u.a)(o,2),l=s[0],h=s[1],v=Object(n.useRef)(null),M=Object(n.useRef)(null),d=Object(n.useCallback)(function(e){if(v.current&&M.current&&l){var t=e.clientX,a=e.clientY;c(f([t,a],v.current,M.current))}},[l]),p=Object(n.useCallback)(function(e){if(v.current&&M.current&&l){var t=e.touches[0].pageX,a=e.touches[0].pageY;c(f([t,a],v.current,M.current))}},[l]),j=Object(n.useCallback)(function(){return h(!0)},[l]),w=Object(n.useCallback)(function(){return h(!1)},[l]),O=l?"grabbing":"";return r.a.createElement(n.Fragment,null,r.a.createElement(i,{className:O}),r.a.createElement("svg",{ref:v,viewBox:"0 0 1200 1200",onTouchMove:p,onTouchStart:j,onTouchEnd:w,onMouseMove:d,onMouseDown:j,onMouseUp:w},r.a.createElement(m.Spring,{config:m.config.molasses,from:{coord:g},to:{coord:a}},function(e){return r.a.createElement("g",{ref:M,className:O},r.a.createElement("circle",{cx:a[0],cy:a[1],r:100}),r.a.createElement("circle",{cx:e.coord[0],cy:e.coord[1],r:75}),r.a.createElement("path",{d:b(100,75,a,e.coord)}))})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));document.title="React SVG Goo",o.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,t,a){e.exports=a(28)}},[[6,1,2]]]);
//# sourceMappingURL=main.c8a02ed2.chunk.js.map