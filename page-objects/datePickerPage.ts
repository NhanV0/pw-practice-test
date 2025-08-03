import {Page, expect} from '@playwright/test'
import { HelperBase } from './helperBase';

export class DatePickerPage extends HelperBase{
    constructor( page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateFromCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const expectedStartDate = await this.selectDateFromCalendar(startDateFromToday)
        const expectedEndDate = await this.selectDateFromCalendar(endDateFromToday)
        const dateToAssert = `${expectedStartDate} - ${expectedEndDate}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateFromCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        console.log(dateToAssert)
    
        let calendarMonthAndyear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
        while(!calendarMonthAndyear.includes(expectedMonthAndYear)){
        await this.page.locator('nb-calendar-pageable-navigation [data-name ="chevron-right"]').click()
        calendarMonthAndyear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }
}