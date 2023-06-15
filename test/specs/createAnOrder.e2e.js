const page = require('../../page');
const helper = require('../../helper')


describe('Ordering a Taxi from Urban Routes', () => {
    it('should set the "To" and "From" addresses', async () => {
        await browser.url(`/`)
        const fromField = await $(page.fromField);
        await fromField.setValue('East 2nd Street, 601');
        const toField = await $(page.toField)
        await toField.setValue('1300 1st St')
    }),

    it('should select Supportive taxi as the transportation of choice', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await browser.pause(2000);
        const supportiveTaxi = await $('div=Supportive');
        await supportiveTaxi.waitForDisplayed();
        await supportiveTaxi.click();
        await supportiveTaxi.isFocused();
    }),

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    }),

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    }),

    it('should add a credit card to the order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi = await $('div=Supportive');
        await supportiveTaxi.click();
        await page.addPaymentMethod();
        const creditCardField = await $(page.creditCardField);
        await creditCardField.setValue('253795093758');
        const cardCode = await $('.card-input#code');
        await cardCode.setValue('13');
        const blankSpace = await $('.pp-separator')
        await blankSpace.click();
        const linkButton = await $('button=Link');
        await expect(linkButton).toBeExisting();
        await linkButton.click();
        const addCardButton = await $('div=Add card');
        await expect(addCardButton).toBeClickable();
    }),

    it('should add a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageField = await $(page.messageField);
        await expect(messageField).toBeExisting();
        await messageField.setValue('Pick up some ice cream!');
        await expect(messageField).toHaveValue('Pick up some ice cream!');
    }),

    it('should add a blanket and handkerchief to the order', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi = await $('div=Supportive');
        await supportiveTaxi.click();
        const orderRequirementsButton = await $('.reqs-header');
        await expect(orderRequirementsButton).toBeExisting();
        await orderRequirementsButton.click();
        await orderRequirementsButton.click();
        const blanketAndHandkerchiefsButton = await $('.r-sw');
        await expect(blanketAndHandkerchiefsButton).toBeExisting();
        await blanketAndHandkerchiefsButton.click();
        await blanketAndHandkerchiefsButton.isSelected();
    }),

    it('should have car search modal pop up', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTaxi = await $('div=Supportive');
        await supportiveTaxi.click();
        const smartButton = await $('//div/button[@class="smart-button"]');
        await expect(smartButton).toBeExisting();
        await smartButton.click();
        const carSearchModal = await $('.order-header-time');
        await carSearchModal.toBeDisplayed();
    })
})
