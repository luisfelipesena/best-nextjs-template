import { test, expect } from '@playwright/test'

test.describe('Basic E2E Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Comece sua próxima aplicação')
    await expect(page.getByText('Best Next.js Template')).toBeVisible()
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
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
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