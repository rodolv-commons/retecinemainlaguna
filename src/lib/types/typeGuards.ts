import type { FestivalEvent, Screening } from './Film';

export function isScreening(obj: unknown): obj is Screening {
	// 1) quick reject if not an object
	if (typeof obj !== 'object' || obj === null) return false;

	// 2) cast to indexable so TS lets us do o['prop']
	const o = obj as Record<string, unknown>;

	// 3) helper to validate ISO datetime strings
	const isISODateTime = (s: unknown): s is string =>
		typeof s === 'string' && !Number.isNaN(Date.parse(s));

	// 4) all checks in one boolean
	return (
		typeof o.film_id === 'string' && isISODateTime(o.datetime) && typeof o.venue_id === 'string'
	);
}

export function isFestivalEvent(obj: unknown): obj is FestivalEvent {
	if (typeof obj !== 'object' || obj === null) return false;
	// Now obj is object—but TS still won’t let you do (obj as any).title
	// So we cast to a loose record:
	const o = obj as Record<string, unknown>;

	const isISODate = (s: unknown): s is string =>
		typeof s === 'string' && !Number.isNaN(Date.parse(s));

	return (
		typeof o.title === 'string' &&
		typeof o.description === 'string' &&
		typeof o.category === 'string' &&
		(o.speaker === undefined ||
			(Array.isArray(o.speaker) && o.speaker.every((s) => typeof s === 'string'))) &&
		(o.speakerBio === undefined || typeof o.speakerBio === 'string') &&
		typeof o.venue_id === 'string' &&
		isISODate(o.startDate) &&
		(o.endDate === undefined || isISODate(o.endDate))
	);
}

export type Logo = { src: string; alt: string };
