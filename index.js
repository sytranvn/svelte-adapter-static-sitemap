import staticAdapter from '@sveltejs/adapter-static'
import fs from 'node:fs'
const locXML = (url) => `<loc>${url}</loc>`
const urlXML = (url) => `
  <url>
    ${locXML(url)}
  </url>`
const urlsetXML = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- This file was automatically generated by https://github.com/sytranvn/svelte-adapter-static-sitemap -->\
${urls.map(url => urlXML(url)).join('')}
</urlset>`

/**
 * @param {string} url
 * @param {string} domain
 */
function getUrl(url, domain) {
	if (domain[domain.length - 1] === '/') {
		return domain.slice(0, -1) + url
	}
	return domain + url
}

function renderSitemap(urls, opts) {
	const domain = opts?.domain ?? 'http://localhost'
	return urlsetXML(urls.map(url => getUrl(url, domain)))
}

/** @param {import('@sveltejs/adapter-static').AdapterOptions & { domain?: string}} options*/
export default function(options) {
	const { pages = 'build', fileName = 'sitemap.xml' } = options ?? {}
	console.log(options)
	return {
		name: 'adapter-static-sitemap',
		async adapt(builder) {
			const { adapt: adaptStatic } = staticAdapter(options)
			const urls = Array.from(builder.prerendered.pages.keys())
			const sitemap = renderSitemap(urls, options)

			await adaptStatic(builder);
			const source = `${pages}/${fileName}`;
			fs.writeFileSync(source, sitemap);
		}
	};
}
