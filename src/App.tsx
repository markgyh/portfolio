import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[100] rounded-full bg-brass px-4 py-2 font-medium text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
