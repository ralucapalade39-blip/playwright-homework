import {test, expect} from '@playwright/test';
import loginData from '../test data/login.json';
test('Login using JSON data', async ({page})=>{
    await page.goto('https://practicesoftwaretesting.com/auth/login');
    await page.locator('#email').fill(loginData.validUser.email);
    await page.locator('#password').fill(loginData.validUser.password);
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
});