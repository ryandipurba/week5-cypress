const Homepage = require("../support/pages/Homepage");
let homepage = new Homepage();
const HomepageData = require("../support/datatest/HomepageData");

describe("Page Object Model", () => {
  it("visit quote web", () => {
    homepage.visit("");
  });

  it("input quote", () => {
    homepage.type_quote(HomepageData.datatest.quote);
  });

  it("Select Color", () => {
    homepage.choose_color(HomepageData.datatest.quote_colour);
  });

  it("Submit quote", () => {
    homepage.submit_quote(
      HomepageData.datatest.quote_colour,
      HomepageData.datatest.quote
    );
  });

  it("clear quote ", () => {
    homepage.clear_quote(HomepageData.datatest.quote);
  });
});
