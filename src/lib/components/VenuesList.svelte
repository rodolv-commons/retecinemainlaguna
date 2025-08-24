<script lang="ts">
	import { MapPinOutline, FacebookSolid, InstagramSolid } from 'flowbite-svelte-icons';
	import type { Venue } from '$lib/types/Film';
	// import { shuffled } from '$lib/utils/utils';

	let { venues, onFocusOnMap } = $props<{
		venues: Venue[];
		onFocusOnMap?: (payload: { id?: string; lat: number; lon: number; name?: string }) => void;
	}>();

	function focus(venue: Venue) {
		if (!venue.lat || !venue.lon) return;
		onFocusOnMap?.({
			id: venue.id,
			lat: Number(venue.lat),
			lon: Number(venue.lon),
			name: venue.name
		});
	}

	// const venuesShuffled = shuffled<Venue>(venues);
</script>

<!-- <div class="venues-nav__wrapper">
	<div class="direction-navigation">
		<button class="direction-navigation__button" aria-label="Arrow">
			<span class="direction-navigation__icon">
				<svg
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.014 3L0 12.795l10.014 9.795 1.447-1.395-7.612-7.404H25v-1.976H3.849l7.612-7.404L10.014 3z"
						fill="white"
					>
					</path>
				</svg>
			</span>
		</button>
		<button class="direction-navigation__button" aria-label="Arrow">
			<span class="direction-navigation__icon">
				<svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14.986 22.59L25 12.795 14.986 3 13.54 4.395l7.612 7.404H0v1.975h21.151L13.54 21.18l1.447 1.41z"
						fill="white"
					>
					</path>
				</svg>
			</span>
		</button>
	</div>
</div> -->
<ul class="venues-list__wrapper">
	{#each venues as venue (venue)}
		<li class="venue-item__wrapper">
			<div class="venues-list-left__wrapper">
				<div class="venue-name">{venue.name}</div>
				<div class="venue-address">
					<div class="venue-street-civic">{venue.street} {venue.civic}</div>
					<div class="venue-zip-city">{venue.zip} {venue.city}</div>
				</div>

				<div class="venue-description">{venue.description}</div>
				<div class="venue-webresources">
					{#if venue.website}
						{@const host = venue.website
							? new URL(venue.website).hostname.replace(/^www\./, '')
							: ''}
						<a
							href={venue.website}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 underline underline-offset-2"
							aria-label={`Apri ${host}`}
						>
							<span>{host}</span>
						</a>
					{/if}

					{#if venue.instagram}
						<a
							href={venue.instagram}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Apri Instagram"
							class="inline-flex"
						>
							<InstagramSolid class="h-5 w-5" />
							<span class="sr-only">Instagram</span>
						</a>
					{/if}

					{#if venue.facebook}
						<a
							href={venue.facebook}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Apri Facebook"
							class="inline-flex"
						>
							<FacebookSolid class="h-5 w-5" />
							<span class="sr-only">Facebook</span>
						</a>
					{/if}
				</div>
			</div>
			<div class="venues-list-right__wrapper">
				<button
					class="venues-pin-button"
					onclick={() => focus(venue)}
					aria-label={`Centra ${venue.name} sulla mappa`}
					disabled={!venue.lat || !venue.lon}
					title={`Centra ${venue.name} sulla mappa`}
				>
					<MapPinOutline class="h-10 w-10 shrink-0" />
				</button>
			</div>
		</li>
	{/each}
</ul>
