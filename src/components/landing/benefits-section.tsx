import { Card, CardContent } from '@/components/ui/card'

export function BenefitsSection() {
  const benefits = [
    {
      title: 'Benefit 1',
      description: 'Focus on how it helps user instead of what features it has',
    },
    {
      title: 'Benefit 2',
      description: 'Focus on how it helps user instead of what features it has',
    },
    {
      title: 'Benefit 3',
      description: 'Focus on how it helps user instead of what features it has',
    },
    {
      title: 'Benefit 4',
      description: 'Focus on how it helps user instead of what features it has',
    },
    {
      title: 'Benefit 5',
      description: 'Focus on how it helps user instead of what features it has',
    },
    {
      title: 'Benefit 6',
      description: 'Focus on how it helps user instead of what features it has',
    },
  ]

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>Benefits</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>I prefer bento boxes for these sections</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {benefits.map((benefit, index) => (
            <Card key={index} className='h-full'>
              <CardContent className='p-6'>
                <div className='aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center'>
                  <div className='w-12 h-12 bg-muted-foreground/20 rounded' />
                </div>
                <h3 className='font-semibold mb-2'>{benefit.title}</h3>
                <p className='text-sm text-muted-foreground'>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
