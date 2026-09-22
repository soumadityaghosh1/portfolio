import { MotionConfig } from 'framer-motion'
import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { Ambient, CursorGlow } from './components/Ambient'
import { Arsenal } from './components/Arsenal'
import { Contact } from './components/Contact'
import { Credentials } from './components/Credentials'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Learning } from './components/Learning'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { person } from './data/profile'
import { SkillFocusProvider } from './hooks/SkillFocus'
import { useAssetExists } from './hooks/useAssetExists'

export default function App() {
  const resumeExists = useAssetExists(person.resume, 'application/pdf')

  return (
    <MotionConfig reducedMotion="user">
      <SkillFocusProvider>
        <Ambient />
        <CursorGlow />
        <Nav resumeExists={resumeExists} />
        <main id="main" className="relative">
          <Hero />
          <About />
          <Experience />
          <Arsenal />
          <Projects />
          <Credentials />
          <Education />
          <Achievements />
          <Learning />
          <Contact />
        </main>
        <Footer resumeExists={resumeExists} />
      </SkillFocusProvider>
    </MotionConfig>
  )
}
