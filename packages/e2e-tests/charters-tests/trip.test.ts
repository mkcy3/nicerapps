import { expect, test } from '@playwright/test'

test('booking page has months and sub calendars visible', async ({ page }) => {
  await page.goto('http://localhost:3000/trip')
  await expect(
    page.getByText(
      'May 2023SMTWTFS12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'June 2023SMTWTFS123456789101112131415161718192021222324252627282930'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'July 2023SMTWTFS12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'August 2023SMTWTFS12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'September 2023SMTWTFS123456789101112131415161718192021222324252627282930'
    )
  ).toBeVisible()

  await expect(
    page.getByText(
      'October 2023SMTWTFS12345678910111213141516171819202122232425262728293031'
    )
  ).toBeVisible()
})
