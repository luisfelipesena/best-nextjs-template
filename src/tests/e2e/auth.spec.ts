import { test, expect } from '@playwright/test'

test.describe('Template E2E Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    
    // Check if landing page loads correctly
    await expect(page.getByText('Best Next.js Template')).toBeVisible()
    await expect(page.getByText('Comece sua próxima aplicação')).toBeVisible()
  })

  test('should display login form', async ({ page }) => {
    await page.goto('/login')
    
    // Check if login form is visible
    await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('should display register form', async ({ page }) => {
    await page.goto('/register')
    
    // Check if register form is visible
    await expect(page.getByRole('heading', { name: /cadastro/i })).toBeVisible()
    await expect(page.getByLabel(/nome/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /criar conta/i })).toBeVisible()
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login')
    
    // Click submit without filling form
    await page.getByRole('button', { name: /entrar/i }).click()
    
    // Should show validation errors
    await expect(page.getByText(/email inválido/i)).toBeVisible()
    await expect(page.getByText(/senha deve ter/i)).toBeVisible()
  })

  test('should navigate between login and register', async ({ page }) => {
    await page.goto('/login')
    
    // Navigate to register
    await page.getByRole('link', { name: /cadastre-se/i }).click()
    await expect(page).toHaveURL('/register')
    
    // Navigate back to login
    await page.getByRole('link', { name: /fazer login/i }).click()
    await expect(page).toHaveURL('/login')
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Landing page should be visible on mobile
    await expect(page.getByText('Best Next.js Template')).toBeVisible()
  })
})