describe("Webshop test", () => {
  it("Adding product to cart", () => {
    // 1 Arrange
    cy.visit("http://localhost:1234");
    // 2 Act
    cy.get(".add-to-cart").first().click();
    // 3 Assert
    cy.get("#cart-amount").should("have.text", "1");
  });

  //   it("Deleting a todo", () => {
  //     cy.visit("http://localhost:1234");
  //     cy.get("#todo-text").type("Handla");
  //     cy.get("button[type=button]").click();
  //     cy.visit("http://localhost:1234");
  //     cy.get("input[type=checkbox]").click();
  //     cy.get(".task").should("have.length", 0);
  //   });
});
