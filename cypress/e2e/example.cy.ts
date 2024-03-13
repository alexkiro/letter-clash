describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.get("button").contains("Start Game").click();
  });
});
