<script lang="ts">
	import { t } from '$lib/i18n';
	import waves from '$lib/images/motion_waves.mp4';
	import { MapLibre } from 'svelte-maplibre';
	import type { LngLatLike, LngLatBoundsLike } from 'svelte-maplibre';
	import type { Map as MapLibreMap } from 'maplibre-gl';
	import type { PageData } from './$types';
	import VenuesList from '$lib/components/VenuesList.svelte';
	import BackToMapButton from '$lib/components/BackToMapButton.svelte';

	// const venuesLogoPinPath = '/images/map-venice-pin.png';

	export let data: PageData;
	const { venues } = data;

	console.log(venues);

	const LIDO_BOUNDS: LngLatBoundsLike = [
		[12.3, 45.42],
		[12.37, 45.45]
	];
	const CENTER: LngLatLike = [12.335, 45.435];

	let map: MapLibreMap;
	let booted = false;

	$: if (map && !booted) {
		booted = true;

		// do your initial setup once
		map.fitBounds(LIDO_BOUNDS, { padding: 20, duration: 0 });
		map.setMaxBounds(LIDO_BOUNDS);
		map.setMinZoom(11);
		map.setMaxZoom(18);

		// if you need to add layers/sources after the style loads:
		map.on('load', async () => {
			const image = await map.loadImage(
				'https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png'
			);
			map.addImage('custom-marker', image.data);
			// e.g. add your GeoJSON points layer here
			map.addSource('venues', { type: 'geojson', data: '/geo/venues.geojson' });
			map.addLayer({
				id: 'venues-circle',
				type: 'symbol', // symbol" | "raster" | "fill" | "line" | "circle" | "heatmap" | "fill-extrusion" | "hillshade" | "color-relief" | "background" | "custom"
				source: 'venues',
				//paint: { 'circle-radius': 6, 'circle-opacity': 0.45 } // this is for circle type
				layout: {
					'icon-image': 'custom-marker'
				}
			});
		});

		// when style changes, re-add custom layers
		map.on('styledata', () => {
			// ensure your custom sources/layers exist after a style switch
		});
	}
</script>

<svelte:head>
	<title>InLaguna Film Festival</title>
	<meta name="description" content="festival overview" />
</svelte:head>

<section class="overview__wrapper">
	<div class="intro__wrapper">
		<div class="intro__title">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<div>{@html $t('program.intro')}</div>
		</div>
		<div class="intro__animated">
			<div>
				<video class="background-video" autoplay muted loop playsinline>
					<source src={waves} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	</div>
	<div class="program__wrapper">{$t(`overview.program`)}</div>
	<div class="venues__wrapper">
		<div class="venues__title">
			<div>{$t(`overview.venues`)}</div>
		</div>
		<div class="venues__text">
			Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
			invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
			ipsum dolor sit amet.
		</div>
		<!-- <div class="venues__logo">
			<img src={venuesLogoPinPath} alt="Logo Venice Pin Map" loading="lazy" />
		</div> -->
		<div id="map" class="venues-map__wrapper">
			<MapLibre
				center={CENTER}
				zoom={11}
				class="venues-map"
				maxBounds={LIDO_BOUNDS}
				style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
				bind:map
			/>
		</div>

		<VenuesList {venues} />

		<BackToMapButton targetId="map" offset={72} label="Torna alla mappa" />
	</div>
</section>

<style>
	:global(.venues-map) {
		height: 300px;
	}
</style>
