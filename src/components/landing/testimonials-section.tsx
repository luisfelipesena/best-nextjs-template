import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Customer Name',
      role: 'Customer Title',
      content: 'Every Landing worth pricing to help with conversions.',
      rating: 5,
      avatar: 'CN',
    },
    {
      name: 'Customer Name',
      role: 'Customer Title',
      content: 'People feel relieved to see other people happy with their purchase.',
      rating: 5,
      avatar: 'CN',
    },
    {
      name: 'Customer Name',
      role: 'Customer Title',
      content: 'The more testimonials, the better.',
      rating: 5,
      avatar: 'CN',
    },
  ]

  return (
    <section className='py-20 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>Loved by people worldwide</h2>
        </div>

        <div className='grid gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className='p-6'>
                <div className='flex mb-4'>
                  {[...new Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  ))}
                </div>
                <blockquote className='text-sm mb-4'>"{testimonial.content}"</blockquote>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className='font-medium text-sm'>{testimonial.name}</div>
                    <div className='text-xs text-muted-foreground'>{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
