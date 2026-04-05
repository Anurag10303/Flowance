import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Counter({ target, prefix = "", suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / 80;
      const t = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(t); }
        else setVal(Math.floor(start));
      }, 14);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
      @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
      @keyframes bar-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
      .stat-card:hover { transform:translateY(-4px) !important; }
      .feature-card:hover { transform:translateY(-6px) !important; }
      .step-card:hover .step-number { transform:scale(1.15) rotate(-5deg) !important; }
      .bar-animated { transform-origin:bottom; animation:bar-grow 0.6s cubic-bezier(0.16,1,0.3,1) both; }
    `}</style>
  );
}

function DashboardPreview({ dark }) {
  const card=dark?"#0D1120":"#fff", surf=dark?"#161C2E":"#F0EEE8", bg=dark?"#080B14":"#F8F7F4";
  const bdr=dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)", txt3=dark?"rgba(240,238,232,0.35)":"rgba(0,0,0,0.35)";
  const accent=dark?"#6EE7B7":"#059669", red=dark?"#F87171":"#DC2626";
  const bars=[38,55,44,70,62,88,76,95];
  return (
    <div style={{ background:card, borderRadius:20, border:`0.5px solid ${bdr}`, overflow:"hidden", boxShadow:dark?"0 40px 100px rgba(0,0,0,0.7)":"0 40px 100px rgba(0,0,0,0.15)" }}>
      <div style={{ background:surf, padding:"10px 16px", borderBottom:`0.5px solid ${bdr}`, display:"flex", alignItems:"center", gap:6 }}>
        {["#F87171","#FBBF24","#34D399"].map(c=><div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.8 }}/>)}
        <div style={{ flex:1, background:dark?"#0D1120":"#E8E6E0", borderRadius:6, height:22, marginLeft:8, display:"flex", alignItems:"center", paddingLeft:10 }}>
          <span style={{ fontSize:10, color:txt3 }}>app.flowance.io/dashboard</span>
        </div>
      </div>
      <div style={{ display:"flex", height:340 }}>
        <div style={{ width:150, background:dark?"#0A0E1A":"#F4F2EE", borderRight:`0.5px solid ${bdr}`, padding:"14px 10px", display:"flex", flexDirection:"column", gap:3 }}>
          <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:13, color:dark?"#fff":"#111", marginBottom:12, paddingLeft:8 }}>Flow<span style={{ color:accent }}>ance</span></div>
          {[["Dashboard",true],["Transactions",false],["Insights",false]].map(([l,active])=>(
            <div key={l} style={{ padding:"6px 8px", borderRadius:7, fontSize:11, color:active?accent:txt3, background:active?(dark?"rgba(110,231,183,0.07)":"rgba(5,150,105,0.07)"):"transparent", borderLeft:active?`2px solid ${accent}`:"2px solid transparent" }}>{l}</div>
          ))}
        </div>
        <div style={{ flex:1, padding:14, background:bg, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:10 }}>
            {[{l:"Balance",v:"₹1,24,850",c:dark?"#F0EEE8":"#111"},{l:"Income",v:"+₹68,000",c:accent},{l:"Expense",v:"−₹43,150",c:red}].map(({l,v,c})=>(
              <div key={l} style={{ background:card, border:`0.5px solid ${bdr}`, borderRadius:10, padding:"10px 12px" }}>
                <div style={{ fontSize:9, color:txt3, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:5 }}>{l}</div>
                <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:14, color:c }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:8 }}>
            <div style={{ background:card, border:`0.5px solid ${bdr}`, borderRadius:10, padding:"10px 12px" }}>
              <div style={{ fontSize:9, color:txt3, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.6px" }}>Balance trend</div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:70 }}>
                {bars.map((h,i)=><div key={i} className="bar-animated" style={{ flex:1, borderRadius:"3px 3px 0 0", background:`linear-gradient(to top, ${dark?"#064E3B":"#A7F3D0"}, ${accent})`, height:`${h}%`, opacity:0.4+(i/bars.length)*0.6, animationDelay:`${i*0.05}s` }}/>)}
              </div>
            </div>
            <div style={{ background:card, border:`0.5px solid ${bdr}`, borderRadius:10, padding:"10px 12px" }}>
              <div style={{ fontSize:9, color:txt3, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.6px" }}>Spending</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <svg width="56" height="56" viewBox="0 0 56 56" style={{ flexShrink:0 }}>
                  <circle cx="28" cy="28" r="20" fill="none" stroke={surf} strokeWidth="8"/>
                  {[{c:accent,d:42,o:0},{c:"#818CF8",d:28,o:-42},{c:red,d:18,o:-70},{c:"#FBBF24",d:12,o:-88}].map(({c,d,o})=>(
                    <circle key={c} cx="28" cy="28" r="20" fill="none" stroke={c} strokeWidth="8" strokeDasharray={`${(d/100)*125.6} 125.6`} strokeDashoffset={`${(-o/100)*125.6}`} transform="rotate(-90 28 28)" opacity={0.9}/>
                  ))}
                </svg>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  {[["Housing","#818CF8"],["Food",accent],["Travel",red]].map(([l,c])=>(
                    <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
                      <div style={{ width:5, height:5, borderRadius:1, background:c }}/>
                      <span style={{ fontSize:9, color:txt3 }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, dark, delay=0 }) {
  const accent=dark?"#6EE7B7":"#059669";
  return (
    <Reveal delay={delay}>
      <div className="feature-card" style={{ background:dark?"#0D1120":"#fff", border:`0.5px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`, borderRadius:18, padding:"28px", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", height:"100%" }}>
        <div style={{ width:48, height:48, borderRadius:14, background:dark?"rgba(110,231,183,0.08)":"rgba(5,150,105,0.07)", border:`0.5px solid ${dark?"rgba(110,231,183,0.14)":"rgba(5,150,105,0.14)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:22 }}>{icon}</div>
        <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:16, color:dark?"#F0EEE8":"#111", marginBottom:10 }}>{title}</div>
        <div style={{ fontSize:14, color:dark?"rgba(240,238,232,0.45)":"#666", lineHeight:1.72 }}>{desc}</div>
      </div>
    </Reveal>
  );
}

function Ticker({ dark }) {
  const accent=dark?"#6EE7B7":"#059669";
  const items=["Real-time analytics","Zero setup","Role-based access","Smart observations","Instant export","Privacy first","No account needed","Free forever"];
  const repeated=[...items,...items];
  return (
    <div style={{ overflow:"hidden", borderTop:`0.5px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`, borderBottom:`0.5px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`, padding:"14px 0", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"ticker 24s linear infinite" }}>
        {repeated.map((item,i)=>(
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:14, padding:"0 20px", fontSize:12, fontWeight:500, color:dark?"rgba(240,238,232,0.3)":"rgba(0,0,0,0.3)", textTransform:"uppercase", letterSpacing:"1px" }}>
            <span style={{ width:4, height:4, borderRadius:"50%", background:accent, display:"inline-block", flexShrink:0 }}/>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const FEATURES=[
  {icon:"◈",title:"Real-time analytics",desc:"Charts update the instant you add or edit a transaction. Your data, always live and accurate."},
  {icon:"🔐",title:"Role-based access",desc:"Switch between Viewer (read-only) and Admin (full control) from the sidebar in one click."},
  {icon:"💡",title:"Smart observations",desc:"Six auto-generated insights — top spending category, savings trend, monthly shifts, and more."},
  {icon:"⚡",title:"Instant filtering",desc:"Filter by type, category, and month simultaneously. Search any column, sort by any field."},
];
const STEPS=[
  {n:"01",title:"Open the dashboard",desc:"No signup, no setup. Click once and your financial overview is immediately ready."},
  {n:"02",title:"Log your activity",desc:"Add income and expenses with category, date, and description in just a few seconds."},
  {n:"03",title:"Read your insights",desc:"Smart observations surface automatically from your own transaction patterns."},
];

export default function LandingPage() {
  const navigate=useNavigate();
  const {dark,toggle}=useTheme();
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=()=>navigate("/dashboard");
  const accent=dark?"#6EE7B7":"#059669";
  const bg=dark?"#080B14":"#F8F7F4";
  const card=dark?"#0D1120":"#fff";
  const bdr=dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)";
  const txt=dark?"#F0EEE8":"#111";
  const muted=dark?"rgba(240,238,232,0.45)":"#666";

  return (
    <div style={{ background:bg, color:txt, minHeight:"100vh", overflowX:"hidden", fontFamily:"'DM Sans',sans-serif", transition:"background 0.3s,color 0.3s" }}>
      <GlobalStyles/>

      {/* Nav */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 48px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", background:scrolled?(dark?"rgba(8,11,20,0.88)":"rgba(248,247,244,0.88)"):"transparent", backdropFilter:scrolled?"blur(24px)":"none", borderBottom:scrolled?`0.5px solid ${bdr}`:"none", transition:"all 0.35s ease" }}>
        <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:18, letterSpacing:"-0.5px", color:txt }}>
          Flow<span style={{ color:accent }}>ance</span>
        </span>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          {["Features","How it works","Roles"].map(l=>(
            <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} style={{ color:muted, fontSize:14, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=txt}
              onMouseLeave={e=>e.currentTarget.style.color=muted}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={toggle} style={{ width:38, height:38, borderRadius:10, background:"transparent", border:`0.5px solid ${bdr}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, color:txt }}>{dark?"☀️":"🌙"}</button>
          <button onClick={go} style={{ background:accent, color:dark?"#080B14":"#fff", border:"none", padding:"9px 22px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.opacity="0.88";e.currentTarget.style.transform="translateY(-1px)";}}
            onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="translateY(0)";}}>
            Get started →
          </button>
        </div>
      </nav>

      {/* Hero — reduced bottom padding so ticker sits close */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"100px 24px 32px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        {dark&&<>
          <div style={{ position:"absolute", width:700, height:500, background:"rgba(110,231,183,0.045)", borderRadius:"50%", top:"0%", left:"50%", transform:"translateX(-50%)", filter:"blur(80px)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:400, height:400, background:"rgba(129,140,248,0.035)", borderRadius:"50%", top:"30%", left:"5%", filter:"blur(60px)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:350, height:350, background:"rgba(248,113,113,0.03)", borderRadius:"50%", top:"15%", right:"5%", filter:"blur(60px)", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", width:900, height:900, borderRadius:"50%", border:"0.5px solid rgba(110,231,183,0.06)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"spin-slow 40s linear infinite", pointerEvents:"none" }}/>
        </>}

        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:dark?"rgba(110,231,183,0.08)":"rgba(5,150,105,0.08)", border:`0.5px solid ${dark?"rgba(110,231,183,0.22)":"rgba(5,150,105,0.22)"}`, borderRadius:100, padding:"6px 16px", marginBottom:30, fontSize:12, fontWeight:500, color:accent }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:accent, animation:"pulse-dot 2s ease-in-out infinite" }}/>
          Now in public beta — free forever
        </div>

        <h1 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(34px,5.5vw,64px)", lineHeight:1.06, letterSpacing:"-2.5px", color:txt, marginBottom:18, maxWidth:720 }}>
          Finance tracking that actually <em style={{ color:accent, fontStyle:"italic" }}>feels good</em>
        </h1>

        <p style={{ fontSize:"clamp(15px,1.5vw,17px)", color:muted, lineHeight:1.75, maxWidth:440, marginBottom:32, fontWeight:300 }}>
          Flowance gives you a complete picture of your financial life — spending patterns, income trends, and smart insights in one clean interface.
        </p>

        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={go} style={{ background:accent, color:dark?"#080B14":"#fff", border:"none", padding:"14px 34px", borderRadius:12, fontSize:15, fontWeight:600, cursor:"pointer", transition:"all 0.25s", boxShadow:dark?"0 0 40px rgba(110,231,183,0.2)":"0 6px 24px rgba(5,150,105,0.25)" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=dark?"0 0 60px rgba(110,231,183,0.35)":"0 10px 40px rgba(5,150,105,0.35)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=dark?"0 0 40px rgba(110,231,183,0.2)":"0 6px 24px rgba(5,150,105,0.25)";}}>
            Open dashboard →
          </button>
          <button style={{ background:"transparent", color:muted, border:`0.5px solid ${bdr}`, padding:"14px 34px", borderRadius:12, fontSize:15, cursor:"pointer", transition:"all 0.25s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.2)";e.currentTarget.style.color=txt;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=bdr;e.currentTarget.style.color=muted;e.currentTarget.style.transform="translateY(0)";}}>
            View demo
          </button>
        </div>

        <div style={{ width:"100%", maxWidth:860, marginTop:48, animation:"float 6s ease-in-out infinite", animationDelay:"1.2s" }}>
          <DashboardPreview dark={dark}/>
        </div>
      </section>

      {/* Ticker — flush after hero */}
      <Ticker dark={dark}/>

      {/* Stats — fixed: responsive font size prevents overflow */}
      <section style={{ padding:"60px 24px 80px", width:"100%", boxSizing:"border-box" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, border:`0.5px solid ${bdr}`, borderRadius:24, overflow:"hidden", boxShadow:dark?"0 4px 40px rgba(0,0,0,0.3)":"0 4px 24px rgba(0,0,0,0.07)" }}>
              {[
                {label:"Active users",       target:12000,   suffix:"+",       icon:"👤",  compact:false},
                {label:"Transactions tracked",target:2400000, prefix:"₹",suffix:"+",icon:"📊", compact:true},
                {label:"Platform uptime",     target:99,      suffix:"% uptime",icon:"⚡",  compact:false},
              ].map(({label,target,prefix,suffix,icon,compact},i)=>(
                <div key={label} className="stat-card" style={{ padding:"40px 16px", textAlign:"center", borderRight:i<2?`0.5px solid ${bdr}`:"none", background:card, transition:"transform 0.3s,background 0.3s", position:"relative", overflow:"hidden" }}>
                  {dark&&i===1&&<div style={{ position:"absolute", width:200, height:100, background:"rgba(110,231,183,0.04)", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", filter:"blur(30px)", pointerEvents:"none" }}/>}
                  <div style={{ fontSize:26, marginBottom:12 }}>{icon}</div>
                  {/* Key fix: compact uses smaller clamped font so ₹24,00,000+ never overflows */}
                  <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:compact?"clamp(16px,2vw,28px)":"clamp(24px,3vw,40px)", color:txt, lineHeight:1, marginBottom:8, letterSpacing:"-0.5px" }}>
                    <Counter target={target} prefix={prefix||""}/>
                    <span style={{ color:accent }}>{suffix}</span>
                  </div>
                  <div style={{ fontSize:12, color:muted, letterSpacing:"0.3px" }}>{label}</div>
                  <div style={{ position:"absolute", bottom:0, left:"20%", right:"20%", height:2, background:`linear-gradient(to right,transparent,${accent},transparent)`, opacity:0.35, borderRadius:1 }}/>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding:"0 24px 100px", maxWidth:900, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, color:accent, letterSpacing:"2px", textTransform:"uppercase", marginBottom:14 }}>Features</div>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(26px,4vw,44px)", color:txt, lineHeight:1.1, letterSpacing:"-1.5px", maxWidth:500, margin:"0 auto 14px" }}>
              Everything you need,<br/><span style={{ color:accent }}>nothing you don't</span>
            </h2>
            <p style={{ fontSize:16, color:muted, maxWidth:380, margin:"0 auto", lineHeight:1.7 }}>Built for clarity. Every feature earns its place.</p>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
          {FEATURES.map((f,i)=><FeatureCard key={f.title} {...f} dark={dark} delay={i*0.07}/>)}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding:"0 24px 100px", maxWidth:900, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, color:accent, letterSpacing:"2px", textTransform:"uppercase", marginBottom:14 }}>How it works</div>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(26px,4vw,44px)", color:txt, lineHeight:1.1, letterSpacing:"-1.5px", maxWidth:420, margin:"0 auto" }}>
              Up and running<br/>in under a minute
            </h2>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {STEPS.map(({n,title,desc},i)=>(
            <Reveal key={n} delay={i*0.1}>
              <div className="step-card" style={{ textAlign:"center", padding:"36px 24px", background:card, border:`0.5px solid ${bdr}`, borderRadius:18, position:"relative", overflow:"hidden", cursor:"default" }}>
                <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:72, color:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)", lineHeight:1, position:"absolute", top:8, right:14, userSelect:"none" }}>{n}</div>
                <div className="step-number" style={{ width:48, height:48, borderRadius:14, background:dark?"rgba(110,231,183,0.08)":"rgba(5,150,105,0.08)", border:`0.5px solid ${dark?"rgba(110,231,183,0.2)":"rgba(5,150,105,0.2)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:15, color:accent, margin:"0 auto 22px", transition:"transform 0.3s" }}>{n}</div>
                <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:16, color:txt, marginBottom:10 }}>{title}</div>
                <div style={{ fontSize:14, color:muted, lineHeight:1.68 }}>{desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" style={{ padding:"0 24px 100px", maxWidth:900, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ fontSize:11, fontWeight:600, color:accent, letterSpacing:"2px", textTransform:"uppercase", marginBottom:14 }}>Access control</div>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(26px,4vw,44px)", color:txt, lineHeight:1.1, letterSpacing:"-1.5px", maxWidth:400, margin:"0 auto 14px" }}>
              Two roles,<br/><span style={{ color:accent }}>built right in</span>
            </h2>
            <p style={{ fontSize:16, color:muted, maxWidth:340, margin:"0 auto", lineHeight:1.7 }}>Switch between Viewer and Admin from the sidebar. No login needed.</p>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {[
            {chip:"Viewer",chipBg:dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)",chipColor:muted,title:"Read-only access",isAdmin:false,desc:"Perfect for monitoring. Safe, clean, and focused on understanding your data.",items:[{label:"View all transactions",yes:true},{label:"See charts & insights",yes:true},{label:"Search & filter",yes:true},{label:"Add transactions",yes:false},{label:"Edit or delete",yes:false}]},
            {chip:"Admin",chipBg:accent,chipColor:dark?"#080B14":"#fff",title:"Full control",isAdmin:true,desc:"Add, edit, delete, and export your financial data with no restrictions.",items:[{label:"Everything in Viewer",yes:true},{label:"Add transactions",yes:true},{label:"Edit & delete",yes:true},{label:"Export to CSV",yes:true}]},
          ].map(({chip,chipBg,chipColor,title,desc,items,isAdmin})=>(
            <Reveal key={chip} delay={isAdmin?0.1:0}>
              <div style={{ background:card, border:`0.5px solid ${isAdmin?(dark?"rgba(110,231,183,0.22)":"rgba(5,150,105,0.22)"):bdr}`, borderRadius:18, padding:"32px", height:"100%", position:"relative", overflow:"hidden" }}>
                {isAdmin&&dark&&<div style={{ position:"absolute", width:250, height:150, background:"rgba(110,231,183,0.04)", borderRadius:"50%", top:-30, right:-30, filter:"blur(40px)", pointerEvents:"none" }}/>}
                <div style={{ display:"inline-block", padding:"5px 14px", borderRadius:100, fontSize:12, fontWeight:600, background:chipBg, color:chipColor, marginBottom:20 }}>{chip}</div>
                <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:20, color:txt, marginBottom:10 }}>{title}</div>
                <div style={{ fontSize:14, color:muted, lineHeight:1.65, marginBottom:24 }}>{desc}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {items.map(({label,yes})=>(
                    <div key={label} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:yes?(dark?"rgba(240,238,232,0.75)":"#333"):muted }}>
                      <div style={{ width:22, height:22, borderRadius:7, background:yes?(dark?"rgba(110,231,183,0.12)":"rgba(5,150,105,0.1)"):(dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"), display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, color:yes?accent:muted }}>{yes?"✓":"✕"}</div>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"0 24px 100px", maxWidth:900, margin:"0 auto" }}>
        <Reveal>
          <div style={{ background:card, border:`0.5px solid ${dark?"rgba(110,231,183,0.14)":"rgba(5,150,105,0.14)"}`, borderRadius:28, padding:"80px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            {dark&&<>
              <div style={{ position:"absolute", width:500, height:250, background:"rgba(110,231,183,0.05)", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", filter:"blur(60px)", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", width:200, height:200, background:"rgba(129,140,248,0.04)", borderRadius:"50%", bottom:-40, right:-40, filter:"blur(40px)", pointerEvents:"none" }}/>
            </>}
            <div style={{ fontSize:11, fontWeight:600, color:accent, letterSpacing:"2px", textTransform:"uppercase", marginBottom:18, position:"relative" }}>Get started</div>
            <h2 style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(28px,4vw,48px)", color:txt, letterSpacing:"-1.5px", marginBottom:16, lineHeight:1.08, position:"relative" }}>
              Start tracking today.<br/><span style={{ color:accent }}>No account needed.</span>
            </h2>
            <p style={{ fontSize:16, color:muted, position:"relative", maxWidth:360, margin:"0 auto 44px", lineHeight:1.72 }}>Open it, try it, use it. No setup, no credit card, no friction.</p>
            <button onClick={go} style={{ background:accent, color:dark?"#080B14":"#fff", border:"none", padding:"17px 48px", borderRadius:13, fontSize:16, fontWeight:600, cursor:"pointer", transition:"all 0.25s", position:"relative", boxShadow:dark?"0 0 40px rgba(110,231,183,0.2)":"0 6px 24px rgba(5,150,105,0.25)" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=dark?"0 0 60px rgba(110,231,183,0.35)":"0 10px 40px rgba(5,150,105,0.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=dark?"0 0 40px rgba(110,231,183,0.2)":"0 6px 24px rgba(5,150,105,0.25)";}}>
              Open Flowance →
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`0.5px solid ${bdr}`, padding:"24px 48px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:15, color:dark?"rgba(240,238,232,0.25)":"#bbb" }}>
          Flow<span style={{ color:dark?"rgba(110,231,183,0.4)":"rgba(5,150,105,0.45)" }}>ance</span>
        </span>
        <span style={{ fontSize:12, color:dark?"rgba(240,238,232,0.2)":"#bbb" }}>© 2025 Flowance · Built for internship evaluation</span>
      </footer>
    </div>
  );
}