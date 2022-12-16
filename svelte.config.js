//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node'
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
	kit: {
		adapter: adapter(),
  csrf: {
      checkOrigin: false,
    } 
	},
};

export default config;
