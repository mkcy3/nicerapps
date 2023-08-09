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

test('select start date, end date and number of passengers', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/trip')

  await expect(page.getByRole('button', { name: 'Check in?' })).toBeVisible()
  await page
    .locator('section')
    .filter({
      hasText:
        'August 2023SMTWTFS12345678910111213141516171819202122232425262728293031',
    })
    .getByRole('button', { name: '13' })
    .click()

  await expect(page.getByRole('textbox', { name: 'Check in' })).toHaveValue(
    'Aug 13'
  )
  await expect(page.getByRole('button', { name: 'Check out?' })).toBeVisible()

  await page
    .locator('section')
    .filter({
      hasText:
        'August 2023SMTWTFS12345678910111213141516171819202122232425262728293031',
    })
    .getByRole('button', { name: '15' })
    .click()

  await expect(page.getByRole('textbox', { name: 'Check out' })).toHaveValue(
    'Aug 15'
  )
  await expect(page.getByRole('button', { name: 'Passengers?' })).toBeVisible()

  await page.getByRole('button', { name: 'group Passengers' }).click()
  await page.getByRole('option', { name: '4' }).locator('div').click()
  await expect(page.getByRole('link', { name: 'Next' })).toBeVisible()
})
