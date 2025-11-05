<script lang="ts">
	import { MapPinOutline, FacebookSolid, InstagramSolid } from 'flowbite-svelte-icons';
	import type { Venue } from '$lib/types/Film';
	import { shuffled } from '$lib/utils/utils';

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

	const venuesShuffled = shuffled<Venue>(venues);
</script>

<ul class="venues-list__wrapper">
	{#each venuesShuffled as venue (venue)}
		<li class="venue-item__wrapper">
			<div class="venues-list-left__wrapper">
				<button
					class="venues-title-button"
					onclick={() => focus(venue)}
					aria-label={`Centra ${venue.name} sulla mappa`}
					disabled={!venue.lat || !venue.lon}
					title={`Centra ${venue.name} sulla mappa`}
				>
					<span class="venue-name">{venue.name}</span>
				</button>

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
