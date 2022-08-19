require("cypress-get-table");

import ExamplePage from "../Page/ExamplePage";

const { default: examplePage } = require("../Page/ExamplePage");

//test suite
describe("your first test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  //test case
  it("verify element page ", function () {
    const examplePage = new ExamplePage();
    cy.get("h1").should(($text) => {
      expect($text).to.contain("Koligrum Web Playground");
    });

    //verify progress
    cy.get("[role=progressbar]")
      .should("be.visible")
      .and(($text) => {
        expect($text).to.contain("1 / 10");
      });

    // verify dropdown
    cy.get("select>option").should(($list) => {
      // total list
      const optionList = ["White", "Yellow", "Cyan", "Magenta", "Blue"];
      expect($list).to.length(5);

      for (let i = 0; i < $list.length; i++) {
        expect($list.eq(i)).to.contain(optionList[i]);
      }
    });
  });

  // Create test to input at least 3 quote with different color
  it.only("check input", function () {
    const examplePage = new ExamplePage();
    const expectedTable = [
      {
        Quotes: "You Can do it!!!",
        Color: "White",
      },
      {
        Quotes: "quote 1",
        Color: "Yellow",
      },
      {
        Quotes: "quote 2",
        Color: "Cyan",
      },
      {
        Quotes: "quote 3",
        Color: "Magenta",
      },
    ];

    let arrayInput = [];

    for (let i = 0; i < 3; i++) {
      let temp = "quote " + (i + 1);
      arrayInput.push(temp);
      examplePage.inputQuote(temp);
      examplePage.selectColor(i + 1);
      examplePage.addQuote();
    }

    // Verify that the number of quotes are correct (Grid View)
    cy.get('p[name="quoteText"').should("have.length", 4);

    // Verify the quotes you inserted are correct
    cy.get('p[name="quoteText"]').then(($listQuotes) => {
      for (let j = 1; j < arrayInput.length + 1; j++) {
        expect($listQuotes.eq(j)).to.contain(arrayInput[j - 1]);
      }
    });

    // Verify the table is exist (Table View)
    cy.get("#tableView").click();
    cy.get("#buttonShowTable").trigger("mouseover");

    // verify table visible
    cy.get("#tableQuote").should("be.visible");

    // verify table tr length
    cy.get("#tableQuote").find("tr").should("have.length", 5);

    // Verify the data in the table is correct
    cy.get("table#tableQuote")
      .getTable()
      .should(($tableData) => {
        for (let k = 1; k < $tableData.length; k++) {
          expect($tableData[k]).to.contain(expectedTable[k]);
        }
      });

    // verify get value quote 1
    cy.get(':nth-child(2) > [name="tableColumnQuote"]')
      .should("be.visible")
      .and(($text) => {
        expect($text).to.contain("quote 1");
      });
  });

  // handling alert
  it("Handling alert", function () {
    const examplePage = new ExamplePage();
    // Open the website and insert 10 value (max)
    for (let i = 0; i < 10; i++) {
      let temp = "quote " + (i + 1);
      examplePage.inputQuote(temp);
      examplePage.selectColor(Math.floor(Math.random() * 5));
      examplePage.addQuote();
    }

    // Verify alert is open
    cy.on("window:alert", ($textAlert) => {
      expect($textAlert).to.contains("Please delete Quotes first!");
    });
    // Close alert
    // cy.get("button").contains("OK").click();
  });
});
