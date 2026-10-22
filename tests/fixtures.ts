import {test as base, expect, type Page} from '@playwright/test';
import {LogInPage} from './pages/logInPage';
type Fixtures = {
    loggedInPage : Page;
};
export const test = base.extend<Fixtures> ({
    loggedInPage : async ({page}, use) => {
        const login = new LogInPage(page);
        await login.open();
        await login.login('customer@practicesoftwaretesting.com','welcome01');
        await use(page);
    }
});
export{expect};