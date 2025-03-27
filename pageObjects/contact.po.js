const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;
        this.addContactButton = '//button[@id="add-contact"]';
        this.firstNameInput = '//input[@id="firstName"]';
        this.lastNameInput = '//input[@placeholder="Last Name"]';
        this.dobInput = '//input[@placeholder="yyyy-MM-dd"]';
        this.emailInput = '//input[@placeholder="example@email.com"]';
        this.phoneInput = '//input[@placeholder="8005551234"]';
        this.address1Input = '//input[@placeholder="Address 1"]';
        this.address2Input = '//input[@placeholder="Address 2"]';
        this.cityInput = '//input[@placeholder="City"]';
        this.stateInput = '//input[@placeholder="State or Province"]';
        this.zipCodeInput = '//input[@placeholder="Postal Code"]';
        this.countryInput = '//input[@placeholder="Country"]';
        this.saveButton = '//button[@id="submit"]';
        this.contactListItem = name => `//td[contains(text(),"${name}")]`;
        this.editButton = '//button[@id="edit-contact"]';
        this.validateContactCreated='//td[text()="John Doe"]';
    }

    async contactAdd(firstName, lastName, dob, email, phone, address1, address2, city, state, zip, country) {
        await this.page.locator(this.addContactButton).waitFor({ state: 'visible' }); 
        await this.page.locator(this.addContactButton).click();
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.dobInput).fill(dob);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.phoneInput).fill(phone);
        await this.page.locator(this.address1Input).fill(address1);
        await this.page.locator(this.address2Input).fill(address2);
        await this.page.locator(this.cityInput).fill(city);
        await this.page.locator(this.stateInput).fill(state);
        await this.page.locator(this.zipCodeInput).fill(zip);
        await this.page.locator(this.countryInput).fill(country);
        await this.page.locator(this.saveButton).waitFor({ state: 'visible' }); 
        await this.page.locator(this.saveButton).click();

        await expect(this.page.locator(this.contactListItem(firstName))).toBeVisible({ timeout: 5000 });
    }

    async viewContact() {
        await this.page.locator(this.validateContactCreated).click();
    }
    async validateContactCreated(firstName){
        const contactLocator = (this.contactListItem(firstName));
        await expect(contactLocator).toBeVisible();
    }

    async validateContactEdit(){

        await this.page.waitForTimeout(2000);

        const element = await this.page.locator('//span[@id="firstName"]');
        const text = await element.textContent();
        expect(text.trim()).toBe('Sanjana');


    }

    async editContact(newFirstName){
        await this.page.locator(this.editButton).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(this.firstNameInput).clear();
        await this.page.locator(this.firstNameInput).fill(newFirstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.saveButton).click();
        await this.page.waitForTimeout(2000);

    }
};