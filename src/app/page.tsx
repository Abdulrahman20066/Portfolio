import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Skills     from '@/components/Skills';
import Projects   from '@/components/Projects';
import Resume     from '@/components/Resume';
import Resources  from '@/components/Resources';
import Contact    from '@/components/Contact';
import Footer     from '@/components/Footer';

// =============================================
// MAIN PAGE
// =============================================
export default function HomePage() {
  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0D1B2A',
            color:      '#E8F4FF',
            border:     '1px solid #1A2F45',
            fontFamily: 'var(--font-dm-mono)',
            fontSize:   '13px',
          },
        }}
      />

      {/* Sticky navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Resources />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
