import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Director, Film } from '$lib/types/Film';

export const load: PageServerLoad = async ({ params, parent }) => {
	// bring in any layout data if needed
	const parentData = await parent();

	const { id, slug } = params;

	const film: Film | undefined = parentData.films.find((f) => f.id === `${id}`);
	let director: Director | undefined = {
		name: '',
		id: ''
	};

	if (film) {
		director = parentData.directors.find((d) => d.id === film.director_id);
	}

	if (!film || film.slug !== slug || !director) throw error(404, 'Film not found');

	return { film, director };
};
