import Link from 'next/link'

export function Footer() {
  const footerSections = [
    {
      title: 'Menu',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ]

  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-4'>
          {/* Logo Section */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Logo</h3>
            <p className='text-sm text-muted-foreground'>Include logo, links, newsletter/email signup</p>
            <p className='text-sm text-muted-foreground'>Copyright, Privacy policy, social media icons</p>
          </div>

          {/* Menu Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className='space-y-4'>
              <h4 className='font-medium'>{section.title}</h4>
              <ul className='space-y-2'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className='space-y-4'>
            <h4 className='font-medium'>Newsletter</h4>
            <div className='space-y-2'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-3 py-2 text-sm border rounded-md bg-background'
              />
              <button className='w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
          <p>&copy; 2024 Best Next.js Template. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
