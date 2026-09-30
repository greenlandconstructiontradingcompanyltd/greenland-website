(function(){"use strict";
var LANGS=[["en","English","English","🇬🇧"],["so","Somali","Soomaali","🇸🇴"],["ar","Arabic","العربية","🇸🇦"],["tr","Turkish","Türkçe","🇹🇷"],["fr","French","Français","🇫🇷"],["de","German","Deutsch","🇩🇪"],["es","Spanish","Español","🇪🇸"],["it","Italian","Italiano","🇮🇹"],["pt","Portuguese","Português","🇵🇹"],["ru","Russian","Русский","🇷🇺"],["zh","Chinese","中文","🇨🇳"],["ja","Japanese","日本語","🇯🇵"],["ko","Korean","한국어","🇰🇷"],["hi","Hindi","हिन्दी","🇮🇳"],["id","Indonesian","Bahasa Indonesia","🇮🇩"],["nl","Dutch","Nederlands","🇳🇱"],["sv","Swedish","Svenska","🇸🇪"],["no","Norwegian","Norsk","🇳🇴"],["da","Danish","Dansk","🇩🇰"],["pl","Polish","Polski","🇵🇱"]];
var RTL={ar:1},L=window.LOCALES||{},cur="en";
var IC={building:'<path d="M4 21V4l8-2v19M12 8h8v13M8 8h1M8 12h1M8 16h1M16 12h1M16 16h1M2 21h20"/>',drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',road:'<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v3"/>',cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',book:'<path d="M4 4h6a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h7z"/>',home:'<path d="M3 11 12 3l9 8M5 10v11h14V10M10 21v-6h4v6"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',tool:'<path d="M14 6a4 4 0 0 0 5 5l-9 9a2.500 2.500 0 0 1-4-4z"/>',box:'<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/>',dots:'<circle cx="5" cy="12" r="1.500"/><circle cx="12" cy="12" r="1.500"/><circle cx="19" cy="12" r="1.500"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',link:'<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>'};
var CI={"Construction":"building","Water & Boreholes":"drop","Roads":"road","Health":"cross","Education":"book","Shelter":"home","Solar & Energy":"sun","Rehabilitation":"tool","Supply":"box","Other":"dots"};
function ic(n){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[n]||IC.dots)+'</svg>'}
function t(k){return (L[cur]&&L[cur][k])||(L.en&&L.en[k])||k}
function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
/* i18n */
function apply(code){if(!LANGS.some(function(l){return l[0]===code}))code="en";cur=code;
 document.documentElement.lang=code;document.documentElement.dir=RTL[code]?"rtl":"ltr";
 $$("[data-i18n]").forEach(function(e){e.textContent=t(e.getAttribute("data-i18n"))});
 $$("[data-i18n-ph]").forEach(function(e){e.placeholder=t(e.getAttribute("data-i18n-ph"))});
 $$("[data-i18n-aria]").forEach(function(e){e.setAttribute("aria-label",t(e.getAttribute("data-i18n-aria")))});
 var b=$("#langCode");if(b)b.textContent=code.toUpperCase();
 $$("#langList button").forEach(function(x){x.setAttribute("aria-selected",x.dataset.c===code)});
 try{localStorage.setItem("gctc-lang",code)}catch(e){}
 if(window.onLang)window.onLang()}
function langMenu(){var box=$("#lang");if(!box)return;
 box.innerHTML='<button type="button" id="langBtn" aria-haspopup="listbox" aria-expanded="false" aria-label="Language">'+ic("globe")+'<span id="langCode">EN</span><span aria-hidden="true">▾</span></button><div class="pop" id="langPop"><input type="search" id="langQ" data-i18n-ph="lang_search" autocomplete="off" aria-label="Search language"><ul id="langList" role="listbox"></ul></div>';
 var ul=$("#langList"),btn=$("#langBtn"),q=$("#langQ");
 function draw(f){f=(f||"").toLowerCase();ul.innerHTML=LANGS.filter(function(l){return !f||(l[1]+l[2]+l[0]).toLowerCase().indexOf(f)>-1}).map(function(l){return '<li role="presentation"><button type="button" role="option" data-c="'+l[0]+'" aria-selected="'+(l[0]===cur)+'"><span class="fl" aria-hidden="true">'+l[3]+'</span><span>'+l[1]+'</span><span class="n" lang="'+l[0]+'">'+l[2]+'</span></button></li>'}).join("")}
 function open(o){box.classList.toggle("open",o);btn.setAttribute("aria-expanded",o);if(o){q.value="";draw();q.focus()}}
 draw();btn.onclick=function(){open(!box.classList.contains("open"))};
 q.oninput=function(){draw(q.value)};
 ul.onclick=function(e){var b=e.target.closest("button");if(b){apply(b.dataset.c);open(false);btn.focus()}};
 box.onkeydown=function(e){var it=$$("#langList button");var i=it.indexOf(document.activeElement);
  if(e.key==="Escape"){open(false);btn.focus()}
  else if(e.key==="ArrowDown"){e.preventDefault();(it[i+1]||it[0]).focus()}
  else if(e.key==="ArrowUp"){e.preventDefault();(i>0?it[i-1]:q).focus()}};
 document.addEventListener("click",function(e){if(!box.contains(e.target))open(false)})}
/* nav */
function nav(){var b=$(".burger"),n=$(".nav");if(!b)return;b.onclick=function(){var o=n.classList.toggle("open");b.setAttribute("aria-expanded",o)};
 $$(".nav a").forEach(function(a){a.onclick=function(){n.classList.remove("open")}})}
function reveal(){var els=$$(".rv");if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.08});els.forEach(function(e){io.observe(e)})}
/* data helpers */
var P=window.PROJECTS||[];
function card(p){var img=p.images&&p.images[0]?'<img loading="lazy" src="'+esc(p.images[0])+'" alt="'+esc(p.title)+'">':'';
 return '<button type="button" class="card pc rv" data-id="'+p.id+'"><div class="ph">'+(img||ic(CI[p.category]))+'</div><div class="bd"><span class="tag">'+esc(p.category)+'</span><h3>'+esc(p.title)+'</h3><p class="meta">'+esc(p.location)+' · '+esc(p.date)+'</p><p class="meta">'+esc(p.client)+'</p></div></button>'}
function modal(id){var p=P.filter(function(x){return x.id===id})[0];if(!p)return;var d=$("#pm");
 var gal=(p.images||[]).map(function(s,i){return '<img loading="lazy" src="'+esc(s)+'" alt="'+esc(p.title)+' '+(i+1)+'">'}).join("");
 d.innerHTML='<button class="x" type="button" aria-label="Close">×</button><div class="ph">'+ic(CI[p.category])+'</div><div class="in"><span class="tag">'+esc(p.category)+'</span><h2 id="pmT">'+esc(p.title)+'</h2><dl class="facts"><dt>ID</dt><dd>'+p.id+'</dd><dt>'+t("year")+'</dt><dd>'+esc(p.date)+'</dd><dt>'+t("f_location")+'</dt><dd>'+esc(p.location)+'</dd><dt>'+t("client")+'</dt><dd>'+esc(p.client)+'</dd><dt>Status</dt><dd>'+esc(p.status)+'</dd></dl><p>'+esc(p.scope.join("; "))+'.</p><p class="meta">Project information available in company records.</p>'+(gal?'<div class="gal">'+gal+'</div>':'')+'<p style="margin-top:18px"><a class="btn sm" href="contact.html?ref='+p.id+'">'+t("cta_discuss")+'</a></p></div>';
 d.setAttribute("aria-labelledby","pmT");d.querySelector(".x").onclick=function(){d.close()};d.showModal()}
function wireCards(root){$$(".pc",root).forEach(function(c){c.onclick=function(){modal(c.dataset.id)}})}
var page=document.body.dataset.page;
var pages={
index:function(){var f=P.filter(function(p){return p.featured});$("#featured").innerHTML=f.map(card).join("");wireCards($("#featured"));
 var yrs=P.map(function(p){return p.year});$("#sN").textContent=P.length;$("#sY").textContent=Math.min.apply(0,yrs)+"–"+Math.max.apply(0,yrs);$("#sC").textContent=(window.PARTNERS||[]).length;
 $("#pt").innerHTML=(window.PARTNERS||[]).slice(0,12).map(function(p){return '<div class="card pt">'+esc(p.name)+'</div>'}).join("")},
projects:function(){var st={q:"",c:"",y:"",cl:""};var cats=(window.CATS||[]);
 $("#chips").innerHTML='<button class="chip" data-c="" aria-pressed="true" data-i18n="all_cat">All</button>'+cats.map(function(c){return '<button class="chip" data-c="'+esc(c)+'" aria-pressed="false">'+esc(c)+'</button>'}).join("");
 var ys=[];P.forEach(function(p){if(ys.indexOf(p.year)<0)ys.push(p.year)});ys.sort(function(a,b){return b-a});
 $("#fy").innerHTML='<option value="">'+t("year")+'</option>'+ys.map(function(y){return '<option>'+y+'</option>'});
 var cs=[];P.forEach(function(p){p.clients.forEach(function(c){if(cs.indexOf(c)<0)cs.push(c)})});cs.sort();
 $("#fc").innerHTML='<option value="">'+t("client")+'</option>'+cs.map(function(c){return '<option>'+esc(c)+'</option>'});
 function run(){var q=st.q.toLowerCase();var r=P.filter(function(p){return(!st.c||p.allCategories.indexOf(st.c)>-1)&&(!st.y||String(p.year)===st.y)&&(!st.cl||p.clients.indexOf(st.cl)>-1)&&(!q||(p.title+" "+p.location+" "+p.client+" "+p.id+" "+p.allCategories.join(" ")).toLowerCase().indexOf(q)>-1)});
  $("#cnt").textContent=r.length+" / "+P.length;$("#grid").innerHTML=r.length?r.map(card).join(""):'<p>'+t("no_results")+'</p>';$$("#grid .rv").forEach(function(e){e.classList.add("in")});wireCards($("#grid"))}
 $("#q").oninput=function(){st.q=this.value;run()};$("#fy").onchange=function(){st.y=this.value;run()};$("#fc").onchange=function(){st.cl=this.value;run()};
 $("#chips").onclick=function(e){var b=e.target.closest(".chip");if(!b)return;st.c=b.dataset.c;$$(".chip").forEach(function(x){x.setAttribute("aria-pressed",x===b)});run()};
 window.onLang=function(){$("#fy").options[0].text=t("year");$("#fc").options[0].text=t("client");run()};run();
 if(location.hash.length>1)modal(location.hash.slice(1))},
experience:function(){var eras=[[2007,2010],[2011,2015],[2016,2020],[2021,2025],[2026,2026]];
 $("#tl").innerHTML=eras.map(function(e){var r=P.filter(function(p){return p.year>=e[0]&&p.year<=e[1]});var loc=[];r.forEach(function(p){if(loc.indexOf(p.town)<0)loc.push(p.town)});
  return '<div class="rv"><span class="n">'+(e[0]===e[1]?e[0]:e[0]+"–"+e[1])+' · '+r.length+' records</span><h3>'+loc.slice(0,5).map(esc).join(", ")+'</h3><ul>'+r.slice(0,4).map(function(p){return '<li><a href="projects.html#'+p.id+'">'+esc(p.title)+'</a> ('+p.year+')</li>'}).join("")+'</ul></div>'}).join("");reveal()},
partners:function(){$("#pl").innerHTML=(window.PARTNERS||[]).map(function(p){return '<div class="card pt rv">'+esc(p.name)+'<small>'+p.count+' records</small></div>'}).join("")},
contact:function(){var r=new URLSearchParams(location.search).get("ref");if(r)$("#msg").value="Re: "+r+"\n";
 $("#fm").onsubmit=function(e){e.preventDefault();var f=e.target,g=function(n){return f.elements[n].value};
  var body=["Name: "+g("name"),"Organization: "+g("org"),"Phone: "+g("phone"),"Project type: "+g("type"),"Location: "+g("loc"),"","Message:",g("msg")].join("\n");
  location.href="mailto:"+f.dataset.to+"?subject="+encodeURIComponent("Project inquiry — "+g("name"))+"&body="+encodeURIComponent(body)}}};
document.addEventListener("DOMContentLoaded",function(){
 var q=new URLSearchParams(location.search).get("lang"),s=null;try{s=localStorage.getItem("gctc-lang")}catch(e){}
 langMenu();nav();if(pages[page])pages[page]();apply(q||s||"en");reveal();
 $$(".yr").forEach(function(e){e.textContent=new Date().getFullYear()})})})();
