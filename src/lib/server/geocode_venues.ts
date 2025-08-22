// scripts/geocode_venues.ts
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';
import { type Venue } from '$lib/types/Film';

type Geocache = Record<string, { lat: number; lon: number }>;

const CSV_PATH = 'static/venues.csv';
const CACHE_PATH = 'static/geo/venues_geocache.json';
const GEOJSON_OUT = 'static/geo/venues.geojson';
const JSON_OUT = 'static/geo/venues.json';

// Venice bias (viewbox S,W,N,E; bounded=1 keeps results inside)
const VENICE_VIEWBOX = '12.28,45.41,12.39,45.46';

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
	});
	if (!res.ok) return null;
	const arr = await res.json();
	if (!arr?.length) return null;
	return { lat: parseFloat(arr[0].lat), lon: parseFloat(arr[0].lon) };
}

function toKey(v: Venue) {
	return `${v.name} | ${v.address}, ${v.city}`;
}

function toPopup(v: Venue) {
	const addr = [v.address, v.city].filter(Boolean).join(', ');
	/* const link = v.mapLink
		? `<a href="${v.mapLink}" target="_blank" rel="noopener">Open in Maps</a>`
		: ''; */
	const link = ''; // TODO REVIEW IT
	return `<strong>${v.name}</strong><br/>${addr}${link ? '<br/>' + link : ''}`;
}

async function main() {
	// read CSV
	const csv = await fs.readFile(CSV_PATH, 'utf8');
	const rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true }) as Venue[];

	// cache
	let cache: Geocache = {};
	try {
		cache = JSON.parse(await fs.readFile(CACHE_PATH, 'utf8'));
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message);
			cache = {};
		}
	}

	// geocode
	for (const v of rows) {
		if (v.lat && v.lon) continue;
		const key = toKey(v);
		if (cache[key]) {
			v.lat = String(cache[key].lat);
			v.lon = String(cache[key].lon);
			continue;
		}

		const query = `${v.address}, ${v.city}, Venezia`; // strong hint
		console.log('Geocoding:', query);
		const hit = await geocode(query);
		if (hit) {
			cache[key] = { lat: hit.lat, lon: hit.lon };
			v.lat = String(hit.lat);
			v.lon = String(hit.lon);
		} else {
			console.warn('No result for:', query);
		}
		await sleep(1100); // be polite to Nominatim (<=1 req/sec)
	}

	// persist cache
	await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
	await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2));

	// write back CSV with lat/lon filled (optional; comment if you prefer read-only)
	const header = Object.keys(rows[0] ?? { id: '', name: '', address: '', city: '' });
	console.log('header => ', header);
	const csvOut = [
		header.join(','),
		...rows.map((r) =>
			header
				.map((h) => String(r[h] ?? ''))
				.map((s) => String(s).replaceAll('"', '""'))
				.map((s) => (s.includes(',') ? `"${s}"` : s))
				.join(',')
		)
	].join('\n');
	await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
	await fs.writeFile(CSV_PATH, csvOut);

	// build GeoJSON
	const features = rows
		.filter((r) => r.lat && r.lon)
		.map((r) => ({
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [Number(r.lon), Number(r.lat)] },
			properties: {
				id: r.id,
				name: r.name,
				address: r.address,
				city: r.city,
				popup: toPopup(r)
			}
		}));
	const fc = { type: 'FeatureCollection', features };

	// write outputs
	await fs.mkdir(path.dirname(GEOJSON_OUT), { recursive: true });
	await fs.writeFile(GEOJSON_OUT, JSON.stringify(fc));
	await fs.mkdir(path.dirname(JSON_OUT), { recursive: true });
	await fs.writeFile(
		JSON_OUT,
		JSON.stringify(
			features.map((f) => ({
				id: f.properties.id,
				name: f.properties.name,
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
