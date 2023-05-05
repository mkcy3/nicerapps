import { expect, test } from '@playwright/test'

test('booking page has months and sub calendars visible', async ({ page }) => {
  await page.goto('http://localhost:3000/booking')
  await expect(
    page.getByText(
      'MaySMTWTFS 12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'JuneSMTWTFS 123456789101112131415161718192021222324252627282930'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'JulySMTWTFS 12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'AugustSMTWTFS 12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'SeptemberSMTWTFS 123456789101112131415161718192021222324252627282930'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'OctoberSMTWTFS12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()
})
