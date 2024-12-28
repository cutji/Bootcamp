/// <reference types="cypress"/>
import loginPage from "../../../pom/orangeHRM/Login/login";
import Directory from "../../../pom/orangeHRM/Login/menuDirectory";

describe('Tes Menu Directory', () => {
    it('Cari Berdasarkan Nama Karyawan', () => {
           cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
           loginPage.textLogin().should('have.text','Login');
           loginPage.inputusername().type('Admin');
           loginPage.inputPassword().type('admin123');
           cy.intercept("GET","**/employees/action-summary").as("actionsummary");
           loginPage.buttonLogin().click();
           cy.wait("@actionsummary").then((intercept) => {
               expect(intercept.response.statusCode).to.equal(200)
           });
           loginPage.menuDashboard().should('have.text','Dashboard');
           cy.intercept("GET","**/index.php/api/v2/directory/*").as("employLimit");
           Directory.menuDirectory().click();
           cy.wait("@employLimit").then((intercept)=>{
            expect(intercept.response.statusCode).to.equal(200)
           });
           Directory.inputEmployeeName().type('Peter');
           Directory.dropdownEmployee().should('contain.text', 'Peter').click();
           Directory.buttonSearch().click();
           Directory.MessageRecord().should('contain.text','(1) Record Found');
        })
    
    it('Cari Nama Karyawan tanpa memilih dari daftar pilihan', () => {
           cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
           loginPage.textLogin().should('have.text','Login');
           loginPage.inputusername().type('Admin');
           loginPage.inputPassword().type('admin123');
           cy.intercept("GET","**/employees/action-summary").as("actionsummary");
           loginPage.buttonLogin().click();
           cy.wait("@actionsummary").then((intercept) => {
               expect(intercept.response.statusCode).to.equal(200)
           });
           loginPage.menuDashboard().should('have.text','Dashboard');
           cy.intercept("GET","**/index.php/api/v2/directory/*").as("employLimit");
           Directory.menuDirectory().click();
           cy.wait("@employLimit").then((intercept)=>{
            expect(intercept.response.statusCode).to.equal(200)
           });
           Directory.inputEmployeeName().type('Peter');
           Directory.buttonSearch().click();
           Directory.MessageInvalid().should('have.text','Invalid');
        })
    
    it('Cari Berdasarkan Jabatan pekerjaan', () => {
           cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
           loginPage.textLogin().should('have.text','Login');
           loginPage.inputusername().type('Admin');
           loginPage.inputPassword().type('admin123');
           cy.intercept("GET","**/employees/action-summary").as("actionsummary");
           loginPage.buttonLogin().click();
           cy.wait("@actionsummary").then((intercept) => {
               expect(intercept.response.statusCode).to.equal(200)
           });
           loginPage.menuDashboard().should('have.text','Dashboard');
           cy.intercept("GET","**/index.php/api/v2/directory/*").as("employLimit");
           Directory.menuDirectory().click();
           cy.wait("@employLimit").then((intercept)=>{
            expect(intercept.response.statusCode).to.equal(200)
           });
           Directory.dropdownJobTitle().click();
           Directory.jobTitleLocationList().should('be.visible');
           cy.contains('QA Engineer').click();
           Directory.buttonSearch().click();
           Directory.MessageRecord().should('contain.text','Record Found');     
        })
    
    it('Cari Berdasarkan Lokasi', () => {
           cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
           loginPage.textLogin().should('have.text','Login');
           loginPage.inputusername().type('Admin');
           loginPage.inputPassword().type('admin123');
           cy.intercept("GET","**/employees/action-summary").as("actionsummary");
           loginPage.buttonLogin().click();
           cy.wait("@actionsummary").then((intercept) => {
               expect(intercept.response.statusCode).to.equal(200)
           });
           loginPage.menuDashboard().should('have.text','Dashboard');
           cy.intercept("GET","**/index.php/api/v2/directory/*").as("employLimit");
           Directory.menuDirectory().click();
           cy.wait("@employLimit").then((intercept)=>{
            expect(intercept.response.statusCode).to.equal(200)
           });
           Directory.dropdownLocation().click();
           Directory.jobTitleLocationList().should('be.visible');
           cy.contains('Texas').should('be.visible').click();
           Directory.buttonSearch().click();
           Directory.MessageRecord().should('contain.text',' (4) Records Found');     
        })   

    it('Pencarian Data Lengkap dan Reset', () => {
           cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
           loginPage.textLogin().should('have.text','Login');
           loginPage.inputusername().type('Admin');
           loginPage.inputPassword().type('admin123');
           cy.intercept("GET","**/employees/action-summary").as("actionsummary");
           loginPage.buttonLogin().click();
           cy.wait("@actionsummary").then((intercept) => {
               expect(intercept.response.statusCode).to.equal(200)
           });
           loginPage.menuDashboard().should('have.text','Dashboard');
           cy.intercept("GET","**/index.php/api/v2/directory/*").as("employLimit");
           Directory.menuDirectory().click();
           cy.wait("@employLimit").then((intercept)=>{
            expect(intercept.response.statusCode).to.equal(200)
           });
           Directory.inputEmployeeName().type('Peter');
           Directory.dropdownEmployee().should('contain.text', 'Peter').click();
           Directory.dropdownJobTitle().click();
           Directory.jobTitleLocationList().should('be.visible');
           cy.contains('Chief Financial Officer').should('be.visible').click();    
           Directory.dropdownLocation().click();
           Directory.jobTitleLocationList().should('be.visible');
           cy.contains('Texas').should('be.visible').click();
           Directory.buttonReset().click();
        })
})
