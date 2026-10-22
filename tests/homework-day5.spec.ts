import{test,expect} from './fixtures';
import { LogInPage } from './pages/logInPage';
declare const require:(moduleName: string)=> any;
const fs = require('fs');
test('Task1',async ({loggedInPage}) => {
    await expect(loggedInPage).toHaveURL(/account/);
});

test.describe('catalog hooks', () => {
    test.beforeAll(async () => {
        console.log('Suite started at:', new Date());
        
    });
    test.beforeEach(async ({page}) => {
        await page.goto('https://practicesoftwaretesting.com/');

        
        
    });
    test.afterEach(async ({page}, testInfo) => {
        if(testInfo.status !== testInfo.expectedStatus){
            const screenshot = await page.screenshot();
            await testInfo.attach('failure screenshot',{body: screenshot, contentType:'image/png'});
        }
        
    });
    test.afterAll(async () => {
        console.log('Suite finished');
        
    });
    test('Catalog page loaded', async ({page}) => {
        await expect(page).toHaveURL('https://practicesoftwaretesting.com');
        
    } );
})

type LoginData = {
    name: string;
    email: string;
    password: string;
    expectedResult: string;
};
const csvData = fs.readFileSync('test data/login-cases.csv','utf-8');
const lines = csvData.trim().split(/\r?\n/);
const headers =lines[0].split(',');
const loginCases: LoginData[] = lines.slice(1).map((line: string) =>{
    const values = line.split(',');
    return {
        name: values[0].trim(), email: values[1].trim(), password: values[2].trim(), expectedResult: values[3].trim()};
    });
    test.describe('CSV Login Test',() =>{
        for(const loginCase of loginCases){
            test('Login - ' + loginCase.name, async({page})=>{
                const logInPage = new LogInPage(page);
                await logInPage.open();
                await logInPage.login(loginCase.email, loginCase.password);
                if(loginCase.expectedResult === 'success'){
                    await expect(page).toHaveURL(/\/account/);
                }
                else{
                    const errorMessage = page.getByText('Invalid email or password');
                    await expect.poll(async () => {
                        return await errorMessage.isVisible()}).toBe(true);
                }
            });
        }
    });
