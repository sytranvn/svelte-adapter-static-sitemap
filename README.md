# svelte-adapter-static-sitemap
Adapter for SvelteKit apps that prerenders your entire site as a collection of static files and and sitemap.xml

# Usage
Install with `npm i -D sveltejs-adapter-static-sitemap` then add the adapter to your `svelte.config.js`

```js
import adapter from 'sveltejs-adapter-static-sitemap';

export default {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      domain: 'http://localhost',
      fileName: 'sitemap.xml',
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
}
```
