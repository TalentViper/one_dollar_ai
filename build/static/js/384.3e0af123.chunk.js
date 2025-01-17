"use strict";(self.webpackChunkOneDollarAI=self.webpackChunkOneDollarAI||[]).push([[384],{6352:(e,t,n)=>{n.d(t,{A:()=>A});var r=n(4535),o=n(6946),i=n(9071),a=n(8978),s=n(6240),l=n(4973),d=n(1318),c=n(579);const h=(0,r.Ay)(d.N_)((e=>{let{theme:t}=e;return`\n        color: ${t.palette.text.primary};\n        display: flex;\n        text-decoration: none;\n        width: 53px;\n        margin: 0 auto;\n        font-weight: ${t.typography.fontWeightBold};\n`})),p=(0,r.Ay)(o.A)((()=>"\n        width: 52px;\n        height: 38px;\n")),m=(0,r.Ay)(o.A)((e=>{let{theme:t}=e;return`\n        background: ${t.general.reactFrameworkColor};\n        width: 18px;\n        height: 18px;\n        border-radius: ${t.general.borderRadiusSm};\n        position: relative;\n        transform: rotate(45deg);\n        top: 3px;\n        left: 17px;\n\n        &:after, \n        &:before {\n            content: "";\n            display: block;\n            width: 18px;\n            height: 18px;\n            position: absolute;\n            top: -1px;\n            right: -20px;\n            transform: rotate(0deg);\n            border-radius: ${t.general.borderRadiusSm};\n        }\n\n        &:before {\n            background: ${t.palette.primary.main};\n            right: auto;\n            left: 0;\n            top: 20px;\n        }\n\n        &:after {\n            background: ${t.palette.secondary.main};\n        }\n`})),u=(0,r.Ay)(o.A)((e=>{let{theme:t}=e;return`\n        width: 16px;\n        height: 16px;\n        position: absolute;\n        top: 12px;\n        left: 12px;\n        z-index: 5;\n        border-radius: ${t.general.borderRadiusSm};\n        background: ${t.header.background};\n`})),x=(0,r.Ay)((e=>{let{className:t,...n}=e;return(0,c.jsx)(i.A,{...n,classes:{popper:t}})}))((e=>{let{theme:t}=e;return{[`& .${a.A.tooltip}`]:{backgroundColor:t.colors.alpha.trueWhite[100],color:t.palette.getContrastText(t.colors.alpha.trueWhite[100]),fontSize:t.typography.pxToRem(12),fontWeight:"bold",borderRadius:t.general.borderRadiusSm,boxShadow:"0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)"},[`& .${a.A.arrow}`]:{color:t.colors.alpha.trueWhite[100]}}}));const A=function(){const e=(0,s.A)();return(0,c.jsx)(x,{title:"Tokyo Free Black React Javascript Admin Dashboard",arrow:!0,children:(0,c.jsx)(h,{to:"/overview",children:(0,c.jsx)(l.A,{sx:{".MuiBadge-badge":{fontSize:e.typography.pxToRem(11),right:-2,top:8}},overlap:"circular",color:"success",badgeContent:"2.0",children:(0,c.jsx)(p,{children:(0,c.jsx)(m,{children:(0,c.jsx)(u,{})})})})})})}},384:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var r=n(5043),o=n(6946),i=n(5865),a=n(9859),s=n(3404),l=n(622),d=n(3193),c=n(1787),h=n(8587),p=n(8168),m=n(3024),u=n(8610),x=n(4827),A=n(5213),g=n(4535),f=n(6803),b=n(2372);function v(e){return(0,b.Ay)("MuiFormHelperText",e)}const j=(0,n(2532).A)("MuiFormHelperText",["root","error","disabled","sizeSmall","sizeMedium","contained","focused","filled","required"]);var y,w=n(2876),z=n(579);const $=["children","className","component","disabled","error","filled","focused","margin","required","variant"],S=(0,g.Ay)("p",{name:"MuiFormHelperText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.size&&t[`size${(0,f.A)(n.size)}`],n.contained&&t.contained,n.filled&&t.filled]}})((e=>{let{theme:t,ownerState:n}=e;return(0,p.A)({color:(t.vars||t).palette.text.secondary},t.typography.caption,{textAlign:"left",marginTop:3,marginRight:0,marginBottom:0,marginLeft:0,[`&.${j.disabled}`]:{color:(t.vars||t).palette.text.disabled},[`&.${j.error}`]:{color:(t.vars||t).palette.error.main}},"small"===n.size&&{marginTop:4},n.contained&&{marginLeft:14,marginRight:14})})),k=r.forwardRef((function(e,t){const n=(0,w.A)({props:e,name:"MuiFormHelperText"}),{children:r,className:o,component:i="p"}=n,a=(0,h.A)(n,$),s=(0,A.A)(),l=(0,x.A)({props:n,muiFormControl:s,states:["variant","size","disabled","error","filled","focused","required"]}),d=(0,p.A)({},n,{component:i,contained:"filled"===l.variant||"outlined"===l.variant,variant:l.variant,size:l.size,disabled:l.disabled,error:l.error,filled:l.filled,focused:l.focused,required:l.required}),c=(e=>{const{classes:t,contained:n,size:r,disabled:o,error:i,filled:a,focused:s,required:l}=e,d={root:["root",o&&"disabled",i&&"error",r&&`size${(0,f.A)(r)}`,n&&"contained",s&&"focused",a&&"filled",l&&"required"]};return(0,u.A)(d,v,t)})(d);return(0,z.jsx)(S,(0,p.A)({as:i,ownerState:d,className:(0,m.A)(c.root,o),ref:t},a,{children:" "===r?y||(y=(0,z.jsx)("span",{className:"notranslate",children:"\u200b"})):r}))}));var M=n(9336),T=n(9071),R=n(7392),E=n(9490),W=n(6352),C=n(348),F=n(3417),N=n(7734),L=n(8169);const P=(0,g.Ay)(o.A)((()=>"\n    height: 100%;\n    display: flex;\n    flex: 1;\n    overflow: auto;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n")),H=(0,g.Ay)(i.A)((e=>{let{theme:t}=e;return`\n  font-size: ${t.typography.pxToRem(75)};\n`})),I=(0,g.Ay)(i.A)((e=>{let{theme:t}=e;return`\n  color: ${t.colors.alpha.black[50]};\n`})),q=(0,g.Ay)(a.A)((e=>{let{theme:t}=e;return`\n    background-color: ${t.colors.alpha.white[100]};\n`})),D=(0,g.Ay)(s.A)((e=>{let{theme:t}=e;return`\n    margin-right: -${t.spacing(1)};\n`}));const B=function(){const e=()=>{const e=+new Date("2023")-+new Date;let t={};return e>0&&(t={days:Math.floor(e/864e5),hours:Math.floor(e/36e5%24),minutes:Math.floor(e/1e3/60%60),seconds:Math.floor(e/1e3%60)}),t},[t,n]=(0,r.useState)(e());(0,r.useEffect)((()=>{setTimeout((()=>{n(e())}),1e3)}));const a=[];return Object.keys(t).forEach((e=>{t[e]&&a.push((0,z.jsxs)(o.A,{textAlign:"center",px:3,children:[(0,z.jsx)(H,{variant:"h1",children:t[e]}),(0,z.jsx)(I,{variant:"h3",children:e})]}))})),(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(E.mg,{children:(0,z.jsx)("title",{children:"Status - Coming Soon"})}),(0,z.jsx)(P,{children:(0,z.jsxs)(l.A,{maxWidth:"md",children:[(0,z.jsx)(W.A,{}),(0,z.jsxs)(o.A,{textAlign:"center",mb:3,children:[(0,z.jsxs)(l.A,{maxWidth:"xs",children:[(0,z.jsx)(i.A,{variant:"h1",sx:{mt:4,mb:2},children:"Coming Soon"}),(0,z.jsx)(i.A,{variant:"h3",color:"text.secondary",fontWeight:"normal",sx:{mb:4},children:"We're working on implementing the last features before our launch!"})]}),(0,z.jsx)("img",{alt:"Coming Soon",height:200,src:"/static/images/status/coming-soon.svg"})]}),(0,z.jsx)(o.A,{display:"flex",justifyContent:"center",children:a.length?a:(0,z.jsx)(z.Fragment,{children:"Time's up!"})}),(0,z.jsx)(l.A,{maxWidth:"sm",children:(0,z.jsxs)(o.A,{sx:{textAlign:"center",p:4},children:[(0,z.jsxs)(d.A,{variant:"outlined",fullWidth:!0,children:[(0,z.jsx)(q,{type:"text",placeholder:"Enter your email address here...",endAdornment:(0,z.jsx)(c.A,{position:"end",children:(0,z.jsx)(D,{variant:"contained",size:"small",children:"Notify Me"})}),startAdornment:(0,z.jsx)(c.A,{position:"start",children:(0,z.jsx)(L.A,{})})}),(0,z.jsx)(k,{children:"We'll email you once our website is launched!"})]}),(0,z.jsx)(M.A,{sx:{my:4}}),(0,z.jsxs)(o.A,{sx:{textAlign:"center"},children:[(0,z.jsx)(T.A,{arrow:!0,placement:"top",title:"Facebook",children:(0,z.jsx)(R.A,{color:"primary",children:(0,z.jsx)(C.A,{})})}),(0,z.jsx)(T.A,{arrow:!0,placement:"top",title:"Twitter",children:(0,z.jsx)(R.A,{color:"primary",children:(0,z.jsx)(F.A,{})})}),(0,z.jsx)(T.A,{arrow:!0,placement:"top",title:"Instagram",children:(0,z.jsx)(R.A,{color:"primary",children:(0,z.jsx)(N.A,{})})})]})]})})]})})]})}},8169:(e,t,n)=>{var r=n(4994);t.A=void 0;var o=r(n(39)),i=n(579),a=(0,o.default)([(0,i.jsx)("path",{d:"M20 6H4l8 4.99zM4 8v10h16V8l-8 5z",opacity:".3"},"0"),(0,i.jsx)("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 4.99L4 6h16zm0 12H4V8l8 5 8-5v10z"},"1")],"MailTwoTone");t.A=a},1787:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(8587),o=n(8168),i=n(5043),a=n(3024),s=n(8610),l=n(6803),d=n(5865),c=n(1053),h=n(5213),p=n(4535),m=n(2372);function u(e){return(0,m.Ay)("MuiInputAdornment",e)}const x=(0,n(2532).A)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var A,g=n(2876),f=n(579);const b=["children","className","component","disablePointerEvents","disableTypography","position","variant"],v=(0,p.Ay)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${(0,l.A)(n.position)}`],!0===n.disablePointerEvents&&t.disablePointerEvents,t[n.variant]]}})((e=>{let{theme:t,ownerState:n}=e;return(0,o.A)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active},"filled"===n.variant&&{[`&.${x.positionStart}&:not(.${x.hiddenLabel})`]:{marginTop:16}},"start"===n.position&&{marginRight:8},"end"===n.position&&{marginLeft:8},!0===n.disablePointerEvents&&{pointerEvents:"none"})})),j=i.forwardRef((function(e,t){const n=(0,g.A)({props:e,name:"MuiInputAdornment"}),{children:p,className:m,component:x="div",disablePointerEvents:j=!1,disableTypography:y=!1,position:w,variant:z}=n,$=(0,r.A)(n,b),S=(0,h.A)()||{};let k=z;z&&S.variant,S&&!k&&(k=S.variant);const M=(0,o.A)({},n,{hiddenLabel:S.hiddenLabel,size:S.size,disablePointerEvents:j,position:w,variant:k}),T=(e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:r,position:o,size:i,variant:a}=e,d={root:["root",n&&"disablePointerEvents",o&&`position${(0,l.A)(o)}`,a,r&&"hiddenLabel",i&&`size${(0,l.A)(i)}`]};return(0,s.A)(d,u,t)})(M);return(0,f.jsx)(c.A.Provider,{value:null,children:(0,f.jsx)(v,(0,o.A)({as:x,ownerState:M,className:(0,a.A)(T.root,m),ref:t},$,{children:"string"!==typeof p||y?(0,f.jsxs)(i.Fragment,{children:["start"===w?A||(A=(0,f.jsx)("span",{className:"notranslate",children:"\u200b"})):null,p]}):(0,f.jsx)(d.A,{color:"text.secondary",children:p})}))})}))}}]);
//# sourceMappingURL=384.3e0af123.chunk.js.map