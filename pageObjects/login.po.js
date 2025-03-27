const {expect} = require("@playwright/test"); //import gareko, expect function use garna milxa

exports.LoginPage=class LoginPage{
    constructor(page){
        this.page=page;
        this.usernameInput='//input[@placeholder="Email"]';
        this.passwordInput='//input[@placeholder="Password"]';
        this.loginButton='//button[@id="submit"]';
        this.logOut='//button[@id="logout"]';
        this.loginValidation='//p[contains(text(),"Click on any Contact to View the Contact Details")]';
        this.alterMessage='//span[@id="error"]';
    }

    async login(username,password) { 
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyValidLogin(){
        const loginValidationLocator = this.page.locator('//p[contains(text(),"Click on any contact to view the Contact Details")]');
        await expect(loginValidationLocator).toBeVisible();
        await expect(loginValidationLocator).toContainText("Click on any contact to view the Contact Details");
    }

    async verifyInvalidLogin() {
        const loginInvalidationLocator = this.page.locator(this.alterMessage);
        await expect(loginInvalidationLocator).toBeVisible();
        await expect(loginInvalidationLocator).toContainText("Incorrect username or password");
    }
};