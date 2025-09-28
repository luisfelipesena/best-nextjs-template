import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className='relative flex min-h-[600px] flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 text-center pt-24'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>Best Next.js Template</h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl'>
          Social Proof builds trust among others when using this tool. Mention key Problem / What you sell / Make it
          clearly understandable
        </p>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button size='lg' className='text-base'>
            Primary CTA
          </Button>
          <Button size='lg' variant='outline' className='text-base'>
            Secondary CTA
          </Button>
        </div>
      </div>

      {/* Product Demo/Screenshot Area */}
      <div className='mt-12 w-full max-w-5xl'>
        <div className='relative overflow-hidden rounded-lg border bg-card shadow-lg'>
          <div className='aspect-video bg-muted/30 p-8'>
            <div className='h-full w-full rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center'>
              <span className='text-muted-foreground'>Product video or screenshot of your software</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
