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
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
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

})