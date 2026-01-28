import React, { useState, useEffect, useRef } from 'react';

// Data & Secrets
const consoleWisdom = [
  "∆ — 'The only way to learn mathematics is to do mathematics.' — Halmos",
  "∅ — 'In mathematics, you don't understand things. You just get used to them.' — von Neumann",
  "π — 'Pure mathematics is the poetry of logical ideas.' — Einstein",
  "", "You found the console. The curious are always rewarded.",
  "Hint: Click ∆XI∅M■ symbols in order.", "Hint: π seconds of patience on ■ reveals secrets.",
];

const foundersNote = `╔════════════════════════════════════════════════════╗
║  To whoever found this through the coordinates:    ║
║                                                    ║
║  Axiom was born in a small room in Kigali,         ║
║  fueled by coffee and the stubborn belief that     ║
║  barriers between disciplines are illusions.       ║
║                                                    ║
║  Coordinates -1.9403, 29.8739 mark where I first   ║
║  wrote "First Principles. Final Proofs."           ║
║                                                    ║
║  Welcome, Seeker. — The Founder                    ║
╚════════════════════════════════════════════════════╝`;

const axiomZeroText = `AXIOM ZERO
═══════════════════

"The limits of understanding are not fixed.
 Every boundary is an invitation."

This is Axiom Zero—the axiom before axioms.
You found this because you refused to accept
that some doors have no keys.

∆ + X + I + ∅ + M + ■ = ∞`;

const godelMessage = `THIS PAGE CANNOT BE ACCESSED
...or can it?

Gödel proved that within any consistent system,
there exist statements that cannot be proven.

This page exists. You are reading it.
Yet it claims inaccessibility.

The contradiction IS the content.
Welcome to the space between true and provable.`;

const testQuestions = [
  { q: "A system exhibits behavior E across perturbations P₁, P₂, P₃. What proves E is a true invariant?", opts: ["Mathematical form of E", "A perturbation that destroys E", "Initial conditions", "All perturbations"], correct: 1, exp: "An invariant is defined by what breaks it, not just what preserves it." },
  { q: "Function g matches expensive function f on all tested inputs but runs in O(log n). The correct stance?", opts: ["g equals f", "g approximates f", "g may diverge on untested inputs", "g is superior"], correct: 2, exp: "Empirical equivalence doesn't guarantee domain equivalence." },
  { q: "Biology, economics, thermodynamics all describe equilibrium-seeking. This suggests?", opts: ["Fields should merge", "Equilibrium is universal", "Deeper structural principle exists", "Coincidence"], correct: 2, exp: "Convergent patterns suggest underlying mathematical structure." },
  { q: "Neural net: 99.9% accuracy, no explainability. Symbolic: 95%, full explainability. For medical diagnosis?", opts: ["Neural—accuracy saves lives", "Symbolic—accountability needs understanding", "Hybrid approach", "Depends on failure modes"], correct: 3, exp: "Failure modes matter more than averages in medicine." },
  { q: "3 months into a theory, new data contradicts your central assumption. Response?", opts: ["Defend with alternative explanations", "Abandon entirely", "Publish negative and pivot", "Examine if data challenges assumption or interpretation"], correct: 3, exp: "Often contradictions reveal flawed interpretation, not theory." }
];

const members = [
  { id: 'founder', name: 'The Founder', role: 'Founding Director', division: 'Collegium Infinitatis', tier: 'Council', isFounder: true, image: '◒', location: 'Kigali, Rwanda', bio: 'Founded Axiom while pursuing doctoral research. Driven by conviction that boundaries between disciplines are illusions.', research: ['Formal Verification', 'Type Theory', 'Machine Reasoning'], quote: '"Nothing can stop a mind determined to understand."' },
  { id: 'kai', name: 'Kai Tanaka', role: 'Lead Systems Architect', division: 'Machinatores', tier: 'Core', image: '👤', location: 'Tokyo, Japan', bio: 'Decade of experience in distributed systems and robotics.', research: ['Distributed Systems', 'Robotics', 'Embedded AI'] },
  { id: 'elena', name: 'Elena Vasquez', role: 'Research Scientist', division: 'Navigatores', tier: 'Core', image: '👤', location: 'Medellín, Colombia', bio: 'Specializes in computational environmental modeling.', research: ['Environmental Modeling', 'Sensor Networks', 'Climate Science'] },
  { id: 'marcus', name: 'Marcus Adebayo', role: 'Research Engineer', division: 'Machinatores', tier: 'Core', image: '👤', location: 'Kigali, Rwanda', bio: 'Systems engineer specializing in low-power computing.', research: ['Edge Computing', 'Hardware Design', 'IoT'] },
  { id: 'sophia', name: 'Dr. Sophia Müller', role: 'Visiting Researcher', division: 'Collegium Infinitatis', tier: 'Core', image: '👤', location: 'Berlin, Germany', bio: 'Mathematical logician on sabbatical from Humboldt University.', research: ['Type Theory', 'Category Theory', 'Proof Assistants'] },
];

const publications = [
  { id: 1, title: 'Toward Verified Neural Architectures', authors: ['The Founder', 'Sophia Müller'], venue: 'ICML 2024', year: 2024, type: 'Conference', tags: ['Verification', 'Neural Networks'] },
  { id: 2, title: 'Real-Time Verification for Autonomous Systems', authors: ['Kai Tanaka'], venue: 'ICRA 2024', year: 2024, type: 'Conference', tags: ['Robotics', 'Verification'] },
  { id: 3, title: 'Invariant-Centric Modeling of Adaptive Systems', authors: ['The Founder'], venue: 'JAIR', year: 2024, type: 'Journal', tags: ['Formal Methods'] },
  { id: 4, title: 'Self-Organizing Sensor Networks for Tropical Ecosystems', authors: ['Elena Vasquez'], venue: 'Environmental Modelling', year: 2023, type: 'Journal', tags: ['Environmental Science'] },
];

const projects = [
  { id: 'chiral', name: 'Project Chiral Dynamics', status: 'Active', division: 'Collegium Infinitatis', desc: 'Formalizing fundamental invariants of complex adaptive systems.', leads: ['The Founder', 'Sophia Müller'] },
  { id: 'veridian', name: 'Project Veridian Protocol', status: 'Active', division: 'Machinatores', desc: 'Mathematically verifiable Machine Reasoning systems.', leads: ['Kai Tanaka', 'Marcus Adebayo'] },
  { id: 'tellurian', name: 'Project Tellurian Weave', status: 'Active', division: 'Navigatores', desc: 'Resilient sensing networks for constrained environments.', leads: ['Elena Vasquez', 'Marcus Adebayo'] },
];

const news = [
  { date: 'Dec 15, 2024', cat: 'Publication', title: 'Paper Accepted at ICML 2024', sum: 'Type-theoretic verification framework accepted.', featured: true },
  { date: 'Nov 28, 2024', cat: 'Community', title: 'Applications Open for 2025', sum: 'The Aperture is now open.', featured: true },
  { date: 'Nov 10, 2024', cat: 'Deployment', title: 'Tellurian Weave Expands', sum: 'Second pilot site operational.', featured: false },
];

const occultumSeekers = [
  { name: 'Seeker Ω-1', contribution: 'First to solve the Axiom Test', year: 2024 },
  { name: 'Seeker Ω-2', contribution: 'Found all Cartographer symbols', year: 2024 },
];

// Main App
export default function AxiomWebsite() {
  const [page, setPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pubFilter, setPubFilter] = useState('all');
  
  // Easter eggs
  const [logoSeq, setLogoSeq] = useState([]);
  const [squareTime, setSquareTime] = useState(0);
  const [squareUnlocked, setSquareUnlocked] = useState(false);
  const [coordBuffer, setCoordBuffer] = useState('');
  const [showFounder, setShowFounder] = useState(false);
  const [showAxiomZero, setShowAxiomZero] = useState(false);
  const [cartSymbols, setCartSymbols] = useState([]);
  const [userPath, setUserPath] = useState([]);
  const [testScore, setTestScore] = useState(null);
  const squareRef = useRef(null);

  // Console wisdom
  useEffect(() => {
    console.clear();
    console.log('%c∆XI∅M■', 'font-size:48px;color:#c9a227;font-weight:bold');
    console.log('%cOrdo Infinitatis', 'color:#e8e6e1;font-style:italic');
    consoleWisdom.forEach((w,i) => setTimeout(() => w && console.log('%c'+w, 'color:#e8e6e1'), i*500));
  }, []);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { window.scrollTo(0,0); }, [page]);
  useEffect(() => { setUserPath(p => [...p, {page, time: Date.now()}]); }, [page]);

  // Coordinates easter egg
  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const buf = (coordBuffer + e.key).slice(-15);
      setCoordBuffer(buf);
      if (['19403','298739'].some(c => buf.includes(c))) {
        setShowFounder(true);
        console.log('%c🌍 Coordinates recognized!', 'color:#c9a227');
      }
    };
    window.addEventListener('keypress', h);
    return () => window.removeEventListener('keypress', h);
  }, [coordBuffer]);

  const handleLogoClick = (sym) => {
    const correct = ['∆','X','I','∅','M','■'];
    const newSeq = [...logoSeq, sym];
    if (correct[logoSeq.length] === sym) {
      setLogoSeq(newSeq);
      if (newSeq.length === 6) { setShowAxiomZero(true); console.log('%c✧ Axiom Zero revealed!', 'color:#c9a227'); }
    } else setLogoSeq([]);
  };

  const handleSquareEnter = () => {
    squareRef.current = setInterval(() => {
      setSquareTime(t => {
        if (t + 0.1 >= 3.14 && !squareUnlocked) {
          setSquareUnlocked(true);
          console.log('%c■ π seconds. Occultum unlocked.', 'color:#c9a227');
        }
        return t + 0.1;
      });
    }, 100);
  };

  const handleSquareLeave = () => {
    clearInterval(squareRef.current);
    if (!squareUnlocked) setSquareTime(0);
  };

  const discoverSymbol = (loc) => {
    if (!cartSymbols.includes(loc)) {
      setCartSymbols(p => [...p, loc]);
      console.log(`%c◈ Symbol: ${loc}. ${4-cartSymbols.length} remain.`, 'color:#c9a227');
    }
  };

  const nav = (p) => { setPage(p); setMenuOpen(false); setSelectedMember(null); setSelectedProject(null); };

  const navLinks = ['home','about','people','research','projects','publications','news','join'];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e8e6e1]" style={{fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400&display=swap');
        .font-display{font-family:'Cormorant Garamond',serif}
        .font-mono{font-family:'JetBrains Mono',monospace}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px) rotate(3deg)}}
        @keyframes grid{0%{background-position:0 0}100%{background-position:60px 60px}}
        @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(201,162,39,0.3)}50%{box-shadow:0 0 20px 5px rgba(201,162,39,0.1)}}
        .anim-fade{animation:fadeUp .6s ease-out forwards}
        .anim-d1{animation-delay:.1s;opacity:0}.anim-d2{animation-delay:.2s;opacity:0}.anim-d3{animation-delay:.3s;opacity:0}.anim-d4{animation-delay:.4s;opacity:0}
        .grid-bg{background-image:linear-gradient(rgba(201,162,39,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,162,39,.03) 1px,transparent 1px);background-size:60px 60px;animation:grid 20s linear infinite}
        .gold-grad{background:linear-gradient(135deg,#c9a227,#f4d35e,#c9a227);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .card:hover{transform:translateY(-4px);box-shadow:0 15px 30px rgba(201,162,39,.1)}
        .card{transition:all .3s}
        .float{animation:float 6s ease-in-out infinite}
        .float-d{animation:float 6s ease-in-out infinite;animation-delay:-3s}
        .founder-glow{animation:glow 3s ease-in-out infinite}
        .inv-text{color:transparent}.inv-text::selection{color:#c9a227;background:rgba(201,162,39,.3)}
        .cart-sym{opacity:.1;font-size:10px;cursor:pointer;transition:opacity .3s}.cart-sym:hover{opacity:1}
        .logo-s{cursor:pointer;transition:all .2s}.logo-s:hover{filter:brightness(1.3)}.logo-s:active{transform:scale(.95)}
        *{scrollbar-width:thin;scrollbar-color:#c9a227 #0a0a0f}
      `}</style>

      {/* Modals */}
      {showFounder && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setShowFounder(false)}>
          <div className="bg-[#0a0a0f] border border-[#c9a227] p-6 max-w-lg anim-fade" onClick={e => e.stopPropagation()}>
            <pre className="font-mono text-[#c9a227] text-xs whitespace-pre-wrap">{foundersNote}</pre>
            <button onClick={() => setShowFounder(false)} className="mt-4 text-sm text-[#e8e6e1]/60 hover:text-[#c9a227]">Close</button>
          </div>
        </div>
      )}

      {showAxiomZero && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={() => setShowAxiomZero(false)}>
          <div className="bg-[#0a0a0f] border border-[#c9a227] p-6 max-w-lg anim-fade" onClick={e => e.stopPropagation()}>
            <pre className="font-mono text-[#e8e6e1] text-sm whitespace-pre-wrap">{axiomZeroText}</pre>
            <button onClick={() => setShowAxiomZero(false)} className="mt-4 text-sm text-[#c9a227]">I carry it with me →</button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrollY > 50 || page !== 'home' ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#c9a227]/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => nav('home')} className="flex items-center">
            <span className="text-2xl font-bold flex">
              <span className="logo-s text-[#c9a227]" onClick={e => {e.stopPropagation();handleLogoClick('∆')}}>∆</span>
              <span className="logo-s" onClick={e => {e.stopPropagation();handleLogoClick('X')}}>X</span>
              <span className="logo-s text-[#c9a227]" onClick={e => {e.stopPropagation();handleLogoClick('I')}}>I</span>
              <span className="logo-s" onClick={e => {e.stopPropagation();handleLogoClick('∅')}}>∅</span>
              <span className="logo-s text-[#c9a227]" onClick={e => {e.stopPropagation();handleLogoClick('M')}}>M</span>
              <span className={`logo-s text-lg ${squareUnlocked ? 'text-[#c9a227]' : ''}`}
                onClick={e => {e.stopPropagation();handleLogoClick('■');if(squareUnlocked)nav('occultum')}}
                onMouseEnter={handleSquareEnter} onMouseLeave={handleSquareLeave}>■</span>
            </span>
            {logoSeq.length > 0 && logoSeq.length < 6 && <span className="text-xs text-[#c9a227]/50 ml-2">{logoSeq.length}/6</span>}
          </button>
          <div className="hidden lg:flex gap-6">
            {navLinks.map(l => (
              <button key={l} onClick={() => nav(l)} className={`text-xs tracking-widest uppercase ${page === l ? 'text-[#c9a227]' : 'text-[#e8e6e1]/60 hover:text-[#c9a227]'}`}>{l}</button>
            ))}
          </div>
          <button className="lg:hidden flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`w-6 h-0.5 bg-[#c9a227] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
            <span className={`w-6 h-0.5 bg-[#c9a227] transition-all ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`w-6 h-0.5 bg-[#c9a227] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#0a0a0f]/98 border-b border-[#c9a227]/10 px-6 py-8 flex flex-col gap-4">
            {navLinks.map(l => <button key={l} onClick={() => nav(l)} className="text-left text-lg">{l}</button>)}
          </div>
        )}
      </nav>

      {/* Pages */}
      {page === 'home' && <HomePage nav={nav} discoverSymbol={discoverSymbol} />}
      {page === 'about' && <AboutPage discoverSymbol={discoverSymbol} />}
      {page === 'people' && <PeoplePage members={members} selected={selectedMember} setSelected={setSelectedMember} discoverSymbol={discoverSymbol} />}
      {page === 'research' && <ResearchPage nav={nav} discoverSymbol={discoverSymbol} />}
      {page === 'projects' && <ProjectsPage projects={projects} selected={selectedProject} setSelected={setSelectedProject} discoverSymbol={discoverSymbol} />}
      {page === 'publications' && <PublicationsPage pubs={publications} filter={pubFilter} setFilter={setPubFilter} />}
      {page === 'news' && <NewsPage news={news} />}
      {page === 'join' && <JoinPage />}
      {page === 'occultum' && <OccultumPage seekers={occultumSeekers} nav={nav} />}
      {page === 'godel' && <GodelPage nav={nav} />}
      {page === 'mirror' && <MirrorPage path={userPath} nav={nav} />}
      {page === 'axiom-test' && <TestPage questions={testQuestions} setScore={setTestScore} nav={nav} />}
      {page === '404' && <PuzzlePage nav={nav} />}

      {/* Cartographer progress */}
      {cartSymbols.length > 0 && cartSymbols.length < 5 && (
        <div className="fixed bottom-4 right-4 bg-[#0a0a0f]/90 border border-[#c9a227]/30 p-3 text-xs font-mono z-40">
          <span className="text-[#c9a227]">◈</span> {cartSymbols.length}/5
        </div>
      )}
      {cartSymbols.length >= 5 && (
        <div className="fixed bottom-4 right-4 bg-[#0a0a0f]/90 border border-[#c9a227] p-4 text-xs font-mono z-40 max-w-xs">
          <span className="text-[#c9a227] block mb-2">◈ Path Complete</span>
          -1.9577° S, 30.0619° E — Kimihurura, Kigali
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 border-t border-[#c9a227]/10 relative">
        <span className="absolute bottom-2 left-2 text-[6px] text-[#0a0a0f] hover:text-[#c9a227]/30 cursor-pointer" onClick={() => nav('godel')}>⊥</span>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold mb-2"><span className="text-[#c9a227]">∆</span>X<span className="text-[#c9a227]">I</span>∅<span className="text-[#c9a227]">M</span>■</div>
              <p className="font-mono text-sm text-[#e8e6e1]/40">First Principles. Final Proofs.</p>
              <p className="inv-text text-xs mt-2">The zeroth axiom: understanding has no ceiling</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#e8e6e1]/40 text-sm">Founded in Kigali</p>
              <button onClick={() => nav('mirror')} className="text-[8px] text-[#e8e6e1]/10 hover:text-[#c9a227]/30 mt-2">who watches?</button>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#c9a227]/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#e8e6e1]/30">© 2025 Axiom</p>
            <div className="flex gap-6">
              <button className="text-xs text-[#e8e6e1]/40 hover:text-[#c9a227]">GitHub</button>
              <button className="text-xs text-[#e8e6e1]/40 hover:text-[#c9a227]">Contact</button>
              <button onClick={() => nav('404')} className="text-xs text-[#e8e6e1]/10 hover:text-[#e8e6e1]/30">404</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Page Components
function HomePage({ nav, discoverSymbol }) {
  return (
    <>
      <section className="min-h-screen relative flex items-center justify-center grid-bg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-8xl text-[#c9a227]/5 font-display float">∆</div>
          <div className="absolute top-40 right-20 text-7xl text-[#c9a227]/5 font-display float-d">∅</div>
          <div className="absolute bottom-40 left-1/4 text-9xl text-[#c9a227]/5 font-display float">∞</div>
          <span className="cart-sym absolute bottom-10 left-10" onClick={() => discoverSymbol('home')}>≋</span>
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="font-mono text-[#c9a227]/80 tracking-[0.3em] text-sm mb-8 anim-fade anim-d1">ORDO INFINITATIS</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-semibold mb-6 anim-fade anim-d2">
            <span className="gold-grad">∆</span>X<span className="gold-grad">I</span>∅<span className="gold-grad">M</span><span className="text-5xl md:text-7xl align-middle">■</span>
          </h1>
          <p className="font-display text-2xl md:text-3xl text-[#e8e6e1]/90 mb-8 anim-fade anim-d3 italic">A Call to Unbounded Inquiry</p>
          <p className="text-lg text-[#e8e6e1]/60 max-w-2xl mx-auto mb-12 anim-fade anim-d4">
            A research collective starting from first principles, ending with things that work.
            <span className="inv-text"> Type the coordinates of origin.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade anim-d4">
            <button onClick={() => nav('about')} className="px-8 py-4 bg-[#c9a227] text-[#0a0a0f] font-medium tracking-widest uppercase text-sm hover:bg-[#f4d35e]">Explore Vision</button>
            <button onClick={() => nav('join')} className="px-8 py-4 border border-[#e8e6e1]/30 tracking-widest uppercase text-sm hover:border-[#c9a227] hover:text-[#c9a227]">Join Axiom</button>
          </div>
        </div>
      </section>
      <section className="py-24 bg-[#08080c]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-display text-3xl">Latest News</h2>
            <button onClick={() => nav('news')} className="text-sm text-[#c9a227] hover:underline">View all →</button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {news.filter(n => n.featured).map((n, i) => (
              <div key={i} className="bg-[#0a0a0f] border border-[#c9a227]/10 p-8 card">
                <span className="text-xs font-mono text-[#c9a227]/60">{n.date}</span>
                <span className="mx-2 text-[#c9a227]/30">•</span>
                <span className="text-xs tracking-widest uppercase text-[#c9a227]">{n.cat}</span>
                <h3 className="font-display text-2xl mt-4 mb-3">{n.title}</h3>
                <p className="text-[#e8e6e1]/60">{n.sum}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-display text-3xl">Research Areas</h2>
            <button onClick={() => nav('research')} className="text-sm text-[#c9a227] hover:underline">Learn more →</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[{icon:'∿',title:'Foundations',desc:'Pure mathematics, logic, computation'},
              {icon:'⊛',title:'Machine Reasoning',desc:'Verified AI and formal methods'},
              {icon:'◈',title:'Applied Systems',desc:'Climate, sensing, public health'}].map((a, i) => (
              <div key={i} className="bg-[#0f0f18] border border-[#c9a227]/10 p-8 card text-center">
                <div className="text-4xl text-[#c9a227] mb-4">{a.icon}</div>
                <h3 className="font-display text-xl mb-3">{a.title}</h3>
                <p className="text-sm text-[#e8e6e1]/50">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ discoverSymbol }) {
  return (
    <div className="pt-24">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">ABOUT</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-8">Our Vision</h1>
          <p className="text-xl text-[#e8e6e1]/70 mb-6">For too long, knowledge has been confined by artificial boundaries. Axiom rejects these limitations.</p>
          <p className="text-xl font-display italic text-[#c9a227]">We treat the universe as mathematical structure.</p>
          
          <div className="mt-16 p-8 bg-[#0f0f18] border-l-4 border-[#c9a227] relative">
            <span className="cart-sym absolute top-2 right-2" onClick={() => discoverSymbol('about')}>◬</span>
            <h2 className="font-display text-2xl gold-grad mb-4">Genesis</h2>
            <p className="text-[#e8e6e1]/70 mb-4">Axiom was born in 2024 in Kigali, Rwanda. A PhD student wrote a manifesto: <em>boundaries between disciplines are illusions</em>.</p>
            <p className="text-[#e8e6e1]/60 text-sm italic">Coordinates -1.9403, 29.8739 mark where "First Principles. Final Proofs." was first written.</p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {[{icon:'∞',title:'Foundational Understanding',desc:'Deep theory—computation, invariants, consciousness.'},
              {icon:'⚙',title:'Translation into Action',desc:'Climate resilience, resource efficiency, public health.'}].map((p,i) => (
              <div key={i} className="bg-[#0f0f18] border border-[#c9a227]/10 p-8">
                <div className="w-12 h-12 border border-[#c9a227] flex items-center justify-center mb-6"><span className="text-2xl text-[#c9a227]">{p.icon}</span></div>
                <h3 className="font-display text-2xl mb-4 gold-grad">{p.title}</h3>
                <p className="text-[#e8e6e1]/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-[#08080c]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-4xl mb-12 text-center">Our Approach: ∆XI∅M■</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[{s:'∆',n:'Delta',d:'Begin from axioms'},{s:'X',n:'Intersection',d:'Where fields meet'},{s:'I',n:'Rigor',d:'Logical integrity'},{s:'∅',n:'Abstraction',d:'Clean concepts'},{s:'M■',n:'Final Proofs',d:'Outcomes that stand'}].map((x,i) => (
              <div key={i} className="bg-[#0a0a0f] border border-[#c9a227]/10 p-6 text-center card">
                <div className="text-4xl font-display text-[#c9a227] mb-3">{x.s}</div>
                <h3 className="text-sm font-medium mb-1">{x.n}</h3>
                <p className="text-xs text-[#e8e6e1]/50">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-4xl mb-12 text-center">Operational Divisions</h2>
          <div className="space-y-6">
            {[{latin:'Collegium Infinitatis',icon:'∿',phase:'Pure Thought',desc:'Foundational frameworks in mathematics, logic, computation.'},
              {latin:'Machinatores',icon:'⊛',phase:'Engineering',desc:'Robust Machine Reasoning systems and prototypes.'},
              {latin:'Navigatores',icon:'◈',phase:'New Frontiers',desc:'System-level challenges in sustainability and health.'}].map((d,i) => (
              <div key={i} className="bg-[#0f0f18] border border-[#c9a227]/10 p-8 flex flex-col md:flex-row gap-6 items-start card">
                <div className="w-16 h-16 border border-[#c9a227] flex items-center justify-center flex-shrink-0"><span className="text-3xl text-[#c9a227]">{d.icon}</span></div>
                <div>
                  <h3 className="font-display text-2xl gold-grad">{d.latin}</h3>
                  <span className="inline-block px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs tracking-widest uppercase mt-2 mb-3">{d.phase}</span>
                  <p className="text-[#e8e6e1]/60">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#e8e6e1]/20 text-xs mt-8 inv-text">Some say there is a fourth division, hidden. The ■ knows the way.</p>
        </div>
      </section>
    </div>
  );
}

function PeoplePage({ members, selected, setSelected, discoverSymbol }) {
  if (selected) {
    const m = members.find(x => x.id === selected);
    return (
      <div className="pt-24">
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <button onClick={() => setSelected(null)} className="text-sm text-[#c9a227] hover:underline mb-8">← Back</button>
            <div className={`flex flex-col md:flex-row gap-8 mb-12 ${m.isFounder ? 'p-6 border border-[#c9a227]/30 founder-glow' : ''}`}>
              <div className={`w-32 h-32 bg-[#0f0f18] border ${m.isFounder ? 'border-[#c9a227]' : 'border-[#c9a227]/20'} flex items-center justify-center text-6xl relative`}>
                {m.image}
                {m.isFounder && <span className="absolute -top-2 -right-2 text-[#c9a227]">∆</span>}
              </div>
              <div>
                <h1 className="font-display text-4xl mb-2">{m.name}</h1>
                <p className="text-[#c9a227] mb-2">{m.role}</p>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs">{m.division}</span>
                  <span className="px-2 py-1 bg-[#e8e6e1]/10 text-[#e8e6e1]/60 text-xs">{m.tier}</span>
                </div>
                <p className="text-sm text-[#e8e6e1]/50 font-mono">{m.location}</p>
                {m.quote && <p className="text-[#c9a227]/80 italic mt-4 font-display text-lg">{m.quote}</p>}
              </div>
            </div>
            <div className="space-y-8">
              <div><h2 className="font-display text-2xl mb-4 gold-grad">Biography</h2><p className="text-[#e8e6e1]/70">{m.bio}</p></div>
              <div><h2 className="font-display text-2xl mb-4 gold-grad">Research</h2><div className="flex flex-wrap gap-2">{m.research.map((r,i) => <span key={i} className="px-3 py-1 border border-[#c9a227]/30 text-sm text-[#e8e6e1]/70">{r}</span>)}</div></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  const sorted = [...members].sort((a,b) => a.isFounder ? -1 : b.isFounder ? 1 : 0);
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 relative">
          <span className="cart-sym absolute top-0 right-6" onClick={() => discoverSymbol('people')}>⧗</span>
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">TEAM</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-12">People</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)} className={`bg-[#0f0f18] border p-6 text-left card relative ${m.isFounder ? 'border-[#c9a227]/50 founder-glow' : 'border-[#c9a227]/10'}`}>
                {m.isFounder && <span className="absolute top-3 right-3 text-[#c9a227]">∆</span>}
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-[#0a0a0f] border flex items-center justify-center text-3xl ${m.isFounder ? 'border-[#c9a227]' : 'border-[#c9a227]/20'}`}>{m.image}</div>
                  <div>
                    <h3 className="font-display text-xl mb-1">{m.name}</h3>
                    <p className="text-sm text-[#c9a227]">{m.role}</p>
                    <p className="text-xs text-[#e8e6e1]/50 font-mono">{m.location}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ResearchPage({ nav, discoverSymbol }) {
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 relative">
          <span className="cart-sym absolute top-0 right-6" onClick={() => discoverSymbol('research')}>⌘</span>
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">FOCUS AREAS</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-12">Research</h1>
          <div className="space-y-12">
            {[{icon:'∿',title:'Foundations',topics:['Type Theory','Category Theory','Complexity','Logic']},
              {icon:'⊛',title:'Machine Reasoning',topics:['Neural Verification','AI Safety','Runtime Verification']},
              {icon:'◈',title:'Applied Systems',topics:['Environmental Sensing','Climate Modeling','Edge Computing']}].map((a,i) => (
              <div key={i} className="grid md:grid-cols-3 gap-8">
                <div><div className="w-16 h-16 border border-[#c9a227] flex items-center justify-center mb-4"><span className="text-3xl text-[#c9a227]">{a.icon}</span></div><h2 className="font-display text-3xl gold-grad">{a.title}</h2></div>
                <div className="md:col-span-2 space-y-3">{a.topics.map((t,j) => <div key={j} className="bg-[#0f0f18] border border-[#c9a227]/10 p-4 card">{t}</div>)}</div>
              </div>
            ))}
          </div>
          <div className="mt-16 p-8 bg-[#0f0f18] border border-[#c9a227]/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div><h3 className="font-display text-2xl mb-2">Explore Publications</h3><p className="text-[#e8e6e1]/60">Papers and preprints from Axiom.</p></div>
            <button onClick={() => nav('publications')} className="px-6 py-3 bg-[#c9a227] text-[#0a0a0f] tracking-widest uppercase text-sm">View →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectsPage({ projects, selected, setSelected, discoverSymbol }) {
  if (selected) {
    const p = projects.find(x => x.id === selected);
    return (
      <div className="pt-24">
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <button onClick={() => setSelected(null)} className="text-sm text-[#c9a227] hover:underline mb-8">← Back</button>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400">{p.status}</span>
              <span className="px-3 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs">{p.division}</span>
            </div>
            <h1 className="font-display text-4xl mb-4">{p.name}</h1>
            <p className="text-xl text-[#e8e6e1]/70 mb-4">{p.desc}</p>
            <p className="text-sm text-[#e8e6e1]/50">Leads: {p.leads.join(', ')}</p>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 relative">
          <span className="cart-sym absolute top-0 right-6" onClick={() => discoverSymbol('projects')}>✧</span>
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">INITIATIVES</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-12">Projects</h1>
          <div className="space-y-8">
            {projects.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} className="w-full bg-[#0f0f18] border border-[#c9a227]/10 p-8 text-left card">
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4"><span className="px-2 py-1 text-xs bg-green-500/20 text-green-400">{p.status}</span><span className="px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs">{p.division}</span></div>
                    <h2 className="font-display text-3xl mb-4">{p.name}</h2>
                    <p className="text-[#e8e6e1]/60">{p.desc}</p>
                  </div>
                  <span className="text-[#c9a227] text-2xl">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PublicationsPage({ pubs, filter, setFilter }) {
  const types = ['all', ...new Set(pubs.map(p => p.type))];
  const filtered = filter === 'all' ? pubs : pubs.filter(p => p.type === filter);
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">PAPERS</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-8">Publications</h1>
          <div className="flex flex-wrap gap-2 mb-12">{types.map(t => <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 text-xs tracking-widest uppercase ${filter === t ? 'bg-[#c9a227] text-[#0a0a0f]' : 'border border-[#c9a227]/30 text-[#e8e6e1]/60'}`}>{t}</button>)}</div>
          <div className="space-y-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-[#0f0f18] border border-[#c9a227]/10 p-6 card">
                <div className="flex items-center gap-3 mb-3"><span className="font-mono text-sm text-[#c9a227]">{p.year}</span><span className="px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs">{p.type}</span></div>
                <h3 className="font-display text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-[#e8e6e1]/50 mb-2">{p.authors.join(', ')}</p>
                <p className="text-sm text-[#e8e6e1]/40 font-mono">{p.venue}</p>
                <div className="flex flex-wrap gap-2 mt-4">{p.tags.map((t,i) => <span key={i} className="px-2 py-1 border border-[#c9a227]/20 text-xs text-[#e8e6e1]/50">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function NewsPage({ news }) {
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">UPDATES</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-12">News</h1>
          <div className="space-y-8">
            {news.map((n,i) => (
              <div key={i} className="bg-[#0f0f18] border border-[#c9a227]/10 p-8 card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-mono text-[#e8e6e1]/40">{n.date}</span>
                  <span className="px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs">{n.cat}</span>
                </div>
                <h2 className="font-display text-2xl mb-3">{n.title}</h2>
                <p className="text-[#e8e6e1]/60">{n.sum}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function JoinPage() {
  return (
    <div className="pt-24">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <span className="font-mono text-[#c9a227] tracking-[0.3em] text-sm">APPLY</span>
          <h1 className="font-display text-5xl md:text-6xl mt-4 mb-8">The Axiom Protocol</h1>
          <div className="space-y-8">
            {[{n:'01',name:'The Aperture',sub:'Initial Application',desc:'Submit your work and answer the foundational question.'},
              {n:'02',name:'The Crucible',sub:'Synthesis Challenge',desc:'Three concepts. One micro-project proposal.'},
              {n:'03',name:'The Dialogue',sub:'Conversation',desc:'30-minute collaborative discussion.'},
              {n:'04',name:'The Micro-Project',sub:'Proof of Work',desc:'6-week project with mentor.'}].map((s,i) => (
              <div key={i} className="bg-[#0f0f18] border border-[#c9a227]/10 p-8 card">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 border border-[#c9a227] flex items-center justify-center"><span className="font-mono text-[#c9a227]">{s.n}</span></div>
                  <div><h3 className="font-display text-2xl gold-grad">{s.name}</h3><span className="text-sm text-[#e8e6e1]/40 italic">{s.sub}</span><p className="text-[#e8e6e1]/70 mt-4">{s.desc}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <button className="px-12 py-5 bg-[#c9a227] text-[#0a0a0f] font-medium tracking-widest uppercase text-sm hover:bg-[#f4d35e]">Begin Application →</button>
          </div>
          <div className="mt-16 p-8 border border-[#c9a227]/20 bg-[#c9a227]/5">
            <h3 className="font-display text-xl mb-4">The Aperture Question</h3>
            <p className="text-[#e8e6e1]/60 italic">"What is a foundational assumption in your field that you believe is flawed or incomplete, and why?"</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Secret Pages
function OccultumPage({ seekers, nav }) {
  return (
    <div className="pt-24 min-h-screen">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12 anim-fade">
            <span className="text-6xl text-[#c9a227]">■</span>
            <h1 className="font-display text-5xl mt-4 mb-4 gold-grad">Occultum</h1>
            <p className="font-mono text-[#c9a227]/60 text-sm">THE HIDDEN • THE FOURTH DIVISION</p>
          </div>
          <div className="bg-[#0f0f18] border border-[#c9a227]/30 p-8 mb-12 text-left">
            <p className="text-[#e8e6e1]/70">You found the hidden path. The Occultum recognizes those who demonstrate curiosity, persistence, and pattern recognition.</p>
          </div>
          <h2 className="font-display text-2xl mb-6 gold-grad">Wall of Seekers</h2>
          <div className="space-y-4">
            {seekers.map((s,i) => <div key={i} className="bg-[#0a0a0f] border border-[#c9a227]/10 p-4 flex justify-between"><div><span className="font-mono text-[#c9a227]">{s.name}</span><p className="text-sm text-[#e8e6e1]/50">{s.contribution}</p></div><span className="text-xs text-[#e8e6e1]/30">{s.year}</span></div>)}
            <div className="bg-[#0a0a0f] border border-dashed border-[#c9a227]/30 p-4"><span className="text-[#c9a227]/50 font-mono">Your name here?</span></div>
          </div>
          <button onClick={() => nav('home')} className="mt-12 text-sm text-[#c9a227] hover:underline">Return →</button>
        </div>
      </section>
    </div>
  );
}

function GodelPage({ nav }) {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center anim-fade">
        <pre className="font-mono text-[#c9a227] text-xs md:text-sm whitespace-pre-wrap text-left bg-[#0a0a0f] p-6 border border-[#c9a227]/30">{godelMessage}</pre>
        <button onClick={() => nav('home')} className="mt-8 text-sm text-[#c9a227] hover:underline">Exit the paradox →</button>
      </div>
    </div>
  );
}

function MirrorPage({ path, nav }) {
  const visits = path.reduce((a,p) => {a[p.page]=(a[p.page]||0)+1;return a;}, {});
  const top = Object.entries(visits).sort((a,b) => b[1]-a[1])[0];
  return (
    <div className="pt-24 min-h-screen">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12 anim-fade">
            <span className="text-6xl">🪞</span>
            <h1 className="font-display text-5xl mt-4 mb-4">The Mirror</h1>
            <p className="text-[#e8e6e1]/60 italic">"We do not see things as they are, we see them as we are."</p>
          </div>
          <div className="bg-[#0f0f18] border border-[#c9a227]/30 p-8 text-left">
            <h2 className="font-display text-2xl mb-6 gold-grad">Your Journey</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0a0a0f] p-4 text-center"><span className="text-3xl font-mono text-[#c9a227]">{path.length}</span><p className="text-xs text-[#e8e6e1]/50 mt-2">Page Visits</p></div>
              <div className="bg-[#0a0a0f] p-4 text-center"><span className="text-3xl font-mono text-[#c9a227]">{Object.keys(visits).length}</span><p className="text-xs text-[#e8e6e1]/50 mt-2">Unique Pages</p></div>
              <div className="bg-[#0a0a0f] p-4 text-center"><span className="text-lg font-mono text-[#c9a227]">{top?.[0]||'—'}</span><p className="text-xs text-[#e8e6e1]/50 mt-2">Most Visited</p></div>
            </div>
            <p className="text-[#e8e6e1]/60 text-sm">The observer affects the observed. By tracking your journey, we change how you might now navigate.</p>
          </div>
          <button onClick={() => nav('home')} className="mt-8 text-sm text-[#c9a227] hover:underline">Continue, now observed →</button>
        </div>
      </section>
    </div>
  );
}

function TestPage({ questions, setScore, nav }) {
  const [q, setQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sel, setSel] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (i) => { setSel(i); setShowExp(true); };
  const next = () => {
    const newAns = [...answers, sel === questions[q].correct];
    setAnswers(newAns);
    setSel(null); setShowExp(false);
    if (q + 1 >= questions.length) { setScore(newAns.filter(Boolean).length); setDone(true); }
    else setQ(q + 1);
  };

  if (done) {
    const score = answers.filter(Boolean).length;
    return (
      <div className="pt-24 min-h-screen">
        <section className="py-12">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h1 className="font-display text-4xl mb-8">Test Complete</h1>
            <div className={`p-8 border ${score >= 4 ? 'border-[#c9a227] bg-[#c9a227]/5' : 'border-[#e8e6e1]/20'}`}>
              <span className="text-5xl font-mono text-[#c9a227]">{score}/{questions.length}</span>
              <p className="text-[#e8e6e1]/60 mt-4">{score >= 4 ? "You've demonstrated Axiom reasoning patterns." : "Return when ready to try again."}</p>
            </div>
            <div className="mt-8 flex gap-4 justify-center">
              <button onClick={() => nav('occultum')} className="text-sm text-[#c9a227] hover:underline">Visit Occultum →</button>
              <button onClick={() => nav('home')} className="text-sm text-[#e8e6e1]/60">Home</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const curr = questions[q];
  return (
    <div className="pt-24 min-h-screen">
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <span className="font-mono text-[#c9a227] text-sm">THE AXIOM TEST</span>
            <div className="flex gap-2 mt-4">{questions.map((_,i) => <div key={i} className={`w-8 h-1 ${i < q ? 'bg-[#c9a227]' : i === q ? 'bg-[#c9a227]/50' : 'bg-[#e8e6e1]/20'}`}/>)}</div>
          </div>
          <div className="bg-[#0f0f18] border border-[#c9a227]/10 p-8">
            <span className="text-xs text-[#c9a227]/60 font-mono">Q{q+1}/{questions.length}</span>
            <h2 className="font-display text-xl mt-4 mb-8 text-[#e8e6e1]/90">{curr.q}</h2>
            <div className="space-y-3">
              {curr.opts.map((o,i) => (
                <button key={i} onClick={() => !showExp && submit(i)} disabled={showExp}
                  className={`w-full text-left p-4 border transition-all ${showExp ? i === curr.correct ? 'border-green-500 bg-green-500/10' : i === sel ? 'border-red-500 bg-red-500/10' : 'border-[#c9a227]/10 opacity-50' : sel === i ? 'border-[#c9a227] bg-[#c9a227]/10' : 'border-[#c9a227]/10 hover:border-[#c9a227]/30'}`}>
                  <span className="font-mono text-sm text-[#c9a227]/60 mr-3">{String.fromCharCode(65+i)}.</span>
                  <span className="text-[#e8e6e1]/80">{o}</span>
                </button>
              ))}
            </div>
            {showExp && (
              <div className="mt-8 p-6 bg-[#0a0a0f] border-l-4 border-[#c9a227]">
                <p className="text-[#e8e6e1]/70 text-sm">{curr.exp}</p>
                <button onClick={next} className="mt-4 px-6 py-2 bg-[#c9a227] text-[#0a0a0f] text-sm">{q+1 >= questions.length ? 'See Results' : 'Next'} →</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function PuzzlePage({ nav }) {
  const [input, setInput] = useState('');
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(0);
  const answers = ['axiom','axiomzero','zero','firstprinciples'];
  const hints = ["The answer lies in what we are.","What comes before all axioms?","Think foundational."];

  const check = (e) => {
    e.preventDefault();
    if (answers.includes(input.toLowerCase().trim())) setSolved(true);
    else setHint(Math.min(hint + 1, hints.length));
  };

  if (solved) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="max-w-xl mx-auto px-6 text-center anim-fade">
          <span className="text-6xl">🔓</span>
          <h1 className="font-display text-4xl mt-6 mb-4 gold-grad">The Portal Opens</h1>
          <p className="text-[#e8e6e1]/60 mb-8">404 is not an error—it's a question. You answered it.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => nav('occultum')} className="px-6 py-3 bg-[#c9a227] text-[#0a0a0f] text-sm">Enter Occultum</button>
            <button onClick={() => nav('home')} className="px-6 py-3 border border-[#c9a227] text-[#c9a227] text-sm">Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h1 className="font-display text-8xl text-[#c9a227]/20 mb-4">404</h1>
        <p className="font-display text-2xl text-[#e8e6e1]/80 mb-8">This page does not exist... or does it?</p>
        <div className="bg-[#0f0f18] border border-[#c9a227]/10 p-8">
          <p className="text-[#e8e6e1]/60 mb-6">This page is a locked door. The key is a word.</p>
          <form onSubmit={check} className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter the key..." className="flex-1 bg-[#0a0a0f] border border-[#c9a227]/30 px-4 py-3 text-[#e8e6e1] focus:border-[#c9a227] outline-none font-mono" />
            <button type="submit" className="px-6 py-3 bg-[#c9a227] text-[#0a0a0f]">→</button>
          </form>
          {hint > 0 && <p className="text-[#c9a227]/60 text-sm mt-4 font-mono">Hint: {hints[hint-1]}</p>}
        </div>
        <button onClick={() => nav('home')} className="mt-8 text-sm text-[#e8e6e1]/40 hover:text-[#c9a227]">Or return to safety →</button>
      </div>
    </div>
  );
}
