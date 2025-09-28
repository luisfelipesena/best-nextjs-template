'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'How it works', href: '/how-it-works' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
  ]

  return (
    <nav className='sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='text-xl font-bold'>
            Logo
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button variant='ghost' asChild>
              <Link href='/login'>Login</Link>
            </Button>
            <Button asChild>
              <Link href='/register'>CTA</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button variant='ghost' size='sm' className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 border-t'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className='px-3 py-2 space-y-2'>
                <Button variant='ghost' className='w-full justify-start' asChild>
                  <Link href='/login'>Login</Link>
                </Button>
                <Button className='w-full' asChild>
                  <Link href='/register'>CTA</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
