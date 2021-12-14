describe("filter tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/productdetails.html#");
  });

  it("should filter category by women", () => {
    cy.get("#filterButton").click();
    cy.get("#categoriesFilter a").eq(1).click();

    cy.get("div > h3").should("contain.text", "Wmns Waffle Trainer 2");
  });

  it("should filter brand by nike sportswear", () => {
    cy.get("#filterButton").click();
    cy.get("#brandsFilter a").eq(3).click();

    cy.get("div > .mt-1").should("have.text", "Nike Sportswear");
  });
});
