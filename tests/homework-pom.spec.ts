import{test, expect} from '@playwright/test';
import { HomePage } from './pages/HomePge';
test ('Adding Items', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.addItemToCart('Combination Pliers');
    await homePage.homeMenu();
    await homePage.addItemToCart('Bolt Cutters');
    await homePage.homeMenu();
    await expect(homePage.cartBadge).toHaveText('2');
    
});

test('Removing Items', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.addItemToCart('Combination Pliers');
    await homePage.homeMenu();
    await homePage.addItemToCart('Bolt Cutters');
    await homePage.removeItemFromCart('Combination Pliers');
    await expect(homePage.cartBadge).toHaveText('1');
    
})
    
