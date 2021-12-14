describe("filter tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/productdetails.html#");
  });

  it("should filter brand by adidas Performance", () => {
    cy.get("#filterButton").click();
    cy.get("#brandsFilter a").eq(2).click();

    cy.get("div > .mt-1").should("contain.text", "adidas Performance");
  });

  it("should filter brand by nike sportswear & sort price low to high", () => {
    cy.get("#filterButton").click();
    cy.get("#brandsFilter a").eq(3).click();

    cy.get("#sortButton").click();
    cy.get("#lowToHigh").click();

    cy.get("div > .mt-1").should("contain.text", "Nike Sportswear");
    cy.get(".flex-col > .text-sm").first().should("have.text", "$99");
  });
});
