describe("Some basic tests in spec", () => {
  beforeEach(() => {
    cy.intercept("GET", "/movies?name=Angel*", [
      {
        name: "Angelica Toy",
        genre: "Soul",
        releaseDate: "2022-11-29T14:54:13.209Z",
        id: "9",
      },
    ]).as("getMovies");
  });
  it("redirects on visiting the main page and search correctly", () => {
    cy.visit("http://localhost:3000/");

    cy.url().should("include", "/search");

    cy.get('[data-cy="searchInput"]')
      .type("Angelica")
      .should("have.value", "Angelica");

    cy.get('[data-cy="genreSelect"]').select("Electronic");

    cy.url().should("include", "genre=Electronic");

    cy.get('[data-cy="sortSelect"]').select("releaseDate");

    cy.url().should("include", "sortBy=releaseDate");

    cy.get('[data-cy="form"]').submit();

    cy.get('[data-cy="searchResult]').should("not.be.empty");
  });
});
