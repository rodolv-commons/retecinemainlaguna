// scripts/geocode_venues.ts
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';
import { type Venue } from '$lib/types/Film';

// Cache: chiave testuale → lat/lon
type Geocache = Record<string, { lat: number; lon: number }>;

const CSV_PATH = 'static/venues.csv';
const CACHE_PATH = 'static/geo/venues_geocache.json';
const GEOJSON_OUT = 'static/geo/venues.geojson';
const JSON_OUT = 'static/geo/venues.json';

// Nominatim viewbox: ORDER = left, top, right, bottom (lon,lat,lon,lat)
const VENICE_VIEWBOX = '12.28,45.46,12.39,45.41'; // laguna centrale

function esc(s: string = '') {
	return s.replace(
		/[&<>"']/g,
		(m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]!
	);
}
function hostOf(url?: string) {
	if (!url) return '';
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return '';
	}
}
async function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}

async function geocode(q: string): Promise<{ lat: number; lon: number } | null> {
	const url = new URL('https://nominatim.openstreetmap.org/search');
	url.searchParams.set('format', 'jsonv2');
	url.searchParams.set('q', q);
	url.searchParams.set('limit', '1');
	url.searchParams.set('countrycodes', 'it');
	url.searchParams.set('accept-language', 'it');
	url.searchParams.set('viewbox', VENICE_VIEWBOX);
	url.searchParams.set('bounded', '1');

	const res = await fetch(url, {
		headers: {
			'User-Agent': 'InLaguna-Festival-Geocoder/1.0 (contact: your-email@example.org)',
			Referer: 'https://inlaguna.example.org'
		}
	}).catch(() => null);
	if (!res || !res.ok) return null;

	const arr = (await res.json()) as Array<{ lat: string; lon: string }>;
	if (!arr?.length) return null;
	return { lat: parseFloat(arr[0].lat), lon: parseFloat(arr[0].lon) };
}

function toKey(v: Venue) {
	const addr = `${v.street ?? ''} ${v.civic ?? ''}, ${v.zip ?? ''} ${v.city ?? ''}`
		.replace(/\s+/g, ' ')
		.trim();
	return `${v.name} | ${addr}`;
}

function toQuery(v: Venue) {
	const line1 = `${v.street ?? ''} ${v.civic ?? ''}`.replace(/\s+/g, ' ').trim();
	const line2 = `${v.zip ?? ''} ${v.city ?? ''}`.replace(/\s+/g, ' ').trim();
	// Hint forte su Venezia
	return [line1, line2, 'Venezia'].filter(Boolean).join(', ');
}

function toPopup(v: Venue) {
	const addr = [
		`${v.street ?? ''} ${v.civic ?? ''}`.replace(/\s+/g, ' ').trim(),
		`${v.zip ?? ''} ${v.city ?? ''}`.replace(/\s+/g, ' ').trim()
	]
		.filter(Boolean)
		.join(', ');
	const link = v.website
		? `<br/><a href="${esc(v.website)}" target="_blank" rel="noopener">${esc(hostOf(v.website))}</a>`
		: '';
	return `<strong>${esc(v.name)}</strong><br/>${esc(addr)}${link}`;
}

async function main() {
	// 1) Read CSV
	const csv = await fs.readFile(CSV_PATH, 'utf8');
	const rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true }) as Venue[];

	// 2) Load cache
	let cache: Geocache = {};
	try {
		cache = JSON.parse(await fs.readFile(CACHE_PATH, 'utf8'));
	} catch (err) {
		if (err instanceof Error) {
			console.log('cache:', err?.message ?? 'no cache yet');
		}
	}

	// 3) Geocode missing lat/lon
	for (const v of rows) {
		if (v.lat && v.lon) continue;

		const key = toKey(v);
		if (cache[key]) {
			v.lat = String(cache[key].lat);
			v.lon = String(cache[key].lon);
			continue;
		}

		// Prima: indirizzo
		let q = toQuery(v);
		console.log('Geocoding:', q);
		let hit = await geocode(q);

		// Fallback: nome + città
		if (!hit) {
			q = [v.name, v.city, 'Venezia'].filter(Boolean).join(', ');
			console.log('Fallback:', q);
			hit = await geocode(q);
		}

		if (hit) {
			cache[key] = { lat: hit.lat, lon: hit.lon };
			v.lat = String(hit.lat);
			v.lon = String(hit.lon);
		} else {
			console.warn('No result for:', v.name, '→', toQuery(v));
		}

		// ≤ 1 req/sec (gentile con Nominatim). Aggiungo jitter minimo.
		await sleep(1100 + Math.floor(Math.random() * 200));
	}

	// 4) Persist cache
	await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
	await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2));

	// 5) (Opzionale) riscrivi CSV con lat/lon aggiornati
	//    Mantengo l'ordine delle colonne esistenti, aggiungo lat/lon se mancavano
	const header = Array.from(new Set([...Object.keys(rows[0] ?? {}), 'lat', 'lon']));
	const csvOut = [
		header.join(','),
		...rows.map((r) =>
			header
				.map((h) => String((r as never)[h] ?? '')) // pick field or empty
				.map((s) => s.replaceAll('"', '""')) // escape "
				.map((s) => (s.includes(',') ? `"${s}"` : s)) // quote if comma
				.join(',')
		)
	].join('\n');
	await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
	await fs.writeFile(CSV_PATH, csvOut);

	// 6) Build GeoJSON
	const features = rows
		.filter((r) => r.lat && r.lon)
		.map((r) => ({
			type: 'Feature' as const,
			geometry: {
				type: 'Point' as const,
				coordinates: [Number(r.lon), Number(r.lat)] as [number, number]
			},
			properties: {
				id: r.id,
				name: r.name,
				street: r.street,
				civic: r.civic,
				zip: r.zip,
				city: r.city,
				website: r.website,
				instagram: r.instagram,
				facebook: r.facebook,
				popup: toPopup(r)
			}
		}));
	const fc = { type: 'FeatureCollection' as const, features };

	// 7) Write outputs
	await fs.mkdir(path.dirname(GEOJSON_OUT), { recursive: true });
	await fs.writeFile(GEOJSON_OUT, JSON.stringify(fc));

	await fs.mkdir(path.dirname(JSON_OUT), { recursive: true });
	await fs.writeFile(
		JSON_OUT,
		JSON.stringify(
			features.map((f) => ({
				id: f.properties.id,
				name: f.properties.name,
				street: f.properties.street,
				civic: f.properties.civic,
				zip: f.properties.zip,
				city: f.properties.city,
				lon: f.geometry.coordinates[0],
				lat: f.geometry.coordinates[1]
			})),
			null,
			2
		)
	);

	console.log(`Wrote ${features.length} features to ${GEOJSON_OUT} and ${JSON_OUT}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
