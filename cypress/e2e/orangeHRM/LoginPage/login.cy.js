/// <reference types="cypress"/>

describe('Tes Fitur Login di OrangeHRM', () => {
    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Buka halaman login
    });

    // 1. Pengguna login menggunakan data Username dan Password yang benar
    it('Berhasil login dengan Username dan Password yang benar', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('h6').should('contain.text', 'Dashboard');
    });

    // 2. Pengguna login dengan tidak mengisi Username dan Password
    it('Gagal login tanpa mengisi Username dan Password', () => {
        cy.get('button[type="submit"]').click(); 
        cy.url().should('include', '/auth/login'); 
    });

    // 3. Pengguna login dengan mengisi Username tidak sesuai format dan tidak mengisi Password
    it('Gagal login dengan Username tidak sesuai format dan Password kosong', () => {
        cy.get('input[name="username"]').type('admin#@');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/auth/login');
    });

    // 4. Pengguna login dengan mengisi Username sesuai format dan tidak mengisi Password
    it('Gagal login dengan Username yang sesuai format dan Password kosong', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/auth/login');
    });

    // 5. Pengguna login dengan tidak mengisi Username dan memasukkan Password yang benar
    it('Gagal login dengan Username kosong dan Password yang benar', () => {
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/auth/login');
    });

    // 6. Pengguna login dengan mengisi Username yang benar dan Password yang salah
    it('Gagal login dengan Username yang benar dan Password yang salah', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin2322');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });

    // 7. Pengguna login dengan mengisi Username yang salah dan Password yang benar
    it('Gagal login dengan Username yang salah dan Password yang benar', () => {
        cy.get('input[name="username"]').type('admin3');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });

    // 8. Pengguna login dengan mengisi Password kurang dari 8 karakter
    it('Gagal login dengan Password kurang dari 8 karakter', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('short');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
    });
});

  
