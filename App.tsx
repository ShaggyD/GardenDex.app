
import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Scan,
  Droplets,
  BookOpen,
  Skull,
  BrainCircuit,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  MapPin,
  Heart,
  Globe
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import PhoneFrame from './components/PhoneFrame';
import { HeroOrganicBg, ScannerIllustration, AiTreeIllustration } from './components/AnimatedIllustrations';
import PrivacyPolicy from './components/PrivacyPolicy';

// These filenames match the screenshots provided.
const IMAGES = {
  dashboard: "/screenshots/IMG_0538.jpeg",       // 10:13 My GardenDex (Dashboard)
  identification: "/screenshots/IMG_0541.jpeg",  // 10:17 Select Plants
  review: "/screenshots/IMG_0540.jpeg",          // 10:18 Review Plants
  detail: "/screenshots/IMG_0541.jpeg",          // 10:18 Hens and Chicks
  journal: "/screenshots/IMG_0542.jpeg",         // 10:19 Lemon Lime (Journal)
  chat: "/screenshots/IMG_0543.jpeg",            // 10:21 Chat
  agenda: "/screenshots/IMG_0544.jpeg",          // 10:22 Care Agenda
  addNote: "/screenshots/IMG_0545.jpeg"          // 10:24 Add Note
};

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'privacy'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const [activeFeature, setActiveFeature] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollTo = (id: string) => {
    if (page !== 'home') {
      setPage('home');
      // Wait for render
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (section: string) => {
    scrollTo(section);
  }

  // Logic for sticky scroll active state
  useEffect(() => {
    if (page !== 'home') return;

    const handleScroll = () => {
      // Check individual text blocks position relative to center of screen
      const blocks = [0, 1, 2];
      const viewportCenter = window.innerHeight / 2;

      let closestBlock = 0;
      let minDistance = Infinity;

      blocks.forEach((index) => {
        const element = document.getElementById(`feature-text-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + (rect.height / 2);
          const distance = Math.abs(viewportCenter - elementCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestBlock = index;
          }
        }
      });

      setActiveFeature(closestBlock);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  if (page === 'privacy') {
    return <PrivacyPolicy onBack={() => setPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-forest-950 text-forest-50 selection:bg-neon-400 selection:text-forest-950 font-sans">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center cursor-pointer group" onClick={() => scrollTo('hero')}>
              <span className="font-bold text-2xl tracking-tight text-white hover:text-neon-400 transition-colors">GardenDex</span>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => handleNavClick('features')} className="text-sm font-medium text-forest-200 hover:text-white transition">Features</button>
              <button onClick={() => handleNavClick('demo')} className="text-sm font-medium text-forest-200 hover:text-white transition">How it Works</button>
              <button onClick={() => handleNavClick('mission')} className="text-sm font-medium text-forest-200 hover:text-white transition">Mission</button>
              <button onClick={() => handleNavClick('mission')} className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-full font-medium transition backdrop-blur-md flex items-center space-x-2 text-white">
                <span>Beta Access</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-forest-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {['Features', 'Demo', 'Mission'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className="block w-full text-left text-lg font-medium text-forest-100 hover:text-neon-400"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Animated Background */}
        <HeroOrganicBg />

        {/* Static Background Gradients (Fallback/Layering) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-gradient-to-b from-forest-900/50 to-forest-950 z-0 pointer-events-none"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-neon-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-500"></span>
              </span>
              <span className="text-sm font-medium text-forest-100">Now in beta</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Your garden, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-forest-400 text-glow">
                supercharged.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-forest-200 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Identify species, track growth, and chat with AI experts.
              The all-in-one companion for the plant hobbyist.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Apple Store Button */}
              <button className="flex items-center bg-gray-900 border border-gray-700 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition transform hover:-translate-y-0.5 shadow-xl min-w-[180px]">
                <div className="mr-3">
                  <svg viewBox="0 0 384 512" width="24" height="24" fill="white">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-medium text-gray-400 leading-none mb-1">Coming Soon</span>
                  <span className="text-lg font-bold leading-none">App Store</span>
                </div>
              </button>

              {/* Google Play Button */}
              <button className="flex items-center bg-gray-900 border border-gray-700 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition transform hover:-translate-y-0.5 shadow-xl min-w-[180px]">
                <div className="mr-3">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="white" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,13.1L21.16,13.6C21.68,13.89 22,14.4 22,15C22,15.6 21.68,16.1 21.16,16.4L18.4,18L15.6,15.2L20.3,13.1M16.81,8.88L20.3,10.9L15.6,8.8L18.4,7.2L21.16,8.8L16.81,6.34L14.54,8.61L6.05,2.66L16.81,8.88Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-medium text-gray-400 leading-none mb-1">Coming Soon</span>
                  <span className="text-lg font-bold leading-none">Google Play</span>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Hero Phones Parallax */}
          <div className="relative h-[500px] md:h-[700px] w-full mt-12 flex justify-center items-start perspective-1000">
            {/* Left Phone - Agenda */}
            <motion.div style={{ y: y1 }} className="absolute left-1/2 -translate-x-[260px] md:-translate-x-[380px] top-20 scale-75 md:scale-90 z-10 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <PhoneFrame src={IMAGES.agenda} alt="Care Agenda" />
            </motion.div>

            {/* Center Phone - Dashboard */}
            <motion.div className="absolute left-1/2 -translate-x-1/2 z-30 scale-90 md:scale-100 shadow-2xl shadow-neon-500/20 rounded-[3rem]">
              <PhoneFrame src={IMAGES.dashboard} alt="Main Collection" />
            </motion.div>

            {/* Right Phone - Identification */}
            <motion.div style={{ y: y2 }} className="absolute left-1/2 translate-x-[10px] md:translate-x-[110px] top-32 scale-75 md:scale-90 z-20 opacity-80 hover:opacity-100 transition-opacity duration-500">
              <PhoneFrame src={IMAGES.identification} alt="Plant Identification" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 bg-forest-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-neon-400 tracking-widest uppercase mb-3">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white">Everything you need to <br />keep them alive.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

            {/* Feature 1: Multi-Plant ID - Large Box (Rows 1-2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-4 bg-gradient-to-br from-forest-900 to-forest-800 rounded-3xl p-8 border border-white/5 relative overflow-hidden group min-h-[400px]"
            >
              {/* Animated Background */}
              <ScannerIllustration />

              <div className="flex flex-col md:flex-row h-full items-center gap-8 z-10 relative">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-neon-500/20 rounded-full flex items-center justify-center text-neon-400 mb-6 border border-neon-500/30">
                    <Scan size={24} />
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">Vision AI Scanner</h4>
                  <p className="text-forest-200 text-lg">Identify single plants, mixed pots, or entire shelves in one go. Our Harmony Score tells you which plants thrive together.</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-mono text-neon-400 border border-neon-500/30">Dracaena Trifasciata</div>
                    <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-xs font-mono text-neon-400 border border-neon-500/30">Monstera Deliciosa</div>
                  </div>
                </div>
                <div className="w-[200px] shrink-0 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src={IMAGES.identification} className="rounded-2xl border-2 border-white/20 shadow-xl" alt="Scanner UI" />
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Agenda - Tall Box (Rows 1-2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 row-span-2 bg-gray-900 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col min-h-[500px]"
            >
              <div className="p-8 pb-0 z-10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-6">
                  <Droplets size={24} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Smart Agenda</h4>
                <p className="text-gray-400 text-sm">Flexible scheduling that adapts to your life. Override AI suggestions to fit your environment.</p>
              </div>
              <div className="flex-1 mt-8 relative">
                <img src={IMAGES.agenda} className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] rounded-t-3xl border-4 border-gray-800 shadow-2xl" alt="Agenda UI" />
              </div>
            </motion.div>

            {/* Feature 3: Graveyard - Small Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-1 md:col-span-2 bg-forest-900/50 rounded-3xl p-8 border border-white/5 hover:bg-forest-900 transition"
            >
              <Skull className="text-red-400 mb-4" size={32} />
              <h4 className="text-xl font-bold text-white mb-2">Plant Graveyard</h4>
              <p className="text-forest-200 text-sm">
                Honor the fallen. Archive deceased plants to preserve their journals and history, so you can learn from the past when trying again.
              </p>
            </motion.div>

            {/* Feature 4: Tech/BYOK - Medium Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-1 md:col-span-2 bg-black rounded-3xl p-8 border border-white/10 relative overflow-hidden"
            >
              {/* Animated AI Background - Neuro Tree */}
              <AiTreeIllustration />

              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-purple-400 mb-4">
                  <Sparkles size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Bring Your Own Key</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4">AI on Your Terms</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Enter your own Gemini API key. Use Google's generous free tier and only pay if you massively scale.
                </p>
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 font-mono text-xs text-green-400 border border-gray-800 truncate shadow-lg">
                  AI_KEY=********************
                </div>
              </div>
            </motion.div>

            {/* Feature 5: Location Manager */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-1 md:col-span-3 bg-forest-800/30 rounded-3xl p-8 border border-white/5 hover:bg-forest-800/50 transition relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <MapPin size={100} />
              </div>
              <div className="relative z-10">
                <MapPin className="text-yellow-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-white mb-2">Organize by Space</h4>
                <p className="text-forest-200 text-sm">
                  Keep your "Office Friends" separate from your "Living Room Jungle".
                  Track plants by location to better manage lighting and watering routines across your entire home or workplace.
                </p>
              </div>
            </motion.div>

            {/* Feature 6: Wishlist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="col-span-1 md:col-span-3 bg-forest-800/30 rounded-3xl p-8 border border-white/5 hover:bg-forest-800/50 transition relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Heart size={100} />
              </div>
              <div className="relative z-10">
                <Heart className="text-pink-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-white mb-2">Dream & Plan</h4>
                <p className="text-forest-200 text-sm">
                  Build a Wishlist of plants you're hunting for.
                  Research care requirements before you buy to ensure they fit your environment and lifestyle.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Interactive Sticky Scroll Demo */}
      <section id="demo" className="bg-forest-950 py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <div className="space-y-48 py-20">
              <div id="feature-text-0" className={`group transition-opacity duration-500 ${activeFeature === 0 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="w-16 h-16 rounded-2xl bg-forest-800 flex items-center justify-center text-white font-bold text-2xl mb-6 group-hover:bg-neon-500 group-hover:text-forest-950 transition-colors">1</div>
                <h3 className="text-3xl font-bold text-white mb-4">Snap & Analyze</h3>
                <p className="text-xl text-forest-200 leading-relaxed">
                  Capture single plants, mixed pots, or entire shelves in one shot. GardenDex identifies species and calculates a 'Harmony Score' to ensure your mixed arrangements will thrive together.
                  If compatibility is low, it highlights concerns and suggests care adjustments so you can make it work anyway.
                </p>
              </div>
              <div id="feature-text-1" className={`group transition-opacity duration-500 ${activeFeature === 1 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="w-16 h-16 rounded-2xl bg-forest-800 flex items-center justify-center text-white font-bold text-2xl mb-6 group-hover:bg-neon-500 group-hover:text-forest-950 transition-colors">2</div>
                <h3 className="text-3xl font-bold text-white mb-4">Chat with Context</h3>
                <p className="text-xl text-forest-200 leading-relaxed">
                  The AI knows your plant's history. Ask "Is it ready to pot?" and it analyzes your latest journal photo to give specific advice, not generic wiki-how steps.
                </p>
              </div>
              <div id="feature-text-2" className={`group transition-opacity duration-500 ${activeFeature === 2 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="w-16 h-16 rounded-2xl bg-forest-800 flex items-center justify-center text-white font-bold text-2xl mb-6 group-hover:bg-neon-500 group-hover:text-forest-950 transition-colors">3</div>
                <h3 className="text-3xl font-bold text-white mb-4">Track Care History</h3>
                <p className="text-xl text-forest-200 leading-relaxed">
                  Go beyond watering. Skip tasks if they aren't ready, inspect for pests, and log health issues with photos. Build a rich history to track recovery and growth.
                </p>
              </div>
            </div>

            {/* Right Sticky Phone */}
            <div className="hidden lg:block relative h-[1200px]">
              <div className="sticky top-32">
                <div className="relative">
                  <AnimatePresence mode='wait'>
                    {activeFeature === 0 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <PhoneFrame src={IMAGES.identification} alt="Scan" className="scale-110" />
                      </motion.div>
                    )}
                    {activeFeature === 1 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <PhoneFrame src={IMAGES.chat} alt="Chat" className="scale-110" />
                      </motion.div>
                    )}
                    {activeFeature === 2 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <PhoneFrame src={IMAGES.detail} alt="History" className="scale-110" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Footer CTA */}
      <section id="mission" className="py-32 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <Globe className="w-20 h-20 text-forest-400 mx-auto mb-8 animate-float" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Built for the love of <br /><span className="text-neon-400">growing things.</span></h2>
          <p className="text-xl text-forest-200 mb-12 max-w-2xl mx-auto">
            GardenDex is a passion project, not a subscription trap. We believe expert plant care tools should be accessible to everyone.
          </p>

          <div className="bg-forest-950/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 max-w-xl mx-auto">
            <h3 className="text-white font-bold mb-4">Join the Beta</h3>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-forest-900 border border-forest-700 text-white focus:outline-none focus:border-neon-500 transition"
              />
              <button disabled className="px-6 py-3 bg-gray-600 text-gray-400 font-bold rounded-xl cursor-not-allowed">
                Get Invite
              </button>
            </form>
            <p className="text-xs text-forest-400 mt-4">We respect your privacy. No spam, just plants.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 border-t border-white/5 py-12 text-sm text-forest-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-lg">GardenDex</span>
          </div>
          <div className="flex gap-8">
            <button onClick={() => setPage('privacy')} className="hover:text-white transition">Privacy</button>
          </div>
          <div>
            © {new Date().getFullYear()} GardenDex. Open for growth.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
