// sort.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("sort tests", () => {
  it("should sort low to high", () => {
    // Arrange
    cy.visit("http://localhost:1234/productdetails.html#");

    // Act
    cy.get("#sortButton").click();
    cy.get("#lowToHigh").click();

    // Result
  });
});
