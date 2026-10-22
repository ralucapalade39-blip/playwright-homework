import {type Page, type Locator} from '@playwright/test';
export class LogInPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor (page:Page){
        this.page=page;
        this.emailInput=page.getByLabel('Email');
        this.passwordInput=page.locator('[data-test="password"]');
        this.loginButton = page.getByRole('button',{name:'LogIn'});
    }
    async open(): Promise<void>{
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }
    async login(username: string, password: string): Promise<void>{
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}