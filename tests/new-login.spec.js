import {test,expect} from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
const testData = require('../fixtures/loginFixture.json');

test.beforeEach('login',async({page})=>{
    await page.goto('/'); 
});

test.describe('Valid login tests',()=>{
    test('Login using valid username and password',async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.validUser.userName,testData.validUser.password);
        // await login.login("sichu@gmail.com","sichu123");
        await login.verifyValidLogin();
    });    
});

test.describe('Invalid login tests',()=>{
    test('Login using invalid username and valid password',async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.invalidUser.userName,testData.validUser.password);
        // await login.login("minni@gmail.com","sichu123");
        await login.verifyInvalidLogin();
    });    

    test('Login using valid username and invalid password',async({page})=>{
        const login=new LoginPage(page);
        await login.login(testData.validUser.userName,testData.invalidUser.password);
        // await login.login("sichu@gmail.com","minni123");
        await login.verifyInvalidLogin();
    });    
});