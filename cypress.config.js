const { defineConfig } = require("cypress");

module.exports = defineConfig({

  "watchForFileChanges": false,
  "projectId": "ajjerv",
  "chromeWebSecurity": false,
  "defaultCommandTimeout": 12500,
  "numTestsKeptInMemory": 1,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
