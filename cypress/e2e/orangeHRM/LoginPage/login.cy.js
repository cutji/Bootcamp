/// <reference types="cypress"/>
import loginPage from "../../../pom/orangeHRM/Login/login";

describe('Tes Fitur Login di OrangeHRM dengan Intercept dan POM', () => {

    // 1.login menggunakan data Username dan Password yang benar
    it('Berhasil login dengan Username dan Password yang benar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputusername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept('GET', '**/employees/action-summary').as('actionsummary'); 
        loginPage.buttonLogin().click();
        cy.wait('@actionsummary').its('response.statusCode').should('eq', 200);
        loginPage.menuDashboard().should('have.text', 'Dashboard');
    });

   // 2.login dengan tidak mengisi Username dan Password
   it('Gagal login tanpa mengisi Username dan Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    loginPage.buttonLogin().click();
    cy.url().should('include', '/auth/login'); 
    });

    // 3. login dengan mengisi Username tidak sesuai format dan tidak mengisi Password
    it('Gagal login dengan Username tidak sesuai format dan Password kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.inputusername().type('admin#@');
        loginPage.buttonLogin().click();
        cy.url().should('include', '/auth/login');
    });

    // 4. login dengan mengisi Username sesuai format dan tidak mengisi Password
    it('Gagal login dengan Username yang sesuai format dan Password kosong', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.inputusername().type('Admin');
        loginPage.buttonLogin().click();
        cy.url().should('include', '/auth/login');
    });

    // 5. login dengan tidak mengisi Username dan memasukkan Password yang benar
    it('Gagal login dengan Username kosong dan Password yang benar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.inputusername().type('admin123');
        loginPage.buttonLogin().click();
        cy.url().should('include', '/auth/login');
    });

    // 6. login dengan mengisi Username yang benar dan Password yang salah
    it('Gagal login dengan Username yang benar dan Password yang salah', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.inputusername().type('Admin');
        loginPage.inputPassword().type('admin2322');
        loginPage.buttonLogin().click();
        loginPage.alertInvalidCredentials().should('contain.text', 'Invalid credentials');
    });

    // 7. login dengan mengisi Username yang salah dan Password yang benar
    it('Gagal login dengan Username yang salah dan Password yang benar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.inputusername().type('admin3');
        loginPage.inputPassword().type('admin123');
        loginPage.buttonLogin().click();
        loginPage.alertInvalidCredentials().should('contain.text', 'Invalid credentials');
    });

    // 8. login dengan mengisi Password kurang dari 8 karakter
    it('Gagal login dengan Password kurang dari 8 karakter', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        loginPage.inputusername().type('Admin');
        loginPage.inputPassword().type('admin12');
        loginPage.buttonLogin().click();
        loginPage.alertInvalidCredentials().should('contain.text', 'Invalid credentials');
    });
    });