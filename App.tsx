import React, { useState, useEffect } from 'react';
import { Shield, Users, CheckCircle, Smartphone, AlertTriangle, Menu, X, ChevronRight, Flame, Trophy, Calendar, MoreHorizontal, ArrowLeft, Clock, Lock } from 'lucide-react';

// --- Shared Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'primary', className = '', onClick }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 border border-emerald-400/20",
    secondary: "bg-white text-slate-950 hover:bg-slate-200 shadow-lg",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:border-white hover:text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader: React.FC<{ 
  title: string; 
  subtitle?: string; 
  align?: 'left' | 'center' 
}> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

// --- Components ---

const PactCard: React.FC<{
  title: string;
  goal: string;
  stake: string;
  image: string;
  members: number;
}> = ({ title, goal, stake, image, members }) => (
  <div className="relative w-[300px] h-[420px] rounded-[2rem] overflow-hidden shrink-0 group border border-slate-800 hover:border-slate-600 transition-all duration-500 shadow-2xl">
     {/* Background Image */}
     <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
     
     {/* Gradient Overlay */}
     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>

     <div className="absolute top-4 right-4 bg-slate-950/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Active</span>
     </div>

     <div className="absolute bottom-0 p-6 w-full flex flex-col h-full justify-end">
        <div className="mb-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-2 group-hover:translate-y-0">
           <Lock className="w-6 h-6 text-emerald-500 mb-2" />
        </div>

        <div className="flex -space-x-3 mb-4">
           {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                 <img src={`https://picsum.photos/seed/${title}${i}/100/100`} alt="User" className="w-full h-full object-cover" />
              </div>
           ))}
           <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold">
              +{members}
           </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white leading-tight mb-1">{title}</h3>
        <p className="text-emerald-400 text-sm font-medium mb-5">{goal}</p>

        <div className="bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-slate-800 group-hover:border-amber-900/50 transition-colors flex items-center gap-3 shadow-lg">
           <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
           </div>
           <div className="flex-1 min-w-0">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">The Stake</p>
              <p className="text-xs text-slate-200 font-medium truncate leading-tight">{stake}</p>
           </div>
        </div>
     </div>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-slate-800 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/10 group-hover:shadow-white/20 transition-all">
            <Shield className="w-5 h-5 text-slate-950 fill-slate-950" />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-white">PACT</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Manifesto', 'FAQ'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {link}
            </a>
          ))}
          <Button variant="primary" className="py-2 px-4 text-xs">
            Download Beta
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
           {['Features', 'Manifesto', 'FAQ'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-lg font-medium text-slate-300" onClick={() => setMobileMenuOpen(false)}>
              {link}
            </a>
          ))}
          <Button className="w-full">Download Beta</Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-slate-800/20 to-transparent opacity-50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Text Content */}
        <div className="space-y-8 z-10 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 text-xs font-bold uppercase tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Now Available in Beta
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.95] tracking-tight">
            Goals are <br/> 
            <span className="text-slate-600">easy to break.</span> <br/>
            Pacts are not.
          </h1>
          
          <p className="text-lg text-slate-400 max-w-md leading-relaxed">
            The first social contract app. Lock in your habit, set a real penalty, and invite your crew. <span className="text-white font-medium">Honor your word.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="gap-2">
              <span className="text-lg"></span> App Store
            </Button>
            <Button variant="outline">
              Read the Manifesto
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${i}/100/100`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p>10,000+ Pacts Sealed</p>
          </div>
        </div>

        {/* Hero Visual - Recreating "Squad Detail" Screen (Image 11) */}
        <div className="relative z-10 flex justify-center md:justify-end order-1 md:order-2 h-[500px] md:h-[800px]">
          {/* Main Phone Mockup */}
          <div className="relative w-[300px] md:w-[380px] h-[600px] md:h-[750px] transition-transform duration-700 hover:scale-[1.02]">
            {/* Glow behind phone */}
            <div className="absolute inset-4 bg-emerald-500/20 blur-3xl rounded-[3rem]"></div>
            
            {/* Phone Body */}
            <div className="relative w-full h-full bg-slate-950 border-[8px] border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-slate-700/50 flex flex-col">
               
               {/* Status Bar */}
               <div className="h-12 w-full flex justify-between items-center px-8 pt-4 shrink-0">
                  <span className="text-white text-xs font-bold">9:41</span>
                  <div className="flex gap-1.5">
                    <div className="w-4 h-2.5 bg-white rounded-[1px]"></div>
                    <div className="w-0.5 h-1.5 bg-white/30 rounded-[1px] self-center"></div>
                  </div>
               </div>

               {/* App Header */}
               <div className="px-6 py-4 flex items-center justify-between shrink-0">
                  <ArrowLeft className="w-6 h-6 text-white" />
                  <span className="font-display font-bold text-lg text-white">Morning Squad</span>
                  <MoreHorizontal className="w-6 h-6 text-white" />
               </div>

               {/* App Content */}
               <div className="flex-1 overflow-y-auto px-6 pb-8 no-scrollbar">
                  
                  {/* Goal Section */}
                  <div className="mb-6">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Shared Goal</p>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">Run 5k Daily</h2>
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg">
                       <Clock className="w-3 h-3 text-indigo-400" />
                       <span className="text-indigo-300 text-xs font-bold">Daily Check-in</span>
                    </div>
                  </div>

                  {/* Consistency Ring section simulated */}
                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <div className="text-6xl font-display font-black text-emerald-500 tracking-tight">98%</div>
                        <div className="text-slate-400 text-sm font-medium">Consistency</div>
                     </div>
                     {/* Mini avatars */}
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border border-slate-900 overflow-hidden">
                              <img src={`https://picsum.photos/seed/squad${i}/100/100`} />
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full bg-slate-800 rounded-full mb-8">
                     <div className="h-full w-[98%] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>

                  {/* Stake Card */}
                  <div className="bg-[#1a1008] border border-amber-900/30 rounded-2xl p-4 mb-8 relative overflow-hidden">
                     <div className="flex items-start gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-amber-900/20 flex items-center justify-center border border-amber-900/30 shrink-0">
                           <Shield className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                           <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">The Stake</p>
                           <p className="text-white font-bold leading-snug">"Loser buys coffee for the crew."</p>
                           <p className="text-amber-700/60 text-[10px] mt-2 font-medium">Agreed by 4 members</p>
                        </div>
                     </div>
                     <div className="absolute right-0 top-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl -mr-8 -mt-8"></div>
                  </div>

                  {/* Squad Status */}
                  <div className="mb-8">
                     <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Squad Status</p>
                     <div className="space-y-4">
                        {/* User 1 */}
                        <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden relative">
                              <img src="https://picsum.photos/seed/alex/100/100" />
                              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900"></div>
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-white text-sm font-bold">Alex (You)</span>
                                 <div className="flex items-center gap-1 text-amber-500">
                                    <Flame className="w-3 h-3 fill-amber-500" />
                                    <span className="text-xs font-bold">12</span>
                                 </div>
                              </div>
                              <div className="h-1 w-full bg-slate-800 rounded-full">
                                 <div className="h-full w-full bg-emerald-500 rounded-full"></div>
                              </div>
                           </div>
                        </div>
                         {/* User 2 */}
                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50 flex items-center gap-3 opacity-80">
                           <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                              <img src="https://picsum.photos/seed/jessica/100/100" />
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-white text-sm font-bold">Jessica</span>
                                 <div className="flex items-center gap-1 text-amber-600">
                                    <Flame className="w-3 h-3 fill-amber-600" />
                                    <span className="text-xs font-bold">8</span>
                                 </div>
                              </div>
                              <div className="h-1 w-full bg-slate-800 rounded-full">
                                 <div className="h-full w-[80%] bg-indigo-500 rounded-full"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Latest Update */}
                  <div>
                     <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Latest Update</p>
                     <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-6 h-6 rounded-full overflow-hidden"><img src="https://picsum.photos/seed/alex/100/100"/></div>
                           <span className="text-white text-sm font-bold">Alex</span>
                           <span className="text-xs text-slate-500 ml-auto">Just now</span>
                        </div>
                        <p className="text-white text-sm mb-3">5k done before sunrise! 🌅 Legs felt heavy but we move.</p>
                        <div className="h-32 rounded-lg overflow-hidden relative">
                           <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                           <div className="absolute bottom-2 right-2 bg-emerald-500/20 backdrop-blur border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              <span className="text-[10px] font-bold text-white">Verified</span>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
               
               {/* Nav Bar simulated */}
               <div className="h-16 border-t border-slate-800 bg-slate-950 flex justify-around items-center px-2 shrink-0">
                  <div className="p-2"><Users className="w-6 h-6 text-white" /></div>
                  <div className="p-2"><Clock className="w-6 h-6 text-slate-600" /></div>
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center -mt-6 border-4 border-slate-950 shadow-lg shadow-emerald-900/50">
                     <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-2"><Shield className="w-6 h-6 text-slate-600" /></div>
                  <div className="p-2"><div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden"><img src="https://picsum.photos/seed/alex/100/100"/></div></div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center mb-8 border border-slate-800">
          <Smartphone className="text-slate-500 w-8 h-8" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
          Willpower fails. <span className="text-emerald-500">Social pressure works.</span>
        </h2>
        
        <p className="text-xl text-slate-400 leading-relaxed mb-12">
          Behavioral psychology tells us that we are 65% more likely to meet a goal if we commit to someone. That number jumps to <span className="text-white font-bold">95%</span> if we have a specific accountability appointment with a person we've committed to.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            { title: "No Flaking", desc: "You can't ghost your friends when money or reputation is on the line.", color: "bg-amber-500" },
            { title: "Real Proof", desc: "Photo verification required. No 'I did it' without showing the work.", color: "bg-emerald-500" },
            { title: "Shared Glory", desc: "Win together. The dopamine hit of a shared streak is unmatched.", color: "bg-purple-500" }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className={`w-2 h-2 rounded-full ${item.color} mb-4`}></div>
              <h3 className="text-white font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Forge a Pact",
      description: "Create a group, define the goal (e.g., 'Run 5k Daily'), and set the duration.",
      icon: <Users className="w-6 h-6 text-white" />
    },
    {
      number: "02",
      title: "Set the Stake",
      description: "Agree on a penalty. Loser buys dinner? $50 to charity? Make it sting.",
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />
    },
    {
      number: "03",
      title: "Prove It",
      description: "Upload daily proof. The group verifies. Keep the streak alive or pay up.",
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/20 skew-y-3 transform origin-top-left scale-110 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="How It Works" 
          subtitle="Simple rules. Serious consequences. Total accountability."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-t border-dashed border-slate-700 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 group">
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 shadow-2xl shadow-black/50">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:bg-slate-800 transition-colors">
                    {step.icon}
                  </div>
                  <span className="font-display font-black text-5xl text-slate-800 group-hover:text-slate-700 transition-colors select-none">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WallOfPacts = () => {
  const pacts = [
     {
        title: "5AM Club",
        goal: "Wake up & workout by 5:30am",
        stake: "Loser pays $50 to charity",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
        members: 5
     },
     {
        title: "Book Worms",
        goal: "Read 30 mins every day",
        stake: "Buy the winner a book",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
        members: 3
     },
     {
        title: "Iron Temple",
        goal: "Hit the gym 4x a week",
        stake: "Post embarrassing photo on IG",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        members: 6
     },
     {
        title: "Deep Work",
        goal: "2 hours no-phone focus block",
        stake: "Pay for team lunch",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
        members: 4
     },
     {
        title: "Mindful Monks",
        goal: "15 min meditation daily",
        stake: "Clean the office kitchen",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        members: 8
     }
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 border-t border-slate-900">
       <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">Wall of Pacts</h2>
            <p className="text-slate-400">Real promises being kept right now.</p>
          </div>
          <div className="hidden md:flex gap-2">
             <div className="p-2 rounded-full border border-slate-800 text-slate-500 hover:text-white transition-colors cursor-pointer"><ChevronRight className="rotate-180" /></div>
             <div className="p-2 rounded-full border border-slate-800 text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"><ChevronRight /></div>
          </div>
       </div>

       {/* Carousel Container */}
       <div className="overflow-x-auto no-scrollbar pb-12 px-6 flex gap-6 snap-x snap-mandatory">
          {pacts.map((pact, index) => (
             <div key={index} className="snap-center">
                <PactCard {...pact} />
             </div>
          ))}
       </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-emerald-950/20"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 tracking-tight">
          Ready to commit?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
          Join the beta. Set your first pact. Don't be the one who pays for coffee.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="h-16 px-8 text-lg">
              Download PACT Beta
            </Button>
        </div>
        <p className="mt-8 text-slate-500 text-sm">
          Strictly limited access. Invite only.
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-600" />
          <span className="font-display font-bold text-white tracking-widest">PACT</span>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <p className="font-medium text-slate-600">
          Made with Honor. &copy; 2024.
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-5 mix-blend-overlay"></div>
      
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <WallOfPacts />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;