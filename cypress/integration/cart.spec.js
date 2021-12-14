describe("cart tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it("Add product to cart", () => {
    cy.get(".add-to-cart:first").click();
    cy.get("#bag").click();

    cy.get(".col-6 > :nth-child(1)").should(
      "contain.text",
      "Blazer Low '77 Premium"
    );
  });
  it("Increase / Decrease cart item", () => {
    cy.get(".add-to-cart:first").click();
    cy.get("#bag").click();
    cy.get(".increase-button").click();

    cy.get(".number").should("contain.text", "2");
  });
  it("Decrease cart item", () => {
    cy.get(".add-to-cart:first").click();
    cy.get("#bag").click();
    cy.get(".increase-button").click();
    cy.get(".decrease-button").click();
    cy.get(".number").should("contain.text", "1");
  });
  it("Remove cart item", () => {
    cy.get(".add-to-cart:first").click();
    cy.get("#bag").click();
    cy.get(".remove-item").click();
    cy.get("#cart-widget").should("be.empty");
  });
});
