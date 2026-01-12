describe('Share Bizz', () => {

  beforeEach(() => {

    cy.fixture('user').then((user) => {
      cy.visit('login');
      cy.login(user.validCredentials.username, user.validCredentials.password);
      cy.visit(Cypress.config('buzzUrl'));
    });
  });

  it('should successfully share a buzz post', () => {
    cy.get('textarea[placeholder="What\'s on your mind?"]').type('this is a post from cypress "hello other testers"');
    cy.contains('button[type=submit]', 'Post').click();
    cy.contains('p[class="oxd-text oxd-text--p orangehrm-buzz-post-body-text"]', 'this is a post from cypress "hello other testers"').should('be.visible');
  });

  it('doesn\'t show error when trying to share an empty buzz post', () => {
    cy.get('.orangehrm-buzz-post').then(($postsBefore)=>{
      const initialCount = $postsBefore.length;
      cy.contains('button[type=submit]', 'Post').click();
      cy.get('.orangehrm-buzz-post').should('have.length', initialCount);
      cy.contains(/error|required|empty/i).should('not.exist');
    });
  });

});