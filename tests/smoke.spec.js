let playwrightTest;
try {
  playwrightTest = require('@playwright/test');
} catch {
  playwrightTest = require('playwright/test');
}
const { test, expect } = playwrightTest;
const path = require('path');

const templateUrl = `file://${path.resolve(__dirname, '../template/index.html').replace(/\\/g, '/')}`;

test('template loads core charity page content', async ({ page }) => {
  await page.goto(templateUrl);

  await expect(page).toHaveTitle(/Kindario/);
  await expect(page.getByRole('link', { name: /Kindario home/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Education and relief made visible/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /^Donate Now$/i }).first()).toBeVisible();
});
