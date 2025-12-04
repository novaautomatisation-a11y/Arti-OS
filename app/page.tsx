import { Navbar } from '@/components/sections/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { CraftedForSwiss } from '@/components/sections/CraftedForSwiss'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { DashboardPreviewSection } from '@/components/sections/DashboardPreviewSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { ResourcesSection } from '@/components/sections/ResourcesSection'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExpertiseSection />
      <CraftedForSwiss />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <ResourcesSection />
      <FinalCTA />
      <ContactSection />
      <Footer />
    </div>
  )
}
