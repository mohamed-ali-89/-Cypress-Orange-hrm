import LoginPage from '../Pages/LoginPage';

describe('template spec', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  context('Login Functionnality Tests', () => {

    it('should login with valid credentials', () => {
      cy.fixture('user').then((user) => {
        LoginPage.login(user.validCredentials.username, user.validCredentials.password);
        cy.contains('Dashboard').should('be.visible');
      });
    });

    it('should not Login with invalid credentials', () => {
      cy.fixture('user').then((user) => {
        LoginPage.login(user.invalidCredentials.username, user.invalidCredentials.password);
        LoginPage.verifyInvalidCredentials();
      });
    });

    it('should not login with invalid username', () => {
      cy.fixture('user').then((user) => {
        LoginPage.login(user.invalidUsername.username, user.invalidUsername.password);
        LoginPage.verifyInvalidCredentials();
      });
    });

    it('should not Login with invalid password', () => {
      cy.fixture('user').then((user) => {
        LoginPage.login(user.invalidPassword.username, user.invalidPassword.password);
        LoginPage.verifyInvalidCredentials();
      });

    });

    it('should not login with empty credentials', () => {
      LoginPage.submit();
      LoginPage.verifyRequierdFiels();
    });

    it('should surf to forgot password page ', () => {
      cy.get('p[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').should("contain", "Forgot your password?").click();
      cy.url().should('include', 'requestPasswordResetCode');
      cy.get('form').should('be.visible');
    });
  });


  context('Forgot Password Tests', () => {

    beforeEach(() => {
      cy.visit('requestPasswordResetCode');
    });

    it('should not reset password with empty username', () => {
      cy.fixture('resetUsername').then((resetUsername) => {
        cy.resetPassword(resetUsername.resetUsernames.emptyUsername);
        cy.get('span[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should("contain", "Required");
      });
    });

    it('should not reset with invalid username', () => {
      cy.fixture('resetUsername').then((resetUsername) => {
        cy.resetPassword(resetUsername.resetUsernames.invalidUsername);
        cy.url().should('include', 'sendPasswordReset');
        cy.contains('p', 'Note: ').should('be.visible');
      });
    });

  });

});