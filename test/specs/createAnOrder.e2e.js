const page = require('../../page');
const helper = require('../../helper')


describe('Setting the addresses', () => {
    it('should set the "To" and "From" addresses', async () => {
        await browser.url(`/`)
        const fromField = await $(page.fromField);
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $(page.toField)
        await toField.setValue('1300 1st St')
        await browser.pause(10000);
    })
})

describe('Selecting a Supportive taxi as the transportation of choice', () => {
    it('should select Supportive taxi', async () => {
        await browser.url(`/`)
        const fromField = await $(page.fromField);
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $(page.toField);
        await toField.setValue('1300 1st St');
        await browser.pause(10000);
        const callATaxiButton = await $(page.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
        const supportiveTaxi =$('div=Supportive');
        await supportiveTaxi.waitForDisplayed();
        await supportiveTaxi.click();
    })
})

describe('Filling in phone number', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
})

describe('Adding a credit card ', () => {
    it('should add a credit card to the order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi =$('div=Supportive');
        await supportiveTaxi.click();
        const paymentMethod = $('.pp-text');
        await paymentMethod.waitForDisplayed();
        await paymentMethod.click();
        const addCardButton = await $('.pp-checkbox');
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const creditCardField = await $(page.creditCardField);
        await creditCardField.setValue('253795093758');
        const codeField = await $(page.codeField);
        await codeField.setValue('13');
        await browser.pause(10000);
    })
})

describe('Writing a message to the driver', () => {
    it('should add a message', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageField = await $(page.messageField);
        await messageField.setValue('Pick up some ice cream!');
        await browser.pause(10000);
    })
})

describe('Ordering a blanket and handkerchiefs', () => {
    it('should add a blanket and handkerchief to the order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderRequirementsButton =$('.reqs-arrow');
        await orderRequirementsButton.click();
        const blanketAndHandkerchiefsButton = $('.r-sw');
        await orderRequirementsButton.waitForClickable();
        await blanketAndHandkerchiefsButton.click();
        
    })
})

describe('The car search modal appears', () => {
    it('should have car search modal pop up', async () => {
       
    })
})
