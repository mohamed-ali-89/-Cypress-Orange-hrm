const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '9hcezk',
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/',
    loginApi: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
    buzzUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/buzz/viewBuzz',
    postBuzzApi: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/posts',
    postCommentApi: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/buzz/shares/14/comments',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
