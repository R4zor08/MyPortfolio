import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experiences } from './components/Experiences';
import { Achievements } from './components/Achievements';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { RazorAIChat } from './components/RazorAIChat';

export function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-purple-600 focus:text-white focus:font-medium">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experiences />
        <Projects />
        <Achievements />
        <Services />
        <Contact />
      </main>
      <Footer />
      <RazorAIChat />
    </div>
  );
}
