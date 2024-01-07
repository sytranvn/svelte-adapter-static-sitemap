import { Adapter } from '@sveltejs/kit';
import { AdapterOptions as StaticAdapterOptions } from '@sveltejs/adapter-static';

export interface AdapterOptions extends StaticAdapterOptions {
	domain?: string
	fileName?: string
}

export default function plugin(options?: AdapterOptions ): Adapter;
