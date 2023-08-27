describe("Landing Page", () => {
  it("opens the landing page, displays correctly and navigates to detail page correctly", () => {
    cy.visit("http://localhost:3000");
    cy.get(".hero").should("be.visible");
    cy.get(".hero .card__image").should("be.visible");
    cy.get(".hero .card__content").should("be.visible");
    cy.get(".articles .article").should("have.length.above", 2);
    cy.get('[data-testid="load-more-btn"]').should("be.visible");
    cy.get("footer").should("be.visible");

    const initialArticlesNo = cy.get(".articles").children.length;
    cy.get('[data-testid="load-more-btn"]').click();
    cy.get(".articles .article").should(
      "have.length.greaterThan",
      initialArticlesNo,
    );
    cy.get(".hero .card__content-date").click();
    cy.get(".hdr__logo-container").click();
  });

  it("triggers membership payment", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.contains("button", /join\s+us/i).click();
    cy.wait(1000);
    cy.get(".dialog").should("be.visible");
    cy.get(".dialog #fullName").type("John Doe");
    cy.get(".dialog #email").type("johndoe@nomail.com");
  });
});
