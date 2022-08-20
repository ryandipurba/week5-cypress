class examplePage {
  inputQuote(quote) {
    cy.get("#inputQuote").type(quote);
  }

  selectColor(option) {
    cy.get("#colorSelect").select(option);
  }

  addQuote() {
    cy.get("#buttonAddQuote").click();
  }

  clearQuote() {
    cy.get("#buttonAddQuote").click();
  }
}

export default examplePage;
