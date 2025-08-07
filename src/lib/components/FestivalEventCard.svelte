<script lang="ts">
	import '../styles/footer.css';
	import { Card, Badge } from 'flowbite-svelte';
	import { t } from '$lib/i18n';

	let { locale, event } = $props();
</script>

<div class="events-for-day__item">
	<Card class="card-item" img="src/lib/images/hero_image.webp">
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
			<div class="mb-3 leading-tight font-normal text-gray-700 uppercase dark:text-gray-400">
				<Badge large color="red">{$t(`program.${event.festivalEvent?.category}`)}</Badge>
			</div>

			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{event.festivalEvent?.title}
			</h5>
			<p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">
				{event.festivalEvent?.description}
			</p>
		</div>
	</Card>
</div>
