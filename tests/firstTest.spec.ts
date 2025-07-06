import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
  // by Tag name
  await page.locator('input').first().click()

  // by ID
  page.locator('#inputEmail1')

  // by Class value
  page.locator('.shape-rectangle')

  // by attribute
  page.locator('[placeholder="Email"]')

  // by Class value (full)
  page.locator('.input-full-width.size-medium.status-basic.shape-rectangle')

  // combine different selectors
  page.locator('input[placeholder="Email"]')

  // by Xpath (NOT RECOMMENDED)
  page.locator('//input[@placeholder="Email"]')

  // by partial text
  page.locator(':text("Using")')
  
  // by exact text
  page.locator(':text-is("Using the Grid")')

})

test('User Facing', async ({ page }) => {

  // By Role
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('button', { name: 'Sign in' }).first().click()

  // By Label
  await page.getByLabel('Email').first().click()

  // By Placeholder
  await page.getByPlaceholder('Jane Doe').click()

  // By Text
  await page.getByText('Using the Grid').click()

  // By title
  await page.getByTitle('IoT Dashboard').click()

  // By test ID: define data-testid in the HTML element
  // <button data-testid="test-id">Click me</button>
  await page.getByTestId('test-id').click()
})

test('Locating Child Elements', async ({ page }) => {

  // By Child Element
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
  
  // By Child Element combine with User Facing
  await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()

  // By index
  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent Elements', async ({ page }) => {

  await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', { name: "Email" }).first().click()
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button', { name: 'Sign in' }).first().click()

  await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: "Email" }).first().click()
  await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: 'Password' }).first().click()

  await page.locator('nb-card').filter({ has: page.locator('nb-checkbox')}).filter({ hasText: "Sign in" }).getByRole('textbox', { name: 'Email' }).click()

  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).first().click()

})

test('Reusing Locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', { name: "Password" }).fill('ABC123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

})

test('Extracting values', async ({ page }) => {

  // Single text value
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // All text values
  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonLabels).toContain('Option 1')

  // Input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })
  await emailField.fill('test@test.com')
  const emailvalue = await emailField.inputValue()
  expect(emailvalue).toEqual('test@test.com')

  // Atrribute value
  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test ('assertions', async ({ page }) => {
  const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')
  // General assertions
  const value = 5
  expect(value).toBe(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  // Locator assertions
  await expect(basicFormButton).toHaveText('Submit')

  // soft assertions
  await expect.soft(basicFormButton).toHaveText('Submit5')
  await basicFormButton.click()

})