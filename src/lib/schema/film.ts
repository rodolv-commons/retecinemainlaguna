import { z } from 'zod';
import type { Film, Director, FestivalEvent, Venue, Screening } from '$lib/types/Film';

// Tipi base
export const GenreSchema = z.object({
	name: z.string()
});

export const DirectorSchema: z.ZodType<Director> = z.object({
	name: z.string(),
	id: z.string(),
	image: z.url().optional(),
	biography: z.string().optional(),
	birthDate: z.string().optional(),
	filmography: z.string().transform((s) => s.split(','))
});

// SCREENING
export const ScreeningSchema: z.ZodType<Screening> = z.lazy(() =>
	z.object({
		datetime: z.string(),
		film_id: z.string(),
		venue_id: z.string()
	})
);

// EVENT
export const FestivalEventSchema: z.ZodType<FestivalEvent> = z.lazy(() =>
	z.object({
		category: z.string(), // 'masterclass' | 'industry-day'
		description: z.string(),
		venue_id: z.string(),
		speaker: z
			.string()
			.transform((s) => s.split(','))
			.optional(), // Name of the speaker
		speakerBio: z.string().optional(), // Optional short biography of the speaker
		startDate: z.string(),
		endDate: z.string().optional(),
		title: z.string()
	})
);

// VENUE
export const VenueSchema: z.ZodType<Venue> = z.lazy(() =>
	z.object({
		address: z.string(),
		city: z.string(),
		id: z.string(),
		name: z.string(),
		lat: z.string().optional(),
		lon: z.string().optional(),
		notes: z.string().optional(),
		screenings: z.array(ScreeningSchema).optional()
	})
);

// FILM
export const FilmSchema: z.ZodType<Film> = z.lazy(() =>
	z.object({
		cast: z.string().transform((s) => s.split(',')),
		director_id: z.string(),
		duration: z.coerce.number().int(),
		countryOfOrigin: z.string(),
		editing: z.string().transform((s) => s.split(',')),
		tags_en: z.string().transform((val) =>
			val
				.split(',')
				.map((g) => g.trim())
				.map((name) => GenreSchema.parse({ name }))
		),
		tags_it: z.string().transform((val) =>
			val
				.split(',')
				.map((g) => g.trim())
				.map((name) => GenreSchema.parse({ name }))
		),
		id: z.string(),
		format: z.string(),
		image: z.string(),
		languages: z.string().transform((s) => s.split(',')),
		music: z.string(),
		originalTitle: z.string(),
		originalVersion: z.coerce.boolean(),
		photography: z.string().transform((s) => s.split(',')),
		producers: z.string().transform((s) => s.split(',')),
		production: z.string(),
		screenings: z.array(ScreeningSchema).optional(),
		screenplay: z.string().transform((s) => s.split(',')),
		section: z.string(), // e.g., "ic", "ooc
		slug: z.string().transform((s) => s.trim().replace(/\s+/g, '-')),
		sound: z.string().transform((s) => s.split(',')),
		synopsis_it: z.string(),
		synopsis_en: z.string(),
		title: z.string(),
		tone: z.string(),
		version: z.string(), // e.g., "if", "Omiu", "Omeu"
		year: z.coerce.number().int()
	})
);
