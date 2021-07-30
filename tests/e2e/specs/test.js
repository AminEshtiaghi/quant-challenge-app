// https://docs.cypress.io/api/introduction/api.html

describe("Automation Test", () => {
  it("Test whole process", () => {
    cy.visit("/");
    cy.url()
      .should('include', '/login');
    cy.get("h3")
      .should('be.visible')
      .should('to.contain', 'Please pass through our authentication gate');
    cy.get("div.v-alert__content")
      .should('be.visible')
      .should('to.contain', 'eshtiaghi.amin@gmail.com');
    cy.get("div.v-alert__content")
      .should('be.visible')
      .should('to.contain', 'pleasechangeme');
    cy.get('input#email').type('eshtiaghi.amin@gmail.com');
    cy.get('input#password').type('pleasechangeme');
    cy.get('button#btn_login').click();
    cy.url()
      .should('eq', Cypress.config().baseUrl);
    cy.wait(8000);
    cy.get("h3")
      .eq(0)
      .should('be.visible')
      .should('to.contain', 'Search from Nomics website');
    cy.get('input#currencies')
      .should('exist');
    cy.get('input#currencies').click({ force: true });
    cy.get('div.v-list-item__content').eq(0).click({ force: true });
    cy.get('div.v-messages__message')
      .eq(0)
      .should('be.visible')
      .should('to.contain', 'BTC, Bitcoin');
    cy.get('button#btn_search').click();
    cy.wait(5000);
    cy.get("h3")
      .eq(1)
      .should('be.visible')
      .should('to.contain', 'Market Details of BTC');
    cy.get("div.v-card__title")
      .eq(0)
      .should('be.visible')
      .should('to.contain', 'Bitcoin');
    cy.get("button#btn_sign_out")
      .click();
    cy.wait(5000);
    cy.get("h3")
      .should('be.visible')
      .should('to.contain', 'Please pass through our authentication gate');
    cy.url()
      .should('include', '/login');
  });
});
