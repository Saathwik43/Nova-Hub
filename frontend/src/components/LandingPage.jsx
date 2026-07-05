import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Trophy, Users, Coins, ArrowRight, Zap, Target } from 'lucide-react';

const activeTournamentsMock = [
  { id: '1', title: 'Valorant Apex League', game: 'Valorant', slots: '14/16', fee: '₹250', prize: '₹15,000', label: 'Tactical Shooter' },
  { id: '2', title: 'Free Fire Grand Showdown', game: 'Free Fire', slots: '28/32', fee: 'Free', prize: '₹10,000', label: 'Battle Royale' },
  { id: '3', title: 'BGMI Pro Invitational', game: 'BGMI', slots: '55/64', fee: '₹500', prize: '₹50,000', label: 'Battle Royale' },
  { id: '4', title: 'Apex Legends: Octane Rush', game: 'Apex Legends', slots: '8/16', fee: '₹100', prize: '₹8,000', label: 'Sci-Fi Shooter' }
];

const highlightsMock = [
  {
    title: 'Ultimate Esports Experience',
    tags: 'live-scoring, bracket-sync',
    description: 'Provide participants with millisecond-accurate rank shifting pipelines directly synchronized with the host admin dashboard.',
    accent: '#9E00FF'
  },
  {
    title: 'Instant Stripe Listing',
    tags: 'monetization, escrow',
    description: 'Orchestrate fully verified tournaments. Host stakes a mock fee via our sleek credit card element to list their event on the global timeline.',
    accent: '#00F0FF'
  },
  {
    title: 'Gamified UI/UX Architecture',
    tags: 'glassmorphism, custom-cursor',
    description: 'Immerse participants with glowing neon card structures, interactive virtual mouse crosshairs, and smooth frame-rate spatial movements.',
    accent: '#00FF85'
  }
];

const testimonialsMock = [
  { quote: "Nova Hub completely transformed our server's tournament workflow. No more manual bracket updates on Discord screenshot channels!", author: "Mitchell Jacobs, Founder of Vipers Esports" },
  { quote: "The custom cursor and live leaderboard layout feels incredibly premium. It makes our small community matches look like global championships.", author: "Gabriël Van Vemde, Tournament Host" },
  { quote: "Millisecond scoreboard syncing is a game-changer. Our fans stayed glued to the live score feed throughout the finals.", author: "Tim Van Den Bosch, Pro Gamer" }
];

export const LandingPage = ({ onNavigate, user }) => {
  return (
    <div className="relative min-h-screen bg-gaming-dark text-white pt-24 font-sans select-none overflow-x-hidden">
      {/* Carbon Grid Backing */}
      <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none" />

      {/* Floating neon ambient globs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gaming-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-80 h-80 bg-gaming-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* SECTION 1: HERO CONTAINER */}
      <section className="max-w-6xl mx-auto px-6 text-center pt-8 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="bg-gaming-purple/20 border border-gaming-purple/40 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest text-gaming-cyan flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-gaming-cyan animate-pulse" /> E-Sports Scoring System
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight font-display max-w-4xl leading-[1.1]">
            Turn chaotic brackets into <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-purple via-gaming-cyan to-gaming-green">investor-ready</span> experiences.
          </h1>

          <p className="text-sm md:text-lg text-gaming-muted max-w-2xl font-normal leading-relaxed">
            Nova Hub simplifies game management. We pair hosts with gamers to deliver live score updates, low-latency bracket nodes, and immersive visual stats.
          </p>

          <div className="flex gap-4 mt-4">
            {user ? (
              <button
                onClick={() => onNavigate(user.role === 'host' ? 'host-dash' : 'gamer-dash')}
                className="bg-gaming-purple hover:bg-gaming-purple/80 border border-gaming-purple/30 text-white font-bold font-display uppercase tracking-wider text-xs px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-neon-purple interactive-target"
              >
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('auth')}
                  className="bg-gaming-purple hover:bg-gaming-purple/80 border border-gaming-purple/30 text-white font-bold font-display uppercase tracking-wider text-xs px-8 py-4 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-neon-purple interactive-target"
                >
                  Join the Hub <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('tournaments-timeline');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold font-display uppercase tracking-wider text-xs px-8 py-4 rounded-xl transition-all duration-300 interactive-target"
                >
                  Discover Matches
                </button>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: SLIDING TOURNAMENT CARDS (HORIZONTAL CAROUSEL STYLE) */}
      <section id="tournaments-timeline" className="py-16 relative z-10 bg-gaming-card/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold font-display uppercase text-white tracking-wide">
              Active Battlefields
            </h2>
            <p className="text-xs text-gaming-muted mt-1">
              Scroll horizontally to view currently streaming tournaments and slots
            </p>
          </div>
          <div className="hidden md:flex gap-1.5 text-xs text-gaming-muted uppercase font-bold tracking-widest font-display">
            Swipe Cards <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Horizontal Slider Area */}
        <div className="overflow-x-auto whitespace-nowrap px-6 pb-6 scrollbar-thin">
          <div className="flex gap-6 max-w-6xl mx-auto">
            {activeTournamentsMock.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel w-72 p-6 rounded-2xl border border-white/5 flex-shrink-0 relative overflow-hidden inline-block whitespace-normal group hover:neon-border-purple transition-all duration-300 cursor-pointer tournament-card interactive-target"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] bg-gaming-purple/20 border border-gaming-purple/40 text-gaming-cyan font-bold tracking-wider px-2 py-0.5 rounded uppercase font-display">
                    {t.label}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gaming-green font-bold font-display">
                    <span className="h-1.5 w-1.5 rounded-full bg-gaming-green animate-ping" /> {t.slots} Slots left
                  </div>
                </div>

                <h3 className="text-base font-bold font-display text-white mt-1 group-hover:text-gaming-cyan transition-colors truncate">
                  {t.title}
                </h3>
                <p className="text-xs text-gaming-muted mt-1 font-semibold">{t.game}</p>

                <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-gaming-muted block">Entry Fee</span>
                    <span className="text-sm font-bold font-display text-white">{t.fee}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-gaming-muted block">Prize Pool</span>
                    <span className="text-sm font-bold font-display text-gaming-green">{t.prize}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: METRICS & WORK SHOWCASE (TILTED OVERLAPPING CARDS) */}
      <section className="py-24 max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase font-bold text-gaming-cyan tracking-widest font-display block mb-2">
              DESIGN SYSTEM INTEGRITY
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display uppercase tracking-tight text-white mb-6">
              A glimpse of <span className="text-gaming-purple">our metrics</span>
            </h2>
            <p className="text-gaming-muted leading-relaxed text-sm md:text-base font-normal mb-8">
              Nova Hub uses advanced glassmorphic layouts to render live leaderboard feeds. Our platform integrates Stripe billing checks and real-time brackets that allow host administrative controllers to bypass third-party updates.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-gaming-purple/20 p-2.5 rounded-lg text-gaming-purple border border-gaming-purple/30">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase font-display">Low-Latency Operations</h4>
                  <p className="text-xs text-gaming-muted mt-1">Socket.io emits match updates in sub-100ms vectors to connected gamer timelines.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gaming-cyan/20 p-2.5 rounded-lg text-gaming-cyan border border-gaming-cyan/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase font-display">Protected Routing Control</h4>
                  <p className="text-xs text-gaming-muted mt-1">Secure HTTP-only cookies prevent token-hijacking, ensuring bracket operations remain safe.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping, Tilted Stack Deck Rendering */}
          <div className="relative h-[380px] md:h-[450px] w-full flex items-center justify-center">
            {highlightsMock.map((h, index) => {
              const rotation = index === 0 ? -6 : index === 1 ? 2 : -2;
              const yOffset = index === 0 ? -30 : index === 1 ? 20 : 60;
              const xOffset = index === 0 ? -20 : index === 1 ? -40 : 10;

              return (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0, 
                    zIndex: 50,
                    boxShadow: `0 10px 40px rgba(0, 240, 255, 0.2)`
                  }}
                  style={{
                    rotate: rotation,
                    y: yOffset,
                    x: xOffset,
                    zIndex: index
                  }}
                  className="absolute glass-panel p-6 rounded-2xl border border-white/5 w-72 md:w-80 shadow-glass cursor-pointer interactive-target"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span 
                      className="text-[9px] font-bold uppercase tracking-wider font-display px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${h.accent}15`, color: h.accent, border: `1px solid ${h.accent}33` }}
                    >
                      {h.tags}
                    </span>
                    <Trophy className="w-4 h-4 text-gaming-muted" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold font-display text-white mb-2 uppercase">
                    {h.title}
                  </h3>
                  <p className="text-xs text-gaming-muted leading-relaxed font-sans font-semibold">
                    {h.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIAL PANEL (SLIDESHOW SCROLLER) */}
      <section className="py-20 relative z-10 bg-gaming-card/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xs uppercase font-bold text-gaming-green tracking-widest font-display mb-8">
            TRUSTED BY PLATFORM HOSTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {testimonialsMock.map((t, index) => (
              <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 flex flex-col justify-between">
                <p className="text-xs italic text-gaming-muted leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase font-bold text-white font-display block">
                    {t.author.split(',')[0]}
                  </span>
                  <span className="text-[9px] text-gaming-cyan font-bold font-display block">
                    {t.author.split(',')[1]?.trim() || ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
