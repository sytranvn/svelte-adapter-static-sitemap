import * as fs from 'node:fs';
import { expect, test } from '@playwright/test';

const cwd = process.cwd();

test('generates HTML files', () => {
	expect(fs.existsSync(`${cwd}/build/index.html`)).toBeTruthy();
});

test('generates sitemap files', () => {
	expect(fs.existsSync(`${cwd}/build/sitemap.xml`)).toBeTruthy();
});

test('prerenders a page', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toEqual('This page was prerendered');
	expect(await page.textContent('p')).toEqual('answer: 42');
});

test('prerenders dynamic page', async({page}) => {
	await page.goto('/products/car-1')
	expect(await page.textContent('h1')).toEqual('This product was prerendered');
	expect(await page.textContent('p')).toEqual('Product ID: car-1');
})

test('generates sitemaps', async({page}) => {
	await page.goto('/sitemap.xml')
	expect(await page.locator('url').locator('nth=0').locator('loc').textContent()).toEqual('http://localhost:5173/');
	expect(await page.locator('url').locator('nth=1').locator('loc').textContent()).toEqual('http://localhost:5173/products/car-1');
	expect(await page.locator('url').locator('nth=1').locator('loc').textContent()).toEqual('http://localhost:5173/products/car-2');
});
