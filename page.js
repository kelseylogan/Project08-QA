module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardField: '#number',
    messageField: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addPaymentMethod: async function() {
        const paymentMethod = await $('.pp-text');
        await expect(paymentMethod).toBeExisting();
        await paymentMethod.click();
        const addCardButton = await $('div=Add card');
        await expect(addCardButton).toBeExisting();
        await addCardButton.click();
    },
    addCreditCard: async function() {
        const paymentMethod = await $('.pp-text');
        await expect(paymentMethod).toBeExisting();
        await paymentMethod.click();
        const addCardButton = await $('div=Add card');
        await expect(addCardButton).toBeExisting();
        await addCardButton.click();
        const creditCardField = await $(page.creditCardField);
        await creditCardField.setValue('253795093758');
        const cardCode = await $('.card-input#code');
        await cardCode.setValue('13');
        const linkButton = await $('button=Link');
        await expect(linkButton).toBeExisting();
        await linkButton.click();
        const closePaymentWindow = await $('button.close-button.section-close')
        await closePaymentWindow.click();
        const payType = await $('.pp-value-text');
        const payTypeText = await payType.getText();
        await expect(payTypeText).toBe('Card');
    },
    openPhoneModal: async function() {
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    },
    phoneInput: async function () {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    },
};