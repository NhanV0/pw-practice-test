import {Page} from '@playwright/test';
import { HelperBase } from './helperBase';

export class FormLayoutsPage extends HelperBase{
    constructor( page: Page) {
        super(page)
    }

    /**
     * This method submits the form using the grid layout with the provided parameters.
     * @param email - valid email address
     * @param password -    valid password
     * @param optionText - text of the radio button to be checked
     */
    async submitUsingTheGridForm(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({ force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method submits the inline form with the provided parameters.
     * @param name - should be first and last name
     * @param email - valid email address
     * @param remember - true or false if user wants to be remembered
     */
    async submitInlineForm(name: string, email: string, remember: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name)
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if (remember) {
            await inlineForm.getByRole('checkbox').check({ force: true })
        }
        await inlineForm.getByRole('button').click()
    }
}