import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display login form', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login')
    
    // Check if login form is visible
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/login')
    
    // Click submit without filling form
    await page.getByRole('button', { name: /entrar/i }).click()
    
    // Should show validation errors
    await expect(page.getByText(/email inválido/i)).toBeVisible()
    await expect(page.getByText(/senha deve ter/i)).toBeVisible()
  })

  test('should handle login form submission', async ({ page }) => {
    await page.goto('/login')
    
    // Fill the form
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/senha/i).fill('password123')
    
    // Submit the form
    await page.getByRole('button', { name: /entrar/i }).click()
    
    // Should show loading state
    await expect(page.getByText(/entrando/i)).toBeVisible()
  })

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/login')
    
    // Look for register link (if exists)
    const registerLink = page.getByRole('link', { name: /registrar/i })
    if (await registerLink.isVisible()) {
      await registerLink.click()
      await expect(page).toHaveURL(/register/)
    }
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/login')
    
    // Form should be visible on mobile
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
  })
})

test.describe('Dashboard Access', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Should redirect to login or show login prompt
    const isLoginPage = page.url().includes('/login')
    const hasLoginPrompt = await page.getByText(/login/i).isVisible()
    
    expect(isLoginPage || hasLoginPrompt).toBeTruthy()
  })
})

test.describe('Navigation', () => {
  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check if main navigation works
    const homeLink = page.getByRole('link', { name: /home/i })
    if (await homeLink.isVisible()) {
      await homeLink.click()
      await expect(page).toHaveURL('/')
    }
  })

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page')
    
    // Should show 404 page or redirect
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/non-existent-page')
  })
})