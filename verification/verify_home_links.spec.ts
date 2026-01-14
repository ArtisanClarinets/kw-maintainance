
import { test, expect } from '@playwright/test';
import { services } from '../content/services';

test('Home page services link to valid pages', async ({ page }) => {
  await page.goto('http://localhost:3000');

  for (const service of services) {
    const link = page.locator(`a[href="/services/${service.id}"]`).first();
    await expect(link).toBeVisible();

    // Check if clicking goes to a valid page
    const response = await page.request.get(`http://localhost:3000/services/${service.id}`);
    expect(response.status()).toBe(200);
  }
});
