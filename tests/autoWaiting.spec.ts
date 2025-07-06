import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://uitestingplayground.com/ajax');
  await page.getByText('Button Triggering AJAX Request').click();
  testInfo.setTimeout(testInfo.timeout + 5000); // Set timeout for this test
});

test('Auto Waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    // await successButton.click()

    // onst text = await successButton.textContents();

    // await successButton.waitFor({ state: 'attached' });
    // const text = await successButton.allTextContents();

    // expect(text).toContain('Data loaded with AJAX get request.');

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 }) // Optional timeout);
})

test('alternative auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // Wait for element 
    // await page.waitForSelector('.bg-success')
    
    // Wait for particular response
    // await page.waitForResponse(response => response.url().includes('ajaxdata'))

    // Wait for network calls to be  completed('NOT RECOMMENDED')
    // await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test('timeouts', async ({ page }) => {
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click() 

})