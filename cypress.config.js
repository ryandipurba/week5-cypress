const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://b899-13-67-75-93.ngrok.io",
    pageLoadTimeout: 60000,
  },
});
