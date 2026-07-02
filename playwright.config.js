const path = require('path');
const Module = require('module');

function addTransientNpxModulesToResolver() {
  const pathEntries = (process.env.PATH || '').split(path.delimiter);
  const npxNodeModules = pathEntries
    .filter(Boolean)
    .map((entry) => path.normalize(entry))
    .filter((entry) => entry.endsWith(`${path.sep}node_modules${path.sep}.bin`))
    .map((entry) => path.dirname(entry))
    .find((entry) => entry.includes(`${path.sep}_npx${path.sep}`));

  if (!npxNodeModules) {
    return;
  }

  const existing = process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : [];
  if (!existing.includes(npxNodeModules)) {
    process.env.NODE_PATH = [npxNodeModules, ...existing].join(path.delimiter);
    Module._initPaths();
  }
}

addTransientNpxModulesToResolver();

module.exports = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: [['list']],
  use: {
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 }
      }
    }
  ]
};
