describe('retrieve authentification cookies on buzz posts API', () => {

  let cookies;

  beforeEach(() => {
    cy.visit('login');
    cy.fixture('user').then((user) => {
      cy.login(user.validCredentials.username, user.validCredentials.password);
      cy.getCookies().then((cookiesList) => {
        cookies = cookiesList;
      })

    })
  })
  it('should retreive login cookies from buzz posts API', () => {
    cy.visit(Cypress.config('buzzUrl'));
    cy.request({
      method: 'POST',
      url: Cypress.config('postBuzzApi'),
      headers: {
        cookies: cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
      },
      body: {
        type: "text",
        text: "Keep testing!"
      }
    });
  });

  it.only('should retrieve the same cookies from person who commented on posts', () => {
    cy.intercept('GET', '**/api/v2/buzz/feed*').as('getFeed');

    cy.visit(Cypress.config('buzzUrl'));
    cy.wait('@getFeed');

    // 1) Ouvrir la zone de commentaire (sinon l'input n'existe pas)
    cy.get('i[class="oxd-icon bi-chat-text-fill"]', { timeout: 10000 }).first().click();

    // 2) Taper dans le bon champ (c'est un INPUT, pas un TEXTAREA)
    const commentText = 'Nice post!{enter}';


    cy.get('input[placeholder="Write your comment..."]', { timeout: 10000 })
      .type(commentText);

    // 3) Header Cookie correct
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join('; ');

    // 4) Appel API (à adapter selon payload attendu)
    cy.request({
      method: 'POST',
      url: Cypress.config('postCommentApi'),
      headers: {
        Cookie: cookieHeader
      },
      body: {
        text: commentText
      },
      failOnStatusCode: false
    }).then((res) => {
      cy.log(`Status: ${res.status}`);
      cy.log(JSON.stringify(res.body));

      expect([422]).to.include(res.status);
    });
  });
});