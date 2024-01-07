import adapter from '../index.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ domain: 'http://localhost:5173' })
	}
};

export default config;
