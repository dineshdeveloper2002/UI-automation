import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export class LoginPage extends BasePage {
    loginButton: Locator;
    emailField: Locator;
    passwordField: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        super(page)
        this.emailField = page.getByPlaceholder('Email')
        this.passwordField = page.getByPlaceholder('Password')
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
    }

    async authenticateUser({ username, password }: { username: string, password: string }) {
        await this.emailField.fill(username)
        await this.passwordField.fill(password)
        await this.signInButton.click()
    }

    async navigateToUrl(baseURl: string) {
        await this.page.goto(baseURl)
    }
}