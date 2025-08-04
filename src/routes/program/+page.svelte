<script lang="ts">
	import programPDF from '$lib/assets/program.pdf';
	import waves from '$lib/images/motion_waves.mp4';
	import { t } from '$lib/i18n';
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import type { FestivalEvent, Screening, Film, Venue } from '$lib/types/Film';

	interface EventsForDay {
		type: FestivalEvent | Screening;
		film?: Film; // optional, if you want to include film title
		venue: Venue;
		time: Date;
	}

	export function isEventDay(obj: unknown): obj is FestivalEvent {
		return (
			obj !== null &&
			typeof obj === 'object' &&
			'type' in obj &&
			(obj as { type?: unknown }).type === 'event' &&
			'title' in obj &&
			typeof (obj as { title?: unknown }).title === 'string' &&
			'startDate' in obj &&
			(obj as { startDate?: unknown }).startDate instanceof Date
		);
	}
	export function isScreeningDay(obj: unknown): obj is Screening {
		return (
			obj !== null &&
			typeof obj === 'object' &&
			(obj as { type?: unknown }).type === 'screening' &&
			typeof (obj as { film_id?: unknown }).film_id === 'number' &&
			(obj as { datetime?: unknown }).datetime instanceof Date
		);
	}

	// destructure festivalDays (and anything else)
	export let data: PageData;
	const { festivalDays, festivalEvents, screenings, films, venues } = data;
	let selectedDay: number = festivalDays[0];
	let eventsForDay: EventsForDay[] = [];

	// whenever selectedDay changes, build the merged, sorted list
	$: eventsForDay = (() => {
		if (selectedDay === null) return [];
		const dayEvents = festivalEvents.filter(
			(event: FestivalEvent) => new Date(event.startDate).getDate() === selectedDay
		);
		const dayScreenings = screenings.filter(
			(screening: Screening) => new Date(screening.datetime).getDate() === selectedDay
		);

		return [
			...dayEvents.map((event: FestivalEvent) => ({
				type: event,
				venue: venues.find((venue: Venue) => venue.id === event.venue_id),
				time: new Date(event.startDate)
			})),
			...dayScreenings.map((screening: Screening) => ({
				type: screening,
				screening,
				venue: venues.find((venue: Venue) => venue.id === screening.venue_id),
				film: films.find((film: Film) => film.id === screening.film_id),
				time: new Date(screening.datetime)
			}))
		].sort((a, b) => a.time.getTime() - b.time.getTime());
	})();
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
				<video class="background-video" autoplay muted loop playsinline>
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
				{#each festivalDays as day (day)}
					<button
						type="button"
						class:selected={day === selectedDay}
						on:click={() => (selectedDay = day)}
					>
						<li class="date-selector__item">{day}</li>
					</button>
				{/each}
			</ul>
			{#if selectedDay !== null && eventsForDay.length > 0}
				<h2>Eventi per il giorno {selectedDay}</h2>
				<ul class="events-for-day__list">
					{#each eventsForDay as event (event)}
						<Card img="src/lib/images/hero_image.webp">
							<div class="m-6">
								<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{isEventDay(event.type) ? event.venue.address : event.film?.title}
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
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</section>
