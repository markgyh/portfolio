import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import DataToggle from './dev/DataToggle'
import MobilePreview, { isMobilePreview } from './dev/MobilePreview'

export default function App() {
  if (import.meta.env.DEV && isMobilePreview()) return <MobilePreview />

  return (
    <>
      {/* Blueprint grid behind the whole page */}
      <div className="drafting-grid pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only z-[100] rounded-sm bg-copper px-4 py-2 font-medium text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {import.meta.env.DEV && <DataToggle />}
    </>
  )
}
