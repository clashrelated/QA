import {test,expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';

test.beforeEach('login',async({page})=>{
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    // await page.goto('/'); base url ma gayera url haleko so *8+++++++aba / matra halda ni hunxa cause its stored
});

// test.describe('Valid login tests', () => {
//     test.only('Login using valid username and password', async ({ page }) => {
//         const login = new LoginPage(page);
//         await login.login();
//         await login.verifyValidLogin();
//     });
// });

test('login using valid credentials', async ({ page }) => {
    // await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    await page.locator("//input[@id='email']").fill('sichu@gmail.com');
    await page.locator("//input[@id='password']").fill('sichu123');
    await page.locator("//button[@id='submit']").click();

    await expect(page.locator("//h1")).toHaveText("Contact List");

    // await page.getByRole('textbox', { name: 'Email' }).click();
    // await page.getByRole('textbox', { name: 'Email' }).fill('sichu@gmail.com');

    // await page.getByRole('textbox', { name: 'Password' }).click();
    // await page.getByRole('textbox', { name: 'Password' }).fill('sichu123');

    // await page.getByRole('button', { name: 'Submit' }).click();
    
    // await expect(page).toHaveTitle(/My Contacts/);
});

test('login using invalid email', async ({ page }) => {
    // await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    // await page.getByRole('textbox', { name: 'Email' }).click();
    // await page.getByRole('textbox', { name: 'Email' }).fill('minni@gmail.com');

    // await page.getByRole('textbox', { name: 'Password' }).click();
    // await page.getByRole('textbox', { name: 'Password' }).fill('sichu123');

    // await page.getByRole('button', { name: 'Submit' }).click();

    await page.locator("//input[@id='email']").fill('minni@gmail.com');
    await page.locator("//input[@id='password']").fill('sichu123');
    await page.locator("//button[@id='submit']").click();

    await expect(page.locator("//h1")).toHaveText("Contact List App");
});

test('login using invalid password', async ({ page }) => {
    // await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    // await page.getByRole('textbox', { name: 'Email' }).click();
    // await page.getByRole('textbox', { name: 'Email' }).fill('sichu@gmail.com');

    // await page.getByRole('textbox', { name: 'Password' }).click();
    // await page.getByRole('textbox', { name: 'Password' }).fill('password123');

    // await page.getByRole('button', { name: 'Submit' }).click();

    await page.locator("//input[@id='email']").fill('sichu@gmail.com');
    await page.locator("//input[@id='password']").fill('password123');
    await page.locator("//button[@id='submit']").click();

    await expect(page.locator("//h1")).toHaveText("Contact List App");
});

test('login without any credentials', async ({ page }) => {
    // await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    // await page.getByRole('textbox', { name: 'Email' }).click();
    // await page.getByRole('textbox', { name: 'Email' }).fill('');

    // await page.getByRole('textbox', { name: 'Password' }).click();
    // await page.getByRole('textbox', { name: 'Password' }).fill('');

    // await page.getByRole('button', { name: 'Submit' }).click();

    await page.locator("//input[@id='email']").fill('');
    await page.locator("//input[@id='password']").fill('');
    await page.locator("//button[@id='submit']").click();

    await expect(page.locator("//h1")).toHaveText("Contact List App");
});