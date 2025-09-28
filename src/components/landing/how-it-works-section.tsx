import { Card, CardContent } from '@/components/ui/card'

export function HowItWorksSection() {
  const steps = [
    {
      step: 'Step 1',
      title: 'Step Title',
      description: 'Explain how to get started with the product in 3 simple steps',
    },
    {
      step: 'Step 2',
      title: 'Step Title',
      description: 'Explain how to get started with the product in 3 simple steps',
    },
    {
      step: 'Step 3',
      title: 'Step Title',
      description: 'Explain how to get started with the product in 3 simple steps',
    },
  ]

  return (
    <section className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>How it works?</h2>
        </div>

        <div className='grid gap-8 md:grid-cols-3'>
          {steps.map((step, index) => (
            <Card key={index} className='text-center'>
              <CardContent className='p-8'>
                <div className='aspect-square bg-muted/50 rounded-lg mb-6 flex items-center justify-center mx-auto max-w-48'>
                  <div className='text-2xl font-bold text-muted-foreground'>{step.step}</div>
                </div>
                <h3 className='font-semibold text-lg mb-3'>{step.title}</h3>
                <p className='text-muted-foreground'>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
