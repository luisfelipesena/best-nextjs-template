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
    await expect(page.locator('h1')).toContainText('Comece sua próxima aplicação')
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')
    
    // Click login button
    await page.getByRole('link', { name: /entrar/i }).click()
    
    // Should be on login page
    await expect(page).toHaveURL('/login')
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
  })

  test('should show login form validation errors', async ({ page }) => {
    await page.goto('/login')
    
    // Click submit without filling form
    await page.getByRole('button', { name: /entrar/i }).click()
    
    // Should show validation errors
    await expect(page.getByText(/email inválido/i)).toBeVisible()
    await expect(page.getByText(/senha deve ter/i)).toBeVisible()
  })

  test('should complete authentication flow', async ({ page }) => {
    // 1. Start at homepage
    await page.goto('/')
    await expect(page.getByRole('link', { name: /entrar/i })).toBeVisible()

    // 2. Navigate to login
    await page.getByRole('link', { name: /entrar/i }).click()
    await expect(page).toHaveURL('/login')

    // 3. Fill login form with valid credentials
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/senha/i).fill('password123')

    // 4. Submit form
    await page.getByRole('button', { name: /entrar/i }).click()

    // 5. Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByText('Bem-vindo ao seu dashboard')).toBeVisible()

    // 6. Should show user as authenticated
    await expect(page.getByText('Usuário')).toBeVisible()
    await expect(page.getByRole('button', { name: /sair/i })).toBeVisible()
  })

  test('should register new user and authenticate', async ({ page }) => {
    // 1. Navigate to register
    await page.goto('/register')
    await expect(page.getByRole('heading', { name: /cadastro/i })).toBeVisible()

    // 2. Fill register form
    await page.getByLabel(/nome/i).fill('Test User')
    await page.getByLabel(/email/i).fill('newuser@example.com')
    await page.locator('#password').fill('password123')
    await page.locator('#confirmPassword').fill('password123')

    // 3. Submit form
    await page.getByRole('button', { name: /criar conta/i }).click()

    // 4. Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
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
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/senha/i).fill('password123')
    await page.getByRole('button', { name: /entrar/i }).click()
    
    // 2. Should be authenticated
    await expect(page).toHaveURL('/dashboard')
    
    // 3. Click logout
    await page.getByRole('button', { name: /sair/i }).click()
    
    // 4. Should be logged out (try accessing dashboard)
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })
})