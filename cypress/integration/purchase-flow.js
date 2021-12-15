describe("Purchase flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it("Purchase flow success", () => {
    cy.get(".add-to-cart:first").click();
    cy.get("#bag").click();
    cy.get("#proceed-checkout").click();
    cy.get("#firstName").click();
    cy.get("#firstName").type("Kalle");
    cy.get("#lastName").click();
    cy.get("#lastName").type("Anka");
    cy.get("#username").click();
    cy.get("#username").type("Kallecooling");
    cy.get("#email").click();
    cy.get("#email").type("kalle.anka@kvack.se");
    cy.get("#address").click();
    cy.get("#address").type("stråtgatan 1");
    cy.get("#address2").click();
    cy.get("#address2").type("stråtgatan 1");
    cy.get("#country").select("Sweden");
    cy.get("#state").select("Stockholm");
    cy.get("#zip").click();
    cy.get("#zip").type("12345");
    cy.get("#cc-name").click();
    cy.get("#cc-name").type("Kalle Anka");
    cy.get("#cc-number").click();
    cy.get("#cc-number").type("9999 9999 9999 9999");
    cy.get("#cc-expiration").click();
    cy.get("#cc-expiration").type("25/08");
    cy.get("#cc-cvv").click();
    cy.get("#cc-cvv").type("123");
    cy.get("#proceed-purchase").click();
    cy.get("h2").contains("Thank you for the purchase");
  });

  it("Purchase flow failure", () => {
    cy.get(".add-to-cart:first").click();
    cy.get("#bag").click();
    cy.get("#proceed-checkout").click();
    cy.get("#firstName").click();
    cy.get("#firstName").type("Kalle");
    cy.get("#username").click();
    cy.get("#username").type("Kallecooling");
    cy.get("#email").click();
    cy.get("#email").type("kalle.anka@kvack.se");
    cy.get("#address").click();
    cy.get("#address").type("stråtgatan 1");
    cy.get("#address2").click();
    cy.get("#address2").type("stråtgatan 1");
    cy.get("#country").select("Sweden");
    cy.get("#state").select("Stockholm");
    cy.get("#zip").click();
    cy.get("#zip").type("12345");
    cy.get("#cc-name").click();
    cy.get("#cc-name").type("Kalle Anka");
    cy.get("#cc-number").click();
    cy.get("#cc-number").type("9999 9999 9999 9999");
    cy.get("#cc-expiration").click();
    cy.get("#cc-expiration").type("25/08");
    cy.get("#cc-cvv").click();
    cy.get("#cc-cvv").type("123");
    cy.get("#proceed-purchase").click();
    cy.get(".invalid-feedback").contains("Valid last name is required.");
  });
});
