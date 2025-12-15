import { Navbar } from '@/components/sections/Navbar'
import { NewHeroSection } from '@/components/sections/NewHeroSection'
import { SwissTradesSection } from '@/components/sections/SwissTradesSection'
import { HowItWorksNew } from '@/components/sections/HowItWorksNew'
import { DashboardPreviewSection } from '@/components/sections/DashboardPreviewSection'
import { TestimonialsNew } from '@/components/sections/TestimonialsNew'
import { PricingNew } from '@/components/sections/PricingNew'
import { DemoFormSection } from '@/components/sections/DemoFormSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <NewHeroSection />
      <SwissTradesSection />
      <HowItWorksNew />
      <DashboardPreviewSection />
      <TestimonialsNew />
      <PricingNew />
      <DemoFormSection />
      <Footer />
    </div>
  )
}
