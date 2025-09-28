import {
  Navbar,
  HeroSection,
  PartnersSection,
  BenefitsSection,
  HowItWorksSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
