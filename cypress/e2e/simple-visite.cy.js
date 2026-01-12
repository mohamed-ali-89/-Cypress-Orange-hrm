
describe('home page', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  context('Login page', () => {

    it('should display login title using contains', () => {
      cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').contains('Login');
      cy.contains('h5', 'Login').should('be.visible');
    });

    it('should contain login form', () => {
      cy.get('[class="oxd-form"]').should('be.visible');
    });

    it('should display login title using should', () => {
      cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should("contain", "Login");
    });

    it('should surf to forgot password page ', () => {
      cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
      cy.url().should('include', 'requestPasswordResetCode');
      cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should("contain", "Reset Password");
      cy.get('form').should('be.visible');
    });

  });


});



