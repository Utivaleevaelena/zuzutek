import { Header } from './components/Header.tsx'
import { H01ProcessTrailhead } from './components/H01ProcessTrailhead.tsx'
import { WorkflowTransformation } from './components/WorkflowTransformation.tsx'
import { H04GuidedWorlds } from './components/H04GuidedWorlds.tsx'
import { H05StartingRoutes } from './components/H05StartingRoutes.tsx'
import { H05ACapabilities } from './components/H05ACapabilities.tsx'
import { Footer } from './components/Footer.tsx'
import { H06ControlGates } from './components/H06ControlGates.tsx'
import { H07ProofAtlas } from './components/H07ProofAtlas.tsx'
import { H08BringOneProcess } from './components/H08BringOneProcess.tsx'
import { HowItWorks } from './pages/HowItWorks.tsx'
import { ServicesPricing } from './pages/ServicesPricing.tsx'
import { AiAutomation } from './pages/AiAutomation.tsx'
import { FreeConsultation } from './pages/FreeConsultation.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { Privacy } from './pages/Privacy.tsx'
import { currentRoutePath } from './sitePaths.ts'

/** Minimal pathname switch (no router dependency). Unknown paths render the 404 page. */
const path = currentRoutePath

/** Home, plus approved routes whose pages are not built yet (/about, /thank-you): they keep opening Home for now. */
const HOME_PATHS = new Set(['', '/index.html', '/about', '/thank-you'])

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        {path() === '/how-it-works' ? (
          <HowItWorks />
        ) : path() === '/services-pricing' ? (
          <ServicesPricing />
        ) : path() === '/ai-automation' ? (
          <AiAutomation />
        ) : path() === '/free-consultation' ? (
          <FreeConsultation />
        ) : path() === '/privacy' ? (
          <Privacy />
        ) : HOME_PATHS.has(path()) ? (
          <>
            <H01ProcessTrailhead />
            <WorkflowTransformation />
            <H04GuidedWorlds />
            <H05StartingRoutes />
            <H05ACapabilities />
            <H06ControlGates />
            <H07ProofAtlas />
            <H08BringOneProcess />
          </>
        ) : (
          <NotFound />
        )}
      </main>
      <Footer />
    </>
  )
}
