import { test, expect } from '@playwright/test'

test.describe('Template E2E Tests', () => {
  test.beforeEach(async ({ context }) => {
    // Clear cookies before each test
    await context.clearCookies()
  })


  test('should load homepage', async ({ page }) => {
    await page.goto('/')

    // Check if landing page loads correctly
    await expect(page.getByText('Best Next.js Template')).toBeVisible()
    await expect(page.locator('h1')).toContainText('Comece sua próxima aplicação full-stack com padrões seniores opinativos')
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')

    // Click login button
    await page.getByRole('link', { name: /entrar/i }).click()

    // Should be on login page
    await expect(page).toHaveURL('/login')
    await expect(page.getByText('Login')).toBeVisible()
  })

  test('should show login form validation errors', async ({ page }) => {
    await page.goto('/login')

    // Fill with invalid data
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/senha/i).fill('123')

    // Submit form to trigger validation
    await page.getByRole('button', { name: /entrar/i }).click()

    // Wait for validation errors to appear (react-hook-form validates on submit)
    await expect(page.getByText('Email inválido')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Senha deve ter pelo menos 6 caracteres')).toBeVisible({ timeout: 10000 })
  })

  test('should complete authentication flow', async ({ page }) => {
    // 1. Start at homepage
    await page.goto('/')
    await expect(page.getByRole('link', { name: /entrar/i })).toBeVisible()

    // 2. Navigate to login
    await page.getByRole('link', { name: /entrar/i }).click()
    await expect(page).toHaveURL('/login')

    // 3. Fill login form with valid credentials
    await page.getByLabel(/email/i).fill('e2e-test@example.com')
    await page.getByLabel(/senha/i).fill('password123')

    // 4. Submit form
    await page.getByRole('button', { name: /entrar/i }).click()

    // Wait for navigation or error messages
    await page.waitForTimeout(3000)

    // Check if there are any error messages on the form
    const errorMessage = page.locator('.text-red-500, .text-destructive')
    if (await errorMessage.count() > 0) {
      const errors = await errorMessage.allTextContents()
      throw new Error(`Login failed with errors: ${errors.join(', ')}`)
    }

    // 5. Should redirect to dashboard (wait for navigation)
    await expect(page).toHaveURL('/dashboard', { timeout: 15000 })
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/Bem-vindo ao seu dashboard/)).toBeVisible({ timeout: 10000 })

    // 6. Should show user as authenticated
    await expect(page.getByText('Usuário')).toBeVisible({ timeout: 10000 })
    await expect(page.getByRole('button', { name: /sair/i })).toBeVisible({ timeout: 10000 })
  })

  test('should register new user and authenticate', async ({ page }) => {
    // 1. Navigate to register
    await page.goto('/register')
    await expect(page.getByText('Cadastro')).toBeVisible()

    // 2. Fill register form with unique email
    const uniqueEmail = `testuser${Date.now()}@example.com`
    await page.getByLabel(/nome/i).fill('Test User')
    await page.getByLabel(/email/i).fill(uniqueEmail)
    await page.getByLabel(/senha/i).first().fill('password123')
    await page.getByLabel(/confirmar senha/i).fill('password123')

    // 3. Submit form
    await page.getByRole('button', { name: /criar conta/i }).click()

    // Wait for navigation or error messages
    await page.waitForTimeout(3000)

    // Check if there are any error messages
    const errorMessage = page.locator('.text-red-500, .text-destructive')
    if (await errorMessage.count() > 0) {
      const errors = await errorMessage.allTextContents()
      throw new Error(`Registration failed with errors: ${errors.join(', ')}`)
    }

    // 4. Should redirect to dashboard (wait for navigation)
    await expect(page).toHaveURL('/dashboard', { timeout: 15000 })
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 })
  })

  test('should protect dashboard route', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL('/login')
  })

  test('should logout successfully', async ({ page }) => {
    // 1. Login first
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('e2e-test@example.com')
    await page.getByLabel(/senha/i).fill('password123')
    await page.getByRole('button', { name: /entrar/i }).click()

    // Wait for login to complete
    await page.waitForTimeout(3000)

    // Check if login failed
    const errorMessage = page.locator('.text-red-500, .text-destructive')
    if (await errorMessage.count() > 0) {
      const errors = await errorMessage.allTextContents()
      throw new Error(`Login failed with errors: ${errors.join(', ')}`)
    }

    // 2. Should be authenticated
    await expect(page).toHaveURL('/dashboard', { timeout: 15000 })

    // 3. Click logout
    await page.getByRole('button', { name: /sair/i }).click()

    // 4. Should be logged out (try accessing dashboard)
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login', { timeout: 10000 })
  })
})
