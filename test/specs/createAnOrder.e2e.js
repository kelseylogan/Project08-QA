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

describe('Selecting a taxi as the transportation of choice', () => {
    it('should open the taxi ordering menu', async () => {
        await browser.url(`/`)
        const fromField = await $(page.fromField);
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $(page.toField);
        await toField.setValue('1300 1st St');
        await browser.pause(10000);
        const callATaxiButton = await $(page.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
        await browser.pause(10000);
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
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(page.addCardButton);
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