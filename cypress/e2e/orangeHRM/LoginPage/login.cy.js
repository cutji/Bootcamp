/// <reference types="cypress"/>

describe('Tes Fitur Login di OrangeHRM dengan Intercept', () => {

    // 1.login menggunakan data Username dan Password yang benar
    it('Berhasil login dengan Username dan Password yang benar', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.intercept('GET', '**/employees/action-summary').as('actionsummary'); 
        cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
        cy.wait('@actionsummary').its('response.statusCode').should('eq', 200);
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard');
    });

   // 2.login dengan tidak mengisi Username dan Password
   it('Gagal login tanpa mengisi Username dan Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.url().should('include', '/auth/login'); 
});

// 3. Pengguna login dengan mengisi Username tidak sesuai format dan tidak mengisi Password
it('Gagal login dengan Username tidak sesuai format dan Password kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('input[name="username"]').type('admin#@');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.url().should('include', '/auth/login');
});

// 4. Pengguna login dengan mengisi Username sesuai format dan tidak mengisi Password
it('Gagal login dengan Username yang sesuai format dan Password kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('input[name="username"]').type('Admin');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.url().should('include', '/auth/login');
});

// 5. Pengguna login dengan tidak mengisi Username dan memasukkan Password yang benar
it('Gagal login dengan Username kosong dan Password yang benar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('input[name="password"]').type('admin123');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.url().should('include', '/auth/login');
});

// 6. Pengguna login dengan mengisi Username yang benar dan Password yang salah
it('Gagal login dengan Username yang benar dan Password yang salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin2322');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();;
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
});

// 7. Pengguna login dengan mengisi Username yang salah dan Password yang benar
it('Gagal login dengan Username yang salah dan Password yang benar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('input[name="username"]').type('admin3');
    cy.get('input[name="password"]').type('admin123');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
});

// 8. Pengguna login dengan mengisi Password kurang dari 8 karakter
it('Gagal login dengan Password kurang dari 8 karakter', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin12');
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
});
});