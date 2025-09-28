export function PartnersSection() {
  const partners = Array.from({ length: 9 }, (_, i) => i + 1)

  return (
    <section className='py-12 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <p className='text-sm text-muted-foreground mb-4'>Trusted by companies all around the world</p>
        </div>

        <div className='grid grid-cols-3 gap-8 items-center justify-items-center md:grid-cols-5 lg:grid-cols-9'>
          {partners.map((partner) => (
            <div
              key={partner}
              className='flex h-12 w-16 items-center justify-center rounded-lg bg-background/50 border'
            >
              <div className='h-6 w-12 bg-muted-foreground/20 rounded' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
