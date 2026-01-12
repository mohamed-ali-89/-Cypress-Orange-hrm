class LoginPage {
// selectors for login page elements
usernameInput = 'input[name="username"]';
passwordInput = 'input[name="password"]';
submitButton = 'button[type="submit"]';
errorMessage = '[class="oxd-text oxd-text--p oxd-alert-content-text"]';
requiredMessage = 'span[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]';

visit(){
    cy.visit('login'); 
}

fillUsername(username){
    cy.get(this.usernameInput).clear().type(username);
}

fillPassword(password){
    cy.get(this.passwordInput).clear().type(password);
}

submit(){
    cy.get(this.submitButton).click();
}

login(username, password){
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
}

verifyInvalidCredentials(){
    cy.get(this.errorMessage).should("be.visible").and("contain", "Invalid credentials");
}

verifyRequierdFiels(){
    cy.get(this.requiredMessage).should("be.visible").and("contain", "Required");
}

}

export default new LoginPage();