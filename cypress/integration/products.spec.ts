import mock from "../../product/mocks/default.json";

describe("Products", () => {
  it("should show all products", () => {
    cy.visit("/");
    cy.get("[data-test-id='product']").should("have.length", mock.length);
  });

  it("show display a message when there are not products", () => {
    cy.visit("/empty");
    cy.get("[data-test-id='product']").should("have.length", 0);
    cy.contains("There are no products");
  });
});