class SearchUser {
    // selectors for search user page elements
    usernameInput = ':nth-child(2) > .oxd-input'
    selectUserRoleDropdown = '.oxd-select-text';   // wrapper of the select
    selectDropdownOptions = '.oxd-select-dropdown .oxd-select-option'; // options
    submitSearchButton = 'button[type="submit"]';
    tableRows = '.oxd-table-body [role="row"]';
    tableCards = '.oxd-table-card';
    noRecordsFoundMessage = 'span[class="oxd-text oxd-text--span"]';

    surfToAdminModule() {
        cy.get('a.oxd-main-menu-item[href="/web/index.php/admin/viewAdminModule"]').should('be.visible').click();
    }

    fillUsername(username) {
        cy.get(this.usernameInput).clear().type(username);
    }

    selectUserRole(role) {
        cy.get(this.selectUserRoleDropdown).eq(0).click();
        cy.get(this.selectDropdownOptions).contains(role).click();
    }

    submitSearch() {
        cy.get(this.submitSearchButton).click();
    }

    verifyFoundRecords() {
        cy.get(this.tableRows).should('have.length.greaterThan', 0);
    }

    verifyNoRecordsFound() {
        cy.get(this.noRecordsFoundMessage).should('be.visible').and('contain', 'No Records Found');
    }

    verifyTablecards() {
        cy.get(this.tableCards).should('have.length.greaterThan', 0);
    }

}

export default new SearchUser();