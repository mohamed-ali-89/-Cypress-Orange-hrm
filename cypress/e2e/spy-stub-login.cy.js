describe('Api login with spy and stub', () => {
  beforeEach(() => {
    cy.visit("login")
    cy.intercept("GET", "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index").as("dashbord");
    cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary",{
      statusCode: 200,
      body:{ data:[] }}).as("actionSummary");
    cy.fixture("user").then((user) => {
      cy.login(user.validCredentials.username, user.validCredentials.password);
      cy.get('h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').contains("Dashboard").should("be.visible");
    })
  });


  it('should spy on login', () => {
    cy.wait("@dashbord").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.getCookie("orangehrm").should((cookie) => {
        expect(cookie.value).to.exist;
      });
    });
  });

  it('should stub after login by stubbing dashbord API',()=>{
    
      cy.wait("@actionSummary").then((interception)=>{
        expect(interception.response.statusCode).to.eq(200);
        cy.contains("Dashboard").should("be.visible");
      });
  });
});