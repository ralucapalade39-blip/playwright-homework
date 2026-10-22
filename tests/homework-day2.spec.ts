import {test, expect} from '@playwright/test';
test ('search for pliers', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const search = page.getByRole('textbox',{name: 'Search'});
    await search.dblclick();
    await search.fill('Pliers');
    await expect(search).toHaveValue('Pliers');
    await page.getByRole('button', {name: 'Search'}).click();
    const productTitles = page.locator('[data-test="product-name"]');
    await expect(productTitles).toHaveCount(4);
});

test ('Filter for Hammer', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const check = page.getByLabel('Hammer');
    await check.check();
    await expect(check).toBeChecked();
    const prodTitle = page.locator('[data-test = "product-name"]');
    await expect(prodTitle).toHaveCount(7);
    await check.uncheck();
    await expect(check).not.toBeChecked();

    
});

test ('Alphabetical Order', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.getByLabel('Sort').selectOption('Name (A - Z)');
    const prodTitle = page.locator('.card-title');
    await expect(prodTitle).toHaveCount(9);
    await expect(prodTitle.first()).toContainText('Adjustable Wrench');
    await expect(prodTitle.first()).toHaveClass('card-title');

    
});

test ('Add items', async ({page}) => {
    await page.goto('https://practicesoftwaretesting.com/');
    const product=page.getByText('Combination Pliers');
    await product.hover();
    await product.click();
    await expect(page.getByRole('heading', {name:'Combination Pliers',level:1})).toBeVisible();
    let quantity = page.getByRole('spinbutton', {name:'Quantity'});
    await expect(quantity).toHaveValue('1');
    await page.getByRole('button', {name:'Increase Quantity'}).click();
    await expect(quantity).toHaveValue('2');
    await page.getByRole('button', {name:'Add to Cart'}).click();
    await expect(page.getByText('Product added to shopping cart.')).toBeVisible();
    const cart = page.getByRole('link',{name:/cart/i});
    await expect(cart).toBeVisible();
    await expect(cart).toContainText('2');
    
});
