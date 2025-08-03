// src/lib/server/parseCsv.ts
import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';
import type { ZodType } from 'zod';
import path from 'path';
import { fileURLToPath } from 'url';
import {
	type Film,
	type Director,
	type Screening,
	type Venue,
	type FestivalEvent
} from '$lib/types/Film';

import {
	FilmSchema,
	DirectorSchema,
	ScreeningSchema,
	VenueSchema,
	FestivalEventSchema
} from '$lib/schema/film';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');

export function parseCsvFile<T>(content: string, schema: ZodType<T>): T[] {
	const records = parse(content, {
		columns: true,
		skip_empty_lines: true,
		trim: true
	}) as unknown[];

	return records.map((record, i) => {
		const result = schema.safeParse(record);
		if (!result.success) {
			console.error(`Error parsing CSV at row ${i + 1}:`, record);
			console.error(result.error.format());
			throw new Error(`CSV parsing error on row ${i + 1}`);
		}
		return result.data;
	});
}

export async function loadFilms(): Promise<Film[]> {
	const file = path.join(DATA_DIR, 'films.csv');
	const content = await readFile(file, 'utf-8');
	return parseCsvFile(content, FilmSchema);
}

export async function loadDirectors(): Promise<Director[]> {
	const file = path.join(DATA_DIR, 'directors.csv');
	const content = await readFile(file, 'utf-8');
	return parseCsvFile(content, DirectorSchema);
}

export async function loadScreenings(): Promise<Screening[]> {
	const file = path.join(DATA_DIR, 'screenings.csv');
	const content = await readFile(file, 'utf-8');
	return parseCsvFile(content, ScreeningSchema);
}

export async function loadVenues(): Promise<Venue[]> {
	const file = path.join(DATA_DIR, 'venues.csv');
	const content = await readFile(file, 'utf-8');
	return parseCsvFile(content, VenueSchema);
}

export async function loadFestivalEvents(): Promise<FestivalEvent[]> {
	const file = path.join(DATA_DIR, 'festival-events.csv');
	const content = await readFile(file, 'utf-8');
	return parseCsvFile(content, FestivalEventSchema);
}
