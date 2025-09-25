import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { LoginForm } from '@/features/auth/components/login-form'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render login form fields', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should show validation errors for invalid input', async () => {
    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
    })
  })

  it('should update input values when typing', () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('should clear error when user starts typing', async () => {
    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    const emailInput = screen.getByLabelText(/email/i)

    // Trigger validation error
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
    })

    // Start typing to clear error
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    await waitFor(() => {
      expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument()
    })
  })

  it('should show loading state during submission', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/senha/i)
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    // Should show loading state briefly
    expect(submitButton).toHaveTextContent(/entrando/i)
  })
})