<script>
	import { t } from '$lib/i18n';
	import waves from '$lib/images/motion_waves.mp4';
	import { MapLibre } from 'svelte-maplibre';

	// const venuesLogoPinPath = '/images/map-venice-pin.png';

	/* const LIDO_BOUNDS: [[number, number], [number, number]] = [
		[12.3, 45.42],
		[12.37, 45.45]
	]; */
	// const CENTER: [number, number] = [12.335, 45.435];

	/* const LIDO_BOUNDS = [
		[12.3, 45.42],
		[12.37, 45.45]
	]; */
	// const CENTER = [12.335, 45.435];

	/** @type {import('maplibre-gl').Map} */
	let map;
	let booted = false;

	$: if (map && !booted) {
		booted = true;

		// do your initial setup once
		map.fitBounds(
			[
				[12.3, 45.42],
				[12.37, 45.45]
			],
			{ padding: 20, duration: 0 }
		);
		map.setMaxBounds([
			[12.3, 45.42],
			[12.37, 45.45]
		]);
		map.setMinZoom(11);
		map.setMaxZoom(18);

		// if you need to add layers/sources after the style loads:
		map.on('load', () => {
			// e.g. add your GeoJSON points layer here
			map.addSource('venues', { type: 'geojson', data: '/geo/venues.geojson' });
			map.addLayer({
				id: 'venues-circle',
				type: 'circle',
				source: 'venues',
				paint: { 'circle-radius': 8, 'circle-opacity': 0.65 }
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
		<MapLibre
			center={[12.335, 45.435]}
			zoom={11}
			class="map"
			maxBounds={[
				[12.3, 45.42],
				[12.37, 45.45]
			]}
			standardControls
			style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
			bind:map
		/>
	</div>
</section>

<style>
	:global(.map) {
		width: 100%;
		height: 400px;
		border-radius: 12px;
	}
</style>
