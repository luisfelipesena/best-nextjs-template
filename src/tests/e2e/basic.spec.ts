import { test, expect } from '@playwright/test'

test.describe('Basic Template Tests', () => {
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

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/')
    
    // Click register button
    await page.getByRole('link', { name: /cadastrar/i }).click()
    
    // Should be on register page
    await expect(page).toHaveURL('/register')
    await expect(page.getByRole('heading', { name: /cadastro/i })).toBeVisible()
  })

  test('should show login form fields', async ({ page }) => {
    await page.goto('/login')
    
    // Check form fields
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/senha/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible()
  })

  test('should show register form fields', async ({ page }) => {
    await page.goto('/register')
    
    // Check form fields
    await expect(page.getByLabel(/nome/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /criar conta/i })).toBeVisible()
  })
})