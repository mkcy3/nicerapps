import { expect, test } from '@playwright/test'

test('homepage has heading on it', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(
    page.getByRole('heading', { name: 'Go sailing on Georgian Bay' })
  ).toBeVisible()
})
