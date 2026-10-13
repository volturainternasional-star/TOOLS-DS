//#region node_modules/.nitro/vite/services/ssr/assets/visuals-q4XUiG7c.js
var wrap = (body, extra = "") => `<!doctype html><html><head><meta charset="utf-8"/><style>
html,body{margin:0;height:100%;background:#030712;overflow:hidden;font-family:Poppins,system-ui,sans-serif}
${extra}
</style></head><body>${body}</body></html>`;
var VISUALS = [
	{
		id: "plasma",
		name: "Plasma Field",
		tag: "shader",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h,t=0;
function rs(){w=c.width=innerWidth;h=c.height=innerHeight}addEventListener('resize',rs);rs();
(function loop(){t+=0.016;const i=x.createImageData(w,h),d=i.data;
for(let y=0;y<h;y+=2)for(let p=0;p<w;p+=2){const v=Math.sin(p*0.02+t)+Math.sin(y*0.02-t)+Math.sin((p+y)*0.01+t);
const n=((v+3)/6)*255,o=(y*w+p)*4;d[o]=n*0.7;d[o+1]=n*0.3;d[o+2]=n;d[o+3]=255;}
x.putImageData(i,0,0);requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "orbs",
		name: "Liquid Orbs",
		tag: "2d",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h;function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);
const b=[...Array(18)].map((_,i)=>({x:Math.random(),y:Math.random(),r:20+Math.random()*50,vx:(Math.random()-.5)*.002,vy:(Math.random()-.5)*.002,c:i%2?'#3b82f6':'#67e8f9'}));
(function loop(){x.fillStyle='rgba(5,5,9,.2)';x.fillRect(0,0,w,h);for(const o of b){o.x+=o.vx;o.y+=o.vy;if(o.x<0||o.x>1)o.vx*=-1;if(o.y<0||o.y>1)o.vy*=-1;
const g=x.createRadialGradient(o.x*w,o.y*h,0,o.x*w,o.y*h,o.r);g.addColorStop(0,o.c);g.addColorStop(1,'transparent');x.fillStyle=g;x.beginPath();x.arc(o.x*w,o.y*h,o.r,0,7);x.fill()}
requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "grid",
		name: "Cyber Grid",
		tag: "css",
		html: wrap(`<div class="g"></div>`, `
.g{width:100%;height:100%;background:
linear-gradient(#3b82f633 1px,transparent 1px),linear-gradient(90deg,#3b82f633 1px,transparent 1px),
radial-gradient(circle at 50% 120%,#2563eb55,transparent 50%),#030712;
background-size:40px 40px,40px 40px,auto;animation:p 8s linear infinite}
@keyframes p{to{background-position:0 40px,40px 0,0 0}}`)
	},
	{
		id: "loader-dna",
		name: "DNA Loader",
		tag: "loader",
		html: wrap(`<div class="w">${"<i></i>".repeat(18)}</div>`, `
.w{height:100%;display:flex;align-items:center;justify-content:center;gap:8px}
i{width:6px;height:6px;border-radius:50%;background:#60a5fa;animation:d 1.4s ease-in-out infinite}
i:nth-child(odd){background:#67e8f9}
${[...Array(18)].map((_, i) => `i:nth-child(${i + 1}){animation-delay:${i * .08}s}`).join("")}
@keyframes d{50%{transform:translateY(-40px) scale(1.4)}}`)
	},
	{
		id: "clock",
		name: "Orbit Clock",
		tag: "ui",
		html: wrap(`<div id=t></div><script>
function tick(){const n=new Date();t.textContent=n.toLocaleTimeString('id-ID')}tick();setInterval(tick,1000)
<\/script>`, `#t{height:100%;display:grid;place-items:center;font:800 14vw Orbitron,sans-serif;background:radial-gradient(circle,#082f49,#030712);color:#dbeafe;letter-spacing:.08em}`)
	},
	{
		id: "wave",
		name: "Audio Wave",
		tag: "2d",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h,t=0;function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);
(function loop(){t+=0.04;x.fillStyle='#030712';x.fillRect(0,0,w,h);x.beginPath();
for(let i=0;i<w;i++){const y=h/2+Math.sin(i*0.012+t)*60+Math.sin(i*0.03-t*1.4)*24;i?x.lineTo(i,y):x.moveTo(i,y)}
x.strokeStyle='#3b82f6';x.lineWidth=2;x.stroke();requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "matrix",
		name: "Azure Matrix",
		tag: "typo",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h,cols,y;function rs(){w=c.width=innerWidth;h=c.height=innerHeight;cols=Math.floor(w/14);y=Array(cols).fill(0)}rs();addEventListener('resize',rs);
(function loop(){x.fillStyle='rgba(5,5,9,.08)';x.fillRect(0,0,w,h);x.fillStyle='#60a5fa';x.font='12px monospace';
y.forEach((v,i)=>{const ch=String.fromCharCode(0x30A0+Math.random()*96);x.fillText(ch,i*14,v);y[i]=v>h+Math.random()*400?0:v+14});
requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "blob",
		name: "Morph Blob",
		tag: "css",
		html: wrap(`<div class="b"></div>`, `
body{display:grid;place-items:center}.b{width:46vmin;height:46vmin;background:linear-gradient(135deg,#3b82f6,#22d3ee);
border-radius:40% 60% 70% 30%/40% 50% 50% 60%;filter:blur(2px);animation:m 8s ease-in-out infinite}
@keyframes m{50%{border-radius:70% 30% 30% 70%/60% 40% 60% 40%;transform:rotate(20deg) scale(1.08)}}`)
	},
	{
		id: "stars",
		name: "Star Drift",
		tag: "2d",
		html: wrap("<canvas id=c></canvas><script>\nconst c=document.getElementById('c'),x=c.getContext('2d');let w,h;function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);\nconst s=[...Array(120)].map(()=>({x:Math.random(),y:Math.random(),z:Math.random()}));\n(function loop(){x.fillStyle='#030712';x.fillRect(0,0,w,h);for(const p of s){p.z-=0.004;if(p.z<=0)p.z=1;const sx=(p.x-0.5)/p.z*w+w/2,sy=(p.y-0.5)/p.z*h+h/2;\nx.fillStyle=`rgba(233,213,255,${1-p.z})`;x.fillRect(sx,sy,(1-p.z)*3,(1-p.z)*3)}requestAnimationFrame(loop)})();\n<\/script>")
	},
	{
		id: "ring",
		name: "Pulse Rings",
		tag: "css",
		html: wrap(`<div class="r"></div><div class="r d"></div><div class="r e"></div>`, `
body{display:grid;place-items:center}.r{position:absolute;width:20vmin;height:20vmin;border:2px solid #60a5fa;border-radius:50%;animation:p 2.4s ease-out infinite}
.d{animation-delay:.6s;border-color:#67e8f9}.e{animation-delay:1.2s}
@keyframes p{to{transform:scale(3.2);opacity:0}}`)
	},
	{
		id: "tilt",
		name: "Glass Card",
		tag: "ui",
		html: wrap(`<div class="card"><b>FAHMI</b><span>LIQUID REACTOR</span></div>`, `
body{display:grid;place-items:center;background:#030712}
.card{width:64vmin;height:40vmin;border-radius:24px;padding:8vmin;display:flex;flex-direction:column;justify-content:flex-end;
background:linear-gradient(160deg,rgba(56,189,248,.35),rgba(8,8,16,.9));border:1px solid rgba(255,255,255,.15);color:#fff;
box-shadow:0 30px 80px #000;font-family:Orbitron,sans-serif}
b{font-size:8vmin}span{letter-spacing:.3em;font-size:2.4vmin;opacity:.7;margin-top:8px}`)
	},
	{
		id: "bars",
		name: "EQ Bars",
		tag: "loader",
		html: wrap(`<div class="eq">${"<i></i>".repeat(16)}</div>`, `
.eq{height:100%;display:flex;align-items:flex-end;justify-content:center;gap:6px;padding:10vh 0}
i{width:18px;background:linear-gradient(#67e8f9,#3b82f6);animation:b 1s ease-in-out infinite alternate;transform-origin:bottom}
${[...Array(16)].map((_, i) => `i:nth-child(${i + 1}){height:${20 + i * 17 % 70}%;animation-delay:${i * .07}s}`).join("")}
@keyframes b{to{transform:scaleY(.25)}}`)
	},
	{
		id: "spiral",
		name: "Spiral Ink",
		tag: "2d",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h,t=0;function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);
(function loop(){t+=0.03;x.fillStyle='rgba(5,5,9,.08)';x.fillRect(0,0,w,h);x.strokeStyle='#60a5fa';x.beginPath();
for(let i=0;i<420;i++){const a=i*0.18+t,r=i*0.7;const px=w/2+Math.cos(a)*r,py=h/2+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)}
x.stroke();requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "noise",
		name: "Grain Field",
		tag: "texture",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');function rs(){c.width=innerWidth;c.height=innerHeight}rs();addEventListener('resize',rs);
(function loop(){const i=x.createImageData(c.width,c.height);for(let n=0;n<i.data.length;n+=4){const v=Math.random()*40;i.data[n]=30+v;i.data[n+1]=10+v;i.data[n+2]=50+v;i.data[n+3]=255}
x.putImageData(i,0,0);requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "type",
		name: "Kinetic Type",
		tag: "typo",
		html: wrap(`<div id=k>FAHMI</div><script>
const w=['FAHMI','LIQUID','REACTOR','TOOLS','FREE'];let i=0;setInterval(()=>{i=(i+1)%w.length;k.textContent=w[i]},900)
<\/script>`, `body{display:grid;place-items:center}#k{font:800 16vw Orbitron,sans-serif;background:linear-gradient(90deg,#dbeafe,#67e8f9);-webkit-background-clip:text;color:transparent;letter-spacing:-.04em}`)
	},
	{
		id: "cursor",
		name: "Trail Cursor",
		tag: "interactive",
		html: wrap("<canvas id=c></canvas><script>\nconst c=document.getElementById('c'),x=c.getContext('2d');let w,h,mx=.5,my=.5,pts=[];function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);\nonpointermove=e=>{mx=e.clientX;my=e.clientY};\n(function loop(){pts.unshift({x:mx,y:my});pts=pts.slice(0,40);x.fillStyle='rgba(5,5,9,.2)';x.fillRect(0,0,w,h);\npts.forEach((p,i)=>{x.beginPath();x.arc(p.x,p.y,12-i*0.25,0,7);x.fillStyle=`rgba(56,189,248,${1-i/40})`;x.fill()});requestAnimationFrame(loop)})();\n<\/script>")
	},
	{
		id: "iso",
		name: "Isometric Blocks",
		tag: "css",
		html: wrap(`<div class="iso">${"<b></b>".repeat(27)}</div>`, `
body{display:grid;place-items:center}.iso{width:70vmin;height:70vmin;display:grid;grid-template-columns:repeat(9,1fr);gap:6px;transform:rotateX(60deg) rotateZ(45deg)}
b{background:linear-gradient(#60a5fa,#1d4ed8);animation:u 1.6s ease-in-out infinite alternate}
${[...Array(27)].map((_, i) => `b:nth-child(${i + 1}){animation-delay:${i % 9 * .08}s}`).join("")}
@keyframes u{to{transform:translateY(-18px)}}`)
	},
	{
		id: "moon",
		name: "Phase Moon",
		tag: "space",
		html: wrap(`<div class="m"></div>`, `
body{display:grid;place-items:center;background:radial-gradient(circle at 50% 80%,#0c4a6e,#030712)}
.m{width:40vmin;height:40vmin;border-radius:50%;background:#fde68a;box-shadow:0 0 80px #fde68a88;animation:ph 6s linear infinite}
@keyframes ph{50%{box-shadow:-18vmin 0 0 #030712,0 0 80px #fde68a88}}`)
	},
	{
		id: "scan",
		name: "HUD Scan",
		tag: "ui",
		html: wrap(`<div class="hud"><i></i><b>SYSTEM 06 · LIVE</b></div>`, `
.hud{height:100%;position:relative;background:repeating-linear-gradient(0deg,transparent,transparent 3px,#3b82f611 4px)}
i{position:absolute;left:0;right:0;height:18%;background:linear-gradient(#67e8f900,#67e8f966,#67e8f900);animation:s 2.4s linear infinite}
b{position:absolute;left:8%;bottom:10%;font:700 4vmin Orbitron,sans-serif;color:#67e8f9;letter-spacing:.2em}
@keyframes s{from{top:-20%}to{top:100%}}`)
	},
	{
		id: "confetti",
		name: "Soft Confetti",
		tag: "2d",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h;function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);
const p=[...Array(80)].map(()=>({x:Math.random()*1,y:Math.random()*-1,s:4+Math.random()*8,v:.004+Math.random()*.01,c:['#3b82f6','#67e8f9','#f5c451','#f472b6'][Math.floor(Math.random()*4)]}));
(function loop(){x.fillStyle='#030712';x.fillRect(0,0,w,h);for(const o of p){o.y+=o.v;if(o.y>1.1)o.y=-.1;x.fillStyle=o.c;x.fillRect(o.x*w,o.y*h,o.s,o.s*0.4)}requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "portal",
		name: "Portal Gate",
		tag: "css",
		html: wrap(`<div class="p"></div>`, `
body{display:grid;place-items:center}.p{width:42vmin;height:42vmin;border-radius:50%;
background:conic-gradient(#3b82f6,#22d3ee,#3b82f6);animation:r 4s linear infinite;filter:blur(.4px);
box-shadow:0 0 80px #3b82f688, inset 0 0 40px #030712}
.p::after{content:'';position:absolute;inset:18%;border-radius:50%;background:#030712}
@keyframes r{to{transform:rotate(1turn)}}`)
	},
	{
		id: "rain",
		name: "Neon Rain",
		tag: "2d",
		html: wrap(`<canvas id=c></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');let w,h;function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);
const d=[...Array(90)].map(()=>({x:Math.random(),y:Math.random(),l:.05+Math.random()*.12,s:.01+Math.random()*.03}));
(function loop(){x.fillStyle='rgba(5,5,9,.25)';x.fillRect(0,0,w,h);x.strokeStyle='#67e8f9';
for(const o of d){x.beginPath();x.moveTo(o.x*w,o.y*h);x.lineTo(o.x*w,o.y*h+o.l*h);x.stroke();o.y+=o.s;if(o.y>1)o.y=-o.l}requestAnimationFrame(loop)})();
<\/script>`)
	},
	{
		id: "cube",
		name: "CSS Cube",
		tag: "3d",
		html: wrap(`<div class="scene"><div class="cube"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`, `
body{display:grid;place-items:center;perspective:80vmin}
.cube{width:24vmin;height:24vmin;position:relative;transform-style:preserve-3d;animation:r 8s linear infinite}
i{position:absolute;inset:0;border:1px solid #60a5fa;background:#3b82f622}
i:nth-child(1){transform:rotateY(0deg) translateZ(12vmin)}
i:nth-child(2){transform:rotateY(90deg) translateZ(12vmin)}
i:nth-child(3){transform:rotateY(180deg) translateZ(12vmin)}
i:nth-child(4){transform:rotateY(-90deg) translateZ(12vmin)}
i:nth-child(5){transform:rotateX(90deg) translateZ(12vmin)}
i:nth-child(6){transform:rotateX(-90deg) translateZ(12vmin)}
@keyframes r{to{transform:rotateX(1turn) rotateY(1turn)}}`)
	},
	{
		id: "horizon",
		name: "Synth Horizon",
		tag: "css",
		html: wrap(`<div class="h"></div>`, `
.h{height:100%;background:
linear-gradient(#030712 48%,#3b82f6 48.3%,#22d3ee 48.6%,#030712 49%),
repeating-linear-gradient(90deg,transparent 0 28px,#3b82f644 29px),
repeating-linear-gradient(0deg,transparent 0 28px,#22d3ee33 29px);
background-position:0 0,0 50%,0 50%;animation:z 6s linear infinite}
@keyframes z{to{background-position:0 0,0 80%,40px 80%}}`)
	}
];
//#endregion
export { VISUALS as t };
