import { test, expect } from '@playwright/test'

test.describe('Basic E2E Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Best Next.js Template' })).toBeVisible()
    await expect(page.getByText('Social Proof builds trust among others')).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL('/login')
    await expect(page.getByText('Login')).toBeVisible()
  })

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page).toHaveURL('/register')
    await expect(page.getByText('Cadastro')).toBeVisible()
  })

  test('should protect dashboard route', async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies()

    // Navigate to dashboard route (should redirect to login)
    const _response = await page.goto('/dashboard')

    // Wait a bit for any client-side redirects
    await page.waitForTimeout(2000)

    // Check if we're redirected to login or if there's no user name visible (indicating not authenticated)
    const currentUrl = page.url()
    const isOnLogin = currentUrl.includes('/login')
    const hasUserName = await page.locator('text=Bem-vindo ao seu dashboard').isVisible()

    // Should either be redirected to login OR not show authenticated content
    expect(isOnLogin || !hasUserName).toBe(true)
  })

  test('should show login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('should show register form', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /criar conta/i })).toBeVisible()
  })
})
