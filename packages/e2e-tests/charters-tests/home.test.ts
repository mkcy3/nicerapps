import { expect, test } from '@playwright/test'

test('homepage has next.js on it', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(
    page.getByRole('heading', { name: 'Georgian Bay Sailing Yacht Cruises' })
  ).toBeVisible()
})
