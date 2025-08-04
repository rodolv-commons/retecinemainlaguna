import type { FestivalEvent, Screening } from '$lib/types/Film';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ parent }) => {
	// pull in everything your layout returned
	const layout = await parent();

	// Loop over festivalEvents array to extract unique days
	// Assuming each event has a 'startDate' property in the format 2025-09-20T18:00:00
	const festivalEventDays = new Set(
		layout.festivalEvents.map((event: FestivalEvent) => new Date(event.startDate).getDate())
	);

	const screeningsDays = new Set(
		layout.screenings.map((screening: Screening) => new Date(screening.datetime).getDate())
	);

	// Merge both sets to get unique days from both festival events and screenings
	const festivalDays = Array.from(new Set([...festivalEventDays, ...screeningsDays]))
		.map((day) => Number(day))
		.sort((a, b) => a - b);

	return {
		...layout,
		festivalDays
	};
}) satisfies PageServerLoad;
