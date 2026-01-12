describe('add user tests', () => {
  beforeEach(() => {
    cy.visit('login');
    cy.fixture('user').then((user) => {
      cy.login(user.validCredentials.username, user.validCredentials.password);
    });
  });
  it.only('should create a new user successfully', () => {
    cy.get('a.oxd-main-menu-item[href="/web/index.php/admin/viewAdminModule"]').should('be.visible').click();
    cy.get('[type="button"]').contains('Add').click();
    cy.contains('.oxd-input-group', 'User Role').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('.oxd-select-option', 'Admin').click();
    cy.contains('.oxd-input-group', 'Status').find('.oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains('.oxd-select-option', 'Enabled').click();
    cy.get('input[placeholder="Type for hints..."]').type('sdasda LastNameTest');
    cy.contains('.oxd-input-group', 'Username').find('input').type('daliYousfi');
    cy.get('input[type="password"]').first().type('Dali1234');
    cy.get('input[type="password"]').last().type('Dali1234');
    cy.get('button[type="submit"]').click();
  });
});