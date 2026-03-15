import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'
import Navbar from './components/navbar.jsx'
import FeatureCards from './sections/featureCards.jsx'
import LogoShowcase from './sections/LogoShowcase.jsx'
import ExperienceSection from './sections/ExperienceSection.jsx'
import TechStack from './sections/TechStack.jsx'
import Contact from "./sections/Contact.jsx";
import ChatBot from "./ChatBot";


const App = () => {
  return (
   <>
    <Navbar />
   <Hero />
   <ShowcaseSection/>
   {/* <LogoShowcase /> */}
  <FeatureCards />
  <ExperienceSection />
  <TechStack/>
  <Contact />
  <ChatBot />

   </>
  )
}

export default App
