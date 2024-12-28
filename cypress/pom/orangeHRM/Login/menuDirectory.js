export default class Directory {
        static menuDirectory() {
            return cy.get('a[href="/web/index.php/directory/viewDirectory"]').contains('Directory');
        }
    
        static inputEmployeeName() {
            return cy.get('input[placeholder="Type for hints..."]');
        }
    
        static dropdownEmployee() {
            return cy.get('.oxd-autocomplete-dropdown > *');
        }
    
        static dropdownJobTitle() {
            return cy.get('.oxd-select-wrapper').eq(0); 
        }
    
        static dropdownLocation() {
            return cy.get('.oxd-select-wrapper').eq(1); 
        }
    
        static jobTitleLocationList() {
            return cy.get('.oxd-select-dropdown');
        }
    
        static buttonSearch() {
            return cy.get('button').contains('Search');
        }
    
        static buttonReset() {
            return cy.get('button').contains('Reset');
        }
    
        static MessageRecord() {
            return cy.get('.orangehrm-horizontal-padding'); 
        }
    
        static MessageInvalid() {
            return cy.get('.oxd-input-group__message'); 
        }
    }
    
