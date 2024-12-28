export default class forgotPassword {
    static buttonForgotPassword(){
        return cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]')
    }
    static textResetPassword(){
        return cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]')
    }
    static inputUsername(){
        return cy.get('[class="oxd-input oxd-input--active"]')
    }
    static buttonResetPassword(){
        return cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]')
    }
    static messageRequired(){
        return cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]')
    }

}