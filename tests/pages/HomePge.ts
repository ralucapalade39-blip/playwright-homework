import {Page, Locator, expect} from '@playwright/test';
export class HomePage {
    readonly page : Page;
    readonly cartBadge : Locator;
    readonly cartLink : Locator;
    readonly sortDropDown : Locator;
    readonly productLinks : Locator;
    readonly visiblePrices : Locator;
    readonly quantityInput : Locator;
    readonly addToCart : Locator;
    readonly removeButton : Locator;
    readonly homeButton : Locator;


    constructor(page:Page) {
        this.page = page;
        this.cartBadge = page.locator('[data-test="cart-quantity"]');
        this.cartLink = page.locator('[data-test="nav-cart"]');
        this.sortDropDown = page.getByRole('button', {name: 'Sort'});
        this.productLinks = page.locator('[data-test="product-name"]');
        this.visiblePrices = page.locator('[data-test="product-price"]');
        this.addToCart = page.getByRole('button', {name:'Add to cart'});
        this.removeButton = page.locator('a.btn-danger');
        this.quantityInput = page.locator('[data-test="product-quantity]');
        this.homeButton = page.getByRole('link', {name: 'Home'});

    }

    async open() {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }
    async  addItemToCart(productName:string) {
        await this.productLinks.filter({hasText: productName}).click();
        await this.addToCart.click();
        
    }
    async homeMenu() {
        await this.homeButton.click();
        
    }
    async checkQuantity(quantity:number) {
        await expect(this.quantityInput).toHaveValue(String(quantity));
        
    }
    async removeItemFromCart(productName:string){
        await this.cartLink.click();
        await this.removeButton.click();

        
        
    }}