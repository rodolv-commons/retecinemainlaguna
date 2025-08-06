<script lang="ts">
	import programPDF from '$lib/assets/program.pdf';
	import waves from '$lib/images/motion_waves.mp4';
	import { t, locale as localeStore } from '$lib/i18n';
	import type { PageData } from './$types';
	import type { FestivalEvent, Screening, Film, Venue } from '$lib/types/Film';
	import type { EventsForDay } from '$lib/types/Film';
	import ScreeningCard from '$lib/components/ScreeningCard.svelte';
	import { isFestivalEvent } from '$lib/types/typeGuards';
	import FestivalEventCard from '$lib/components/FestivalEventCard.svelte';

	// destructure festivalDays (and anything else)
	export let data: PageData;
	const { festivalDays, festivalEvents, screenings, films, venues, directors } = data;
	let selectedDay: number = festivalDays[0];
	let eventsForDay: EventsForDay[] = [];

	// Reactive locale store
	$: locale = $localeStore;

	// whenever selectedDay changes, build the merged, sorted list
	$: eventsForDay = (() => {
		if (selectedDay === null) return [];
		const dayEvents = festivalEvents.filter(
			(festivalEvent: FestivalEvent) => new Date(festivalEvent.startDate).getDate() === selectedDay
		);
		const dayScreenings = screenings.filter(
			(screening: Screening) => new Date(screening.datetime).getDate() === selectedDay
		);

		return [
			...dayEvents.map((festivalEvent: FestivalEvent) => ({
				type: festivalEvent,
				festivalEvent: festivalEvent,
				venue: venues.find((venue: Venue) => venue.id === festivalEvent.venue_id),
				time: new Date(festivalEvent.startDate)
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
				<h2 class="events-for-day__date">{$t(`program.${selectedDay}`)}</h2>
				<ul class="events-for-day__list">
					{#each eventsForDay as event (event)}
						{#if isFestivalEvent(event.type)}
							<FestivalEventCard {locale} {event}></FestivalEventCard>
						{:else}
							<ScreeningCard {locale} {event} {directors}></ScreeningCard>
						{/if}
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</section>
