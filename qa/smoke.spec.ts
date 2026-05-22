/**
 * qa/smoke.spec.ts — MandiRates post-deploy smoke tests
 * Run: BASE_URL=https://mandirates.app npx playwright test qa/smoke.spec.ts
 */
import { test, expect } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

test.describe('MandiRates Smoke Tests', () => {
  test('homepage loads and H1 is visible', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle(/MandiRates/)
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
  })

  test('hero badge visible', async ({ page }) => {
    await page.goto(BASE_URL)
    const badge = page.locator('text=mandirates · live mandi prices')
    await expect(badge).toBeVisible()
  })

  test('primary CTA visible and links to #prices', async ({ page }) => {
    await page.goto(BASE_URL)
    const cta = page.locator('a[href="#prices"]').first()
    await expect(cta).toBeVisible()
  })

  test('marquee bar renders commodity items', async ({ page }) => {
    await page.goto(BASE_URL)
    const marquee = page.locator('text=Wheat').first()
    await expect(marquee).toBeVisible()
  })

  test('price sections visible', async ({ page }) => {
    await page.goto(BASE_URL)
    // Wait for ISR data or fallback
    const priceSection = page.locator('#prices')
    await expect(priceSection).toBeVisible()
  })

  test('MSP CTA section visible', async ({ page }) => {
    await page.goto(BASE_URL)
    const mspLink = page.locator('a[href="/msp"]').first()
    await expect(mspLink).toBeVisible()
  })

  test('How It Works section renders', async ({ page }) => {
    await page.goto(BASE_URL)
    const howItWorks = page.locator('#how-it-works')
    await expect(howItWorks).toBeVisible()
  })

  test('Features section renders', async ({ page }) => {
    await page.goto(BASE_URL)
    const features = page.locator('#features')
    await expect(features).toBeVisible()
  })

  test('FAQ section renders and accordion works', async ({ page }) => {
    await page.goto(BASE_URL)
    const faq = page.locator('#faq')
    await expect(faq).toBeVisible()
    // Click first FAQ item
    const firstQuestion = faq.locator('button').first()
    await firstQuestion.click()
    // Content should expand
    await expect(faq.locator('[data-state=open]').first()).toBeVisible()
  })

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1)
  })

  test('/msp route returns 200', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/msp`)
    expect(response?.status()).toBe(200)
  })

  test('robots.txt accessible', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/robots.txt`)
    expect(response?.status()).toBe(200)
  })

  test('llms.txt accessible', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/llms.txt`)
    expect(response?.status()).toBe(200)
  })
})
