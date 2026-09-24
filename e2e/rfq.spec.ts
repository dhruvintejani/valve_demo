import { test, expect, type Page } from '@playwright/test';

async function openOptionalDetails(page: Page) {
  await page.getByRole('button', { name: /Add optional technical fields/i }).click();
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`optional dropdowns expose Other and the final Not Sure option at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await openOptionalDetails(page);

    for (const [label, customLabel] of [
      ['Material Construction', 'Specify material...'],
      ['End Connection', 'Specify connection...'],
      ['Application / Media', 'Specify application/media...'],
    ] as const) {
      const select = page.getByRole('combobox', { name: label });
      await select.scrollIntoViewIfNeeded();
      // This replicates opening the menu near the lower portion of the screen.
      await page.evaluate(() => window.scrollBy(0, 150));
      await select.click();

      const lastOption = page.getByRole('option', { name: 'Not Sure' });
      await lastOption.scrollIntoViewIfNeeded();
      await expect(lastOption).toBeVisible();
      const menu = await page.getByRole('listbox').boundingBox();
      expect(menu).not.toBeNull();
      expect(menu!.y).toBeGreaterThanOrEqual(-1);
      expect(menu!.y + menu!.height).toBeLessThanOrEqual(viewport.height + 1);

      const other = page.getByRole('option', { name: 'Other', exact: true });
      await other.scrollIntoViewIfNeeded();
      await other.click();
      await expect(page.getByLabel(customLabel)).toBeVisible();
      await page.getByLabel(customLabel).fill('Client-specific specification');

      await select.click();
      await lastOption.scrollIntoViewIfNeeded();
      await lastOption.click();
      await expect(select).toContainText('Not Sure');
      await expect(page.getByLabel(customLabel)).toHaveCount(0);
    }
  });
}

test('complete RFQ supports technical documents, validation, review and demo-only confirmation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Forged Ball Valve/i }).first().click();
  await page.getByRole('combobox', { name: 'Size' }).click();
  await page.getByRole('option', { name: '2" (DN50)' }).click();
  await page.getByRole('combobox', { name: 'Pressure Class' }).click();
  await page.getByRole('option', { name: 'Class 150', exact: true }).click();
  await page.getByLabel(/Quantity/i).fill('10');

  await page.locator('input[type="file"]').setInputFiles({
    name: 'valve-specification.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.5 demo'),
  });
  await expect(page.getByText('valve-specification.pdf').first()).toBeVisible();

  // Errors appear before the buyer enters contact information.
  await page.getByRole('button', { name: 'Submit RFQ', exact: true }).click();
  await expect(page.getByText('Full name is required.')).toBeVisible();

  await page.getByLabel('Full Name').fill('Demo Buyer');
  await page.getByLabel('Company Name').fill('Example Engineering');
  await page.getByLabel('Email Address').fill('demo@example.com');
  await page.getByLabel('Phone Number').fill('9876543210');
  await page.getByRole('button', { name: 'Submit RFQ', exact: true }).click();

  await expect(page.getByText('Demo RFQ Completed')).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText('valve-specification.pdf').first()).toBeVisible();
  await expect(page.getByText(/No actual request has been sent to Evolve Industries/i).first()).toBeVisible();
  await page.getByRole('button', { name: 'Submit Another Request' }).click();
  await expect(page.getByRole('combobox', { name: 'Size' })).toContainText('Select size...');
  await expect(page.getByLabel('Full Name')).toBeEmpty();
});
