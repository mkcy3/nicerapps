import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 375, height: 600 } })

test('should be able to open and close mobile menu', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await page.getByTestId('open-mobile-menu').click()
  await expect(page.getByTestId('mobile-menu')).toBeVisible()

  await page.getByTestId('close-mobile-menu').click()
  await expect(page.getByTestId('mobile-menu')).toBeHidden()
})
