import { locales, loadTranslations, translations, defaultLocale } from '$lib/i18n';
import { parseCsvFile } from '$lib/server/parseCsv';

import {
	FilmSchema,
	DirectorSchema,
	ScreeningSchema,
	VenueSchema,
	FestivalEventSchema
} from '$lib/schema/film';

// raw CSV content gets bundled at build time
import filmsCsv from '$lib/data/films.csv?raw';
import directorsCsv from '$lib/data/directors.csv?raw';
import screeningsCsv from '$lib/data/screenings.csv?raw';
import venuesCsv from '$lib/data/venues.csv?raw';
import festivalEventsCsv from '$lib/data/festival-events.csv?raw';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies, request }) => {
	const { pathname } = url;

	// locale detection (as you had)
	let locale = (cookies.get('lang') || '').toLowerCase();
	if (!locale) {
		const h = request.headers.get('accept-language') || '';
		const m = h.match(/^[a-z]+(?=[-_])/i) || h.match(/^[a-z]+/i);
		locale = m ? m[0].toLowerCase() : defaultLocale;
	}
	const supported = locales.get().map((l) => l.toLowerCase());
	if (!supported.includes(locale)) locale = defaultLocale;
	locale = defaultLocale; // your forced default
	await loadTranslations(locale, pathname);

	// parse bundled CSVs
	const films = parseCsvFile(filmsCsv, FilmSchema);
	const directors = parseCsvFile(directorsCsv, DirectorSchema);
	const screenings = parseCsvFile(screeningsCsv, ScreeningSchema);
	const venues = parseCsvFile(venuesCsv, VenueSchema);
	const festivalEvents = parseCsvFile(festivalEventsCsv, FestivalEventSchema);

	return {
		i18n: { locale, route: pathname },
		translations: translations.get(),
		films,
		directors,
		screenings,
		venues,
		festivalEvents
	};
};
