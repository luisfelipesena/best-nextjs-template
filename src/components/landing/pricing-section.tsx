import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$100',
      period: 'month',
      features: [
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
      ],
      buttonText: 'CTA',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$200',
      period: 'month',
      features: [
        'Everything in Starter',
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
      ],
      buttonText: 'CTA',
      popular: true,
    },
    {
      name: 'Advanced',
      price: '$300',
      period: 'month',
      features: [
        'Everything in Pro',
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
        'Feature goes here',
      ],
      buttonText: 'CTA',
      popular: false,
    },
  ]

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>Pricing - Why to buy/How it helps</h2>
          <p className='text-muted-foreground mb-8'>
            Make clear the main difference in plans. Don't hide anything. Add CTAs for all plans. Highlight the middle
            plan, guide users towards it.
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full'>
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className='text-center pb-4'>
                <CardTitle className='text-xl'>{plan.name}</CardTitle>
                <div className='mt-4'>
                  <span className='text-4xl font-bold'>{plan.price}</span>
                  <span className='text-muted-foreground'>/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Button className='w-full' variant={plan.popular ? 'default' : 'outline'}>
                  {plan.buttonText}
                </Button>
                <div className='space-y-3'>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='flex items-center gap-3'>
                      <Check className='h-4 w-4 text-primary flex-shrink-0' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
