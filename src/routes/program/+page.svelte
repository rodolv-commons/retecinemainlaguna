<script lang="ts">
	import waves from '$lib/images/motion_waves.mp4';
	import programPDF from '$lib/assets/program.pdf';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	let vCard = false;

	let video: HTMLVideoElement;

	onMount(() => {
		video.playbackRate = 0.3;
		video.play();
	});

	// just `export let data`:
	export let data: LayoutData;
	const { films, directors, venues, screenings, festivalEvents } = data;
	console.log('films', films);
	console.log('directors', directors);
	console.log('venues', venues);
	console.log('screenings', screenings);
	console.log('festivalEvents', festivalEvents);
</script>

<svelte:head>
	<title>Festival Program</title>
	<meta name="description" content="festival program" />
</svelte:head>

<section class="festival__wrapper">
	<div class="top__wrapper">
		<div class="top__title text-column">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<h1>{@html $t('program.intro')}</h1>
		</div>
		<div class="top__animated">
			<div>
				<video class="background-video" bind:this={video} autoplay muted loop playsinline>
					<source src={waves} type="video/mp4" />

					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	</div>
	<div class="festival__middle__wrapper">
		<div class="download-box">
			<p class="download-text">Scarica il programma del festival in formato PDF</p>
			<a href={programPDF} download class="download-button"> Scarica il PDF ⬇️ </a>
		</div>
	</div>

	<div class="festival__bottom__wrapper">
		<div class="schedule__wrapper">
			<ul class="date-selector__list">
				<li class="date-selector__item">1</li>
				<li class="date-selector__item">2</li>
				<li class="date-selector__item">3</li>
				<li class="date-selector__item">4</li>
				<li class="date-selector__item">5</li>
			</ul>
		</div>
	</div>

	<div class="space-y-4">
		<Card img="src/lib/images/hero_image.webp" reverse={vCard}>
			<div class="m-6">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Noteworthy technology acquisitions 2021
				</h5>
				<p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
					chronological order.
				</p>
				<Button class="w-40">
					Read more <ArrowRightOutline class="ms-2 h-6 w-6 text-white" />
				</Button>
			</div>
		</Card>
		<Toggle bind:checked={vCard} class="italic dark:text-gray-500">Reverse</Toggle>
	</div>
</section>
