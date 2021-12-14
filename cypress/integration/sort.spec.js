describe("sort tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/productdetails.html#");
  });

  it("should sort price low to high", () => {
    cy.get("#sortButton").click();
    cy.get("#lowToHigh").click();

    cy.get(".flex-col > .text-sm").first().should("have.text", "$89");
    cy.get(".flex-col > .text-sm").last().should("have.text", "$219");
  });

  it("should sort price high to low", () => {
    cy.get("#sortButton").click();
    cy.get("#highToLow").click();

    cy.get(".flex-col > .text-sm").first().should("have.text", "$219");
    cy.get(".flex-col > .text-sm").last().should("have.text", "$89");
  });

  it("should sort brands A-Z", () => {
    cy.get("#sortButton").click();
    cy.get("#brandsAZ").click();

    cy.get("div > .mt-1").first().should("have.text", "adidas Performance");
    cy.get("div > .mt-1").last().should("have.text", "Puma");
  });

  it("should sort brands Z-A", () => {
    cy.get("#sortButton").click();
    cy.get("#brandsZA").click();

    cy.get("div > .mt-1").first().should("have.text", "Puma");
    cy.get("div > .mt-1").last().should("have.text", "adidas Performance");
  });

  it("should sort models A-Z", () => {
    cy.get("#sortButton").click();
    cy.get("#modelsAZ").click();

    cy.get("div > h3").first().should("contain.text", "4D Futurecraft");
    cy.get("div > h3").last().should("contain.text", "Wmns Waffle Trainer 2");
  });

  it("should sort models Z-A", () => {
    cy.get("#sortButton").click();
    cy.get("#modelsZA").click();

    cy.get("div > h3").first().should("contain.text", "Wmns Waffle Trainer 2");
    cy.get("div > h3").last().should("contain.text", "4D Futurecraft");
  });
});
