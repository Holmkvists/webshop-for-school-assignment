// sort.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { catalog } from "../../src/ts/models/product-catalog";

describe("sort tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/productdetails.html#");
  });

  it("should sort price low to high", () => {
    // Arrange

    // Act

    cy.get("#sortButton").click();
    cy.get("#lowToHigh").click();

    // Result
  });

  it("should sort price high to low", () => {
    // Arrange

    // Act

    cy.get("#sortButton").click();
    cy.get("#highToLow").click();

    // Result
  });
});
