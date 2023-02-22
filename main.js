const { app } = require('electron');
const { config } = require('./index.json');

app.whenReady().then(() => {
  app.on('browser-window-created', (_, win) => {
    win.webContents.session.webRequest.onHeadersReceived(({ responseHeaders, resourceType }, cb) => {
      delete responseHeaders['content-security-policy'];
      delete responseHeaders['content-security-policy-report-only'];

      if (resourceType in config.contentTypes)
        responseHeaders['content-type'] = config.contentTypes[resourceType];

      cb({ cancel: false, responseHeaders: responseHeaders });
    });
  });
});
