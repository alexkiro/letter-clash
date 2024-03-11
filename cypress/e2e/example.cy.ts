describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.get("a").contains("Start Game").click();
  });
});
