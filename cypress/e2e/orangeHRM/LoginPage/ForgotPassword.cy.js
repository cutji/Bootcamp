/// <reference types="cypress"/>
import loginPage from "../../../pom/orangeHRM/Login/login";
import forgotPassword from "../../../pom/orangeHRM/Login/ForgotPassword";

describe('Tes Fitur Forgot Password', () => {
   it('Reset password dengan username yang valid', () => {
       cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
       loginPage.textLogin().should('have.text','Login');
       forgotPassword.buttonForgotPassword().click();
       forgotPassword.textResetPassword().should('have.text', 'Reset Password');
       forgotPassword.inputUsername().type('Admin');
       cy.intercept("GET", "**/index.php/auth/sendPasswordReset").as("sendPasswordReset");
       forgotPassword.buttonResetPassword().click();
       cy.wait("@sendPasswordReset").then((intercept)=>{
        expect(intercept.response.statusCode).to.equal(200)
       });
       forgotPassword.textResetPassword().should('have.text','Reset Password link sent successfully')
    })

    it('Reset tanpa mengisi Username',()=>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        forgotPassword.buttonForgotPassword().click();
        forgotPassword.inputUsername().should('have.value', '');
        forgotPassword.buttonResetPassword().click();
        forgotPassword.messageRequired().should('have.text','Required');
    })
})