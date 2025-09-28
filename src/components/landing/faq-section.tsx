'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FAQSection() {
  const faqs = [
    {
      question: 'Question 1',
      answer:
        'Address some major questions to help people finalize that call. Eg - Cancellation/Refunds related questions',
    },
    {
      question: 'Question 2',
      answer:
        'Address some major questions to help people finalize that call. Eg - Cancellation/Refunds related questions',
    },
    {
      question: 'Question 3',
      answer:
        'Address some major questions to help people finalize that call. Eg - Cancellation/Refunds related questions',
    },
    {
      question: 'Question 4',
      answer:
        'Address some major questions to help people finalize that call. Eg - Cancellation/Refunds related questions',
    },
  ]

  return (
    <section className='py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>Frequently Asked Questions</h2>
        </div>

        <div className='max-w-3xl mx-auto'>
          <Accordion type='single' collapsible className='space-y-4'>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className='border rounded-lg px-6'>
                <AccordionTrigger className='text-left font-medium'>{faq.question}</AccordionTrigger>
                <AccordionContent className='text-muted-foreground'>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
