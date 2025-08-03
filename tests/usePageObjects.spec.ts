import {test, expect} from '@playwright/test'
import {PageManager} from '../page-objects/pageObjectManager'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test('navigate to Form page', async ({ page }) => {
  const pm  = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
  const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridForm('test@test.com', 'welcome1', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineForm('John Doe', 'John@test.com', false)
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 10)
})   