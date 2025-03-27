import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po.js';
import { ContactPage } from '../pageObjects/contact.po.js';
const testData = require('../fixtures/loginFixture.json');
const ContactTestData = require('../fixtures/contactFixture.json');
const {authenticateUser,getEntity,createEntity,deleteEntity,validateEntity} = require('../helper.spec.js');
let accessToken;

test.beforeEach('Login', async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
});

test.describe('Contact Testcases', () => {

    test('Contact Add Test', async ({ page,context,request }) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(//contact page ko class banayera add garne data haru yo sabai json file bata aayo
            ContactTestData.contact.firstName,
            ContactTestData.contact.lastName,
            ContactTestData.contact.dob,
            ContactTestData.contact.email,
            ContactTestData.contact.phoneNumber,
            ContactTestData.contact.add1,
            ContactTestData.contact.add2,
            ContactTestData.contact.city,
            ContactTestData.contact.state,
            ContactTestData.contact.code,
            ContactTestData.contact.country
        );
        await contact.viewContact();//heryoo
        await contact.validateContactCreated(ContactTestData.contact.firstName);//data same xa ki xaina validate garyo
        accessToken =await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});//api ma login garne bhneko accesstoken haru line ho
        await createEntity(Data,accessToken, '/contacts', {request});
        page.reload();
        const id=await getEntity(accessToken,'/contacts','200',{request});//getEntity bhnne function banako(aunthenicate bata aako access token ani kun api ma use garne ta tesma hamro id haru aauxa)
        await deleteEntity(accessToken,`/contacts/${id}`,{request});// tyo id y=use garera delete garxa,id msthi bata aauxa hamro get id gareko id delete gardinxa
        await validateEntity(accessToken,`/contacts/${id}`,'404',{request});
    });
    
    test.only('Contact Edit Test', async ({ page, request }) => {
        
        const Data ={
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "streetadd1": "123 Main St",
            "city": "City1",
            "Province": "Province1",
            "PostalCode": "A1A1A1",
            "Country": "Canada"
        };

        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, {request});
        await createEntity(Data, accessToken, '/contacts', {request});//post method call garxaa ani contact create garxa
        page.reload();//contact add garepaxi tyo page lai refresh gareko
        await contact.viewContact();//view garne
        await contact.editContact(ContactTestData.ContactEdit.newFirstName);//data haru change garne,json bata
        await contact.validateContactEdit();
        const id=await getEntity(accessToken, '/contacts', '200', {request});
        await deleteEntity (accessToken, `/contacts/${id}`, {request});
        await validateEntity(accessToken, `/contacts/${id}`, '404', {request});
    })
    });