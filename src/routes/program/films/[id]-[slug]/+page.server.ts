import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Film } from '$lib/types/Film';

export const load: PageServerLoad = async ({ params, parent }) => {
	// bring in any layout data if needed
	const parentData = await parent();

	const { id, slug } = params;

	const film: Film | undefined = parentData.films.find((f) => f.id === `${id}`);

	if (!film || film.slug !== slug) throw error(404, 'Film not found');

	return { film };
};
