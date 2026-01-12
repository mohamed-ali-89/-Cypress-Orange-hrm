describe('api login tests', () => {
    beforeEach(() => {
        cy.visit('login');
    });

    it('should login via API with valid credentials', () => {
        cy.fixture('user').then((user) => {
            cy.request('POST', Cypress.config('loginApi'), {
                username: user.validCredentials.username,
                password: user.validCredentials.password,
            }).then((response) => {
                expect(response.status).to.eql(200);
            });
        });
    });

    it('should not login via API with invalid credentials', () => {
        cy.fixture('user').then((user) => {
            cy.request('POST', Cypress.config('loginApi'), {
                username: user.invalidCredentials.username,
                password: user.invalidCredentials.password,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eql(401);
            });
        });
    });
});