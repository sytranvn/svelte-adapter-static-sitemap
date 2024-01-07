/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return [
		{ id: 'car-1' },
		{ id: 'car-2' }
	];
}

export const load = ({ params }) => {
    return {
        id: params.id
    }
}
