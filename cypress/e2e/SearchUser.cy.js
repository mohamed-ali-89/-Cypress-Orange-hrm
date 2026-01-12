import LoginPage from "../Pages/LoginPage";
import SearchUser from "../Pages/SearchUser";

describe('search user tests', () => {

  beforeEach(() => {
    LoginPage.visit();
    cy.fixture('user').then((user) => {
      LoginPage.login(user.validCredentials.username, user.validCredentials.password)
    });

    SearchUser.surfToAdminModule();

  });

  it('passes with existing user', () => {
    cy.fixture('user').then((user) => {
      SearchUser.fillUsername(user.validCredentials.username);
    });
    SearchUser.selectUserRole('Admin');
    SearchUser.submitSearch();
    SearchUser.verifyFoundRecords();
  });


  it('Find row where username = Admin and user role = Admin', () => {
    SearchUser.submitSearch();
    SearchUser.verifyFoundRecords();
    cy.get(SearchUser.tableRows).filter((_, row) => {
      const cells = row.querySelectorAll('[role="cell"]');
      const username = cells[1]?.innerText.trim();
      const role = cells[2]?.innerText.trim();
      return username === 'Admin' && role === 'Admin';
    }).should('have.length.greaterThan', 0);
  });


  it('Find row where username = Admin and user role = Admin 2', () => {
    SearchUser.submitSearch();
    SearchUser.verifyFoundRecords();
    cy.get(SearchUser.tableCards).contains('.oxd-table-card', 'Admin').should('contain.text', 'Admin');
  });

  it('should show no record found for non-existing user search', () => {
    cy.fixture('user').then((user) => {
      SearchUser.fillUsername(user.invalidCredentials.username);
    });
    SearchUser.submitSearch();
    SearchUser.verifyNoRecordsFound();
  });

});