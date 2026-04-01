// app/page.tsx

import Navbar        from '@/components/layout/Navbar'
import Hero          from '@/components/sections/Hero'
import ServicesGrid  from '@/components/sections/ServicesGrid'
import HowItWorks   from '@/components/sections/HowItWorks'
import TrustSection    from '@/components/sections/TrustSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer        from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="pt-16">
        <Hero />
        <ServicesGrid />
        <HowItWorks />
        <TrustSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  )
}