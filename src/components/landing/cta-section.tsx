import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className='py-20 bg-primary'>
      <div className='container mx-auto px-4 text-center'>
        <div className='max-w-3xl mx-auto space-y-6'>
          <h2 className='text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl'>CTA Section</h2>
          <p className='text-xl text-primary-foreground/90'>Highlight it, make it stand out</p>
          <div className='pt-6'>
            <Button size='lg' variant='secondary' className='text-base'>
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
