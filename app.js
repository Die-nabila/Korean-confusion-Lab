const D=CONF,KEY='klab_v1',$=s=>document.querySelector(s),td=()=>new Date().toISOString().slice(0,10);
const T={sound:'🎧 Sound',spell:'✍️ Spelling',meaning:'🧠 Meaning',multi:'🔄 Multiple meanings',listen:'👂 Listening traps',context:'📖 Context',grammar:'🇰🇷 Grammar'};
const ML={listen:'Listening',read:'Meaning',meaning:'Spelling',context:'Context'};
let S=Object.assign({mine:{},st:{},set:{dark:0,snd:1,n:10},day:{d:'',n:0},sk:0,last:''},JSON.parse(localStorage[KEY]||'{}'));
const save=()=>localStorage[KEY]=JSON.stringify(S);
const uniq=g=>g.items.filter((x,i,a)=>a.findIndex(y=>y.k==x.k)==i),G=id=>D.find(g=>g.id==id);
const rnd=a=>a[Math.random()*a.length|0],shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const acc=s=>s&&s.a?s.c/s.a:null,pair=g=>uniq(g).map(x=>x.k).join(' ↔ ');
const say=t=>{if(!S.set.snd||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='ko-KR';u.rate=.8;speechSynthesis.speak(u)};
const status=id=>{const s=S.st[id];if(!s)return'learning';if(s.a>=3&&acc(s)<.5)return'difficult';if(s.box>=4)return'mastered';if(s.box>=2)return'improving';return'learning'};
const dots=(s,m)=>{const x=s&&s.m&&s.m[m],n=x&&x.a?Math.round(x.c/x.a*5):0;return'●'.repeat(n)+'○'.repeat(5-n)};
const diff=g=>{const it=g.items.filter(x=>x.j);if(it.length<2)return'';const P=it.map(x=>x.j.split('+'));return it.map((x,i)=>`<div class=row><span class=mu>${x.k}</span> &nbsp;`+P[i].map((p,n)=>P.some(q=>q[n]!=p)?`<b>${p}</b>`:p).join(' + ')+'</div>').join('')};
const card=g=>`<a class=card href="#/g/${g.id}"><div class=big>${uniq(g).map(x=>x.k).join(' · ')}</div><small>${uniq(g).map(x=>x.m).join(' · ')}</small><br><small>${T[g.type]} · ${g.lvl}</small></a>`;
const A=h=>$('#app').innerHTML=h;
let Q=null;

function view(){
 const[r,a]=location.hash.slice(2).split('/');
 document.querySelectorAll('#nav a').forEach(x=>x.classList.toggle('on',x.dataset.r==(r=='g'||r=='stats'||r=='set'?'explore':r||'')&&(r!='stats'&&r!='set')));
 ({'':home,explore,g:()=>group(a),practice:()=>practice(a),mine,stats,set:settings}[r]||home)();scrollTo(0,0)}
function home(){
 const n=S.day.d==td()?S.day.n:0,w=Object.keys(S.st).map(G).filter(g=>g&&acc(S.st[g.id])<.8).sort((p,q)=>acc(S.st[p.id])-acc(S.st[q.id])).slice(0,4);
 A(`<div class=top><div><h1>Korean Confusion Lab</h1><div class=tag>Learn the words your brain keeps mixing up.</div></div><a href="#/set" style="font-size:24px;text-decoration:none">⚙︎</a></div>
 <div class=grid><a class=card href="#/explore"><div class=big>🔎</div><b>Explore</b><br><small>Find confusing Korean words.</small></a>
 <a class=card href="#/practice"><div class=big>🎧</div><b>Practice</b><br><small>Train your listening and recognition.</small></a>
 <a class=card href="#/mine"><div class=big>🧠</div><b>My Confusions</b><br><small>Review the words YOU confuse.</small></a>
 <a class=card href="#/explore"><div class=big>📚</div><b>Browse</b><br><small>Categories and confusion types.</small></a></div>
 <h2>Today's practice</h2><div class=card><div class=big>${n} / 20</div><div class=bar><i style="width:${Math.min(100,n*5)}%"></i></div></div>
 <h2>Words you're working on</h2>${w.length?w.map(g=>`<a class=card href="#/g/${g.id}"><span class=big>${pair(g)}</span></a>`).join(''):'<div class=empty>Practice a little and your tricky pairs will appear here.</div>'}
 <a class=btn style="display:block;text-align:center;line-height:50px;text-decoration:none" href="#/stats">Statistics</a>`)}
function explore(){
 A(`<h1>Explore</h1><div class=tag>Search Korean, English, tags or related words.</div><input id=q placeholder="달, moon, daughter…" oninput="list()">
 <div class=chips><select id=ty onchange="list()"><option value="">All types</option>${Object.entries(T).map(([k,v])=>`<option value=${k}>${v}</option>`).join('')}</select></div>
 <div class=chips><select id=lv onchange="list()"><option value="">All levels</option><option>beginner</option><option>intermediate</option><option>advanced</option></select></div><div id=res></div>`);list()}
function list(){
 const q=$('#q').value.trim().toLowerCase(),t=$('#ty').value,l=$('#lv').value;
 const r=D.filter(g=>(!t||g.type==t)&&(!l||g.lvl==l)&&(!q||(g.tags.join(' ')+' '+g.items.map(x=>x.k+x.m+x.r).join(' ')).toLowerCase().includes(q)));
 $('#res').innerHTML=r.map(card).join('')||'<div class=empty>No matches yet. Try another spelling.</div>'}
function group(id){
 const g=G(id);if(!g)return home();const on=S.mine[id];
 A(`<a href="#/explore" class=mu>‹ Back</a><h1 style="margin-top:8px">${uniq(g).map(x=>x.k).join(' · ')}</h1><small>${T[g.type]} · ${g.lvl}</small>
 <button class="btn ${on?'o':''}" onclick="tog('${id}')">${on?'✓ In My Confusions':'♡ Add to My Confusions'}</button>
 ${g.items.map(x=>`<div class=card><div class=top><span><span class=k>${x.k}</span>${x.em}</span><button class="chip" onclick="say('${x.k}')">🔊</button></div>
 <b>${x.m}</b><br><small>Pronunciation: <code>${x.r}</code></small><p style="margin:8px 0 0">${x.e}<br><small>“${x.t}”</small></p></div>`).join('')}
 <h2>What is different?</h2><div class=card>${diff(g)}<p class=mu style="margin:8px 0 0">${g.note}</p></div>
 <a class=btn style="display:block;text-align:center;line-height:50px;text-decoration:none" href="#/practice/${id}">Practice this group</a>`)}
function tog(id){S.mine[id]?delete S.mine[id]:S.mine[id]=1;save();group(id)}
function mine(){
 const ids=Object.keys(S.mine),now=Date.now(),due=Object.keys(S.st).filter(k=>S.st[k].due<=now);
 if(!ids.length&&!due.length)return A(`<h1>My Confusions</h1><div class=empty><div class=sp>♡</div>Nothing here yet ♡<br>Add a word whenever your Korean brain says<br>"Wait... wasn't that the other one?"</div>`);
 const sec=(t,a)=>a.length?`<h2>${t}</h2>`+a.map(id=>{const g=G(id),s=S.st[id];return`<a class=card href="#/g/${id}"><div class=big>${pair(g)}</div><div class=dots>Listening ${dots(s,'listen')}<br>Meaning ${dots(s,'read')}<br>Spelling ${dots(s,'meaning')}</div></a>`}).join(''):'';
 A(`<h1>My Confusions</h1>${sec('Due for review',due)}${['difficult','learning','improving','mastered'].map(s=>sec(s,ids.filter(id=>status(id)==s))).join('')}`)}
function practice(id){
 if(Q&&Q.qs)return ask();
 const gs=id?[G(id)]:Object.keys(S.mine).length?Object.keys(S.mine).map(G):D;Q={gs,mode:'mix'};
 A(`<h1>Practice</h1><div class=tag>${id?'Group: '+pair(G(id)):Object.keys(S.mine).length?'From My Confusions':'All groups'} · ${S.set.n} questions</div>
 ${[['mix','🎲 Mixed'],['listen','🎧 Listening'],['meaning','✍️ Spelling (English → Korean)'],['read','🧠 Korean → Meaning'],['context','📖 Context']].map(([m,l])=>`<button class=btn style="font-size:17px" onclick="start('${m}')">${l}</button>`).join('')}`)}
function pick(gs){const now=Date.now(),w=gs.map(g=>{const s=S.st[g.id];return s?1+3*(1-acc(s))+(s.due<=now?2:0):2}),t=w.reduce((a,b)=>a+b);let r=Math.random()*t;return gs[w.findIndex(x=>(r-=x)<0)]||gs[0]}
function start(m){const gs=Q.gs;Q={gs,qs:[],i:0,sc:0};for(let n=0;n<S.set.n;n++){const g=pick(gs),p=uniq(g),it=rnd(p);let md=m=='mix'?rnd(['listen','meaning','read','context']):m;if(md=='context'&&!it.e.includes(it.k))md='listen';Q.qs.push({g,it,md,o:shuf([it,...shuf(p.filter(x=>x!=it)).slice(0,3)]),pool:p})}ask()}
function ask(){
 const q=Q.qs[Q.i];if(!q)return done();const{it,md}=q;
 const head=md=='listen'?`<div class=sp><button class=chip style="font-size:40px;padding:14px 26px" onclick="say('${it.k}')">🎧</button></div><h2 style="text-align:center">What did you hear?</h2>`:md=='meaning'?`<div class=sp style="font-size:34px">${it.m}</div><h2 style="text-align:center">Which Korean word?</h2>`:md=='read'?`<div class=sp style="font-size:56px">${it.k}</div><h2 style="text-align:center">What does it mean?</h2>`:`<div class=sp style="font-size:26px">${it.e.replace(it.k,'＿＿＿')}<br><small>“${it.t}”</small></div>`;
 A(`<div class=top><a href="javascript:quit()" class=mu>✕ Quit</a><small>${Q.i+1} / ${Q.qs.length}</small></div><div class=bar><i style="width:${Q.i/Q.qs.length*100}%"></i></div>${head}<div id=os>${q.o.map((x,n)=>`<button class=opt onclick="ans(${n})">${md=='read'?x.m:x.k}</button>`).join('')}</div><div id=fb></div>`);
 if(md=='listen')say(it.k)}
function ans(n){
 const q=Q.qs[Q.i],pick=q.o[n],ok=pick==q.it,{it,md,g}=q;
 document.querySelectorAll('.opt').forEach((b,i)=>{b.disabled=1;b.classList.add(q.o[i]==it?'ok':i==n?'me':'no')});
 const s=S.st[g.id]=S.st[g.id]||{a:0,c:0,w:0,sk:0,box:0,m:{}};s.a++;s.last=Date.now();s.m[md]=s.m[md]||{a:0,c:0};s.m[md].a++;
 if(ok){s.c++;s.sk++;s.m[md].c++;s.box=Math.min(4,s.box+1);Q.sc++}else{s.w++;s.sk=0;s.box=0}
 s.due=Date.now()+[.25,1,3,7,14][s.box]*864e5;
 if(S.day.d!=td())S.day={d:td(),n:0};S.day.n++;
 if(S.last!=td()){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.sk=S.last==y?S.sk+1:1;S.last=td()}save();
 $('#fb').innerHTML=`<div class=fb><b>${ok?'✓ Correct!':'Not quite.'}</b><br>${ok?'':`You chose <b>${md=='read'?pick.m:pick.k}</b>, but the answer was <b>${md=='read'?it.m:it.k}</b>.<br>`}${it.k} = ${it.m}
 <div class=chips>${q.pool.map(x=>`<button class=chip onclick="say('${x.k}')">🔊 ${x.k}</button>`).join('')}</div></div><button class=btn onclick="Q.i++;ask()">Next →</button>`}
function done(){const sc=Q.sc,n=Q.qs.length;Q=null;A(`<div class=empty><div class=sp>🌸</div><h1>${sc} / ${n}</h1><p>Nice work. Tricky ones will come back sooner.</p></div><a class=btn style="display:block;text-align:center;line-height:50px;text-decoration:none" href="#/practice">Again</a>`)}
function quit(){Q=null;practice()}
function stats(){
 const v=Object.entries(S.st),t=v.reduce((a,[,s])=>a+s.a,0),c=v.reduce((a,[,s])=>a+s.c,0),h=v.filter(([,s])=>s.a>=3).sort((p,q)=>acc(p[1])-acc(q[1]))[0],im=v.filter(([,s])=>s.w>0&&s.box>=2).sort((p,q)=>q[1].box-p[1].box)[0];
 const bars=Object.entries(ML).map(([m,l])=>{const a=v.reduce((x,[,s])=>x+(s.m[m]?s.m[m].a:0),0),k=v.reduce((x,[,s])=>x+(s.m[m]?s.m[m].c:0),0),p=a?Math.round(k/a*100):0;return`<div class=card><div class=top><b>${l}</b><small>${p}%</small></div><div class=bar><i style="width:${p}%"></i></div></div>`}).join('');
 A(`<a href="#/" class=mu>‹ Home</a><h1 style="margin-top:8px">Statistics</h1><div class=grid style="margin-top:14px"><div class=card><small>Questions practiced</small><div class=big>${t}</div></div><div class=card><small>Accuracy</small><div class=big>${t?Math.round(c/t*100):0}%</div></div><div class=card><small>Streak</small><div class=big>${S.sk} 🌸</div></div><div class=card><small>Most difficult</small><div style="font-size:18px">${h?pair(G(h[0])):'—'}</div></div></div>
 <div class=card><small>Most improved</small><div style="font-size:18px">${im?pair(G(im[0])):'—'}</div></div><h2>By skill</h2>${bars}`)}
function settings(){
 A(`<a href="#/" class=mu>‹ Home</a><h1 style="margin-top:8px">Settings</h1>
 <button class="btn o" onclick="S.set.dark^=1;sv()">Dark mode: ${S.set.dark?'on':'off'}</button><button class="btn o" onclick="S.set.snd^=1;sv()">Sound: ${S.set.snd?'on':'off'}</button>
 <h2>Questions per session</h2><select onchange="S.set.n=+this.value;sv()">${[5,10,15,20].map(n=>`<option ${n==S.set.n?'selected':''}>${n}</option>`).join('')}</select>
 <h2>Your data</h2><button class=btn onclick="exp()">Export progress (JSON)</button><label class="btn o" style="display:block;text-align:center;line-height:50px">Import progress<input type=file accept=".json" hidden onchange="imp(this.files[0])"></label>
 <button class="btn o" onclick="if(confirm('Reset all progress?')){S.mine={};S.st={};S.day={d:'',n:0};S.sk=0;sv()}">Reset progress</button><p class=mu>Everything stays on this device.</p>`)}
function sv(){save();theme();settings()}
function theme(){document.documentElement.dataset.t=S.set.dark?'d':''}
function exp(){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='korean-confusion-lab-progress.json';a.click()}
function imp(f){if(!f)return;f.text().then(t=>{try{S=Object.assign(S,JSON.parse(t));save();theme();alert('Progress imported ♡');settings()}catch(e){alert('That file could not be read.')}})}
theme();addEventListener('hashchange',view);view();
const off=()=>$('#off').hidden=navigator.onLine;addEventListener('online',off);addEventListener('offline',off);off();
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js'));
