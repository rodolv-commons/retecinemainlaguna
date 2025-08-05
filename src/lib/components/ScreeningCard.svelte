<script lang="ts">
	import '../styles/footer.css';
	import { Card, Badge } from 'flowbite-svelte';
	import { t } from '$lib/i18n';
	import { getCountryName } from '$lib/utils/utils';
	import type { Director } from '$lib/types/Film';

	let { locale, event, directors } = $props();
</script>

<Card img="src/lib/images/hero_image.webp">
	<div class="m-6">
		<div class="mb-3 flex items-center justify-between">
			<p class="text-gray-500 dark:text-gray-400">
				{event.time.toLocaleTimeString([locale], {
					hour: '2-digit',
					minute: '2-digit'
				})}
			</p>
			<p class="text-gray-500 dark:text-gray-400">
				{event.venue?.name || 'Unknown Venue'}
			</p>
		</div>
		<p class="mb-3 leading-tight font-normal text-gray-700 uppercase dark:text-gray-400">
			{$t(`program.${event.film?.section}`)}
		</p>

		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{event.film?.title}
		</h5>
		<div class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">
			<Badge large color="yellow"
				>{$t('program.by')}
				{event.film?.director_id
					? directors
							.filter((d: Director) => d.id === event.film?.director_id)
							.map((d: Director) => d.name)
					: 'Unknown Director'}</Badge
			>

			<Badge large color="yellow"
				>{event.film?.countryOfOrigin
					? getCountryName(event.film?.countryOfOrigin, locale)
					: 'TBA'}</Badge
			>
			<Badge large color="yellow">{event.film?.year}</Badge>
			<Badge large color="yellow">{event.film?.duration}'</Badge>
			<Badge large color="yellow">{$t(`program.${event.film?.version}`)}</Badge>
		</div>
	</div>
</Card>
