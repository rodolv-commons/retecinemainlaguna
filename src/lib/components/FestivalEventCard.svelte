<script lang="ts">
	import { t } from '$lib/i18n';

	let { locale, event } = $props();

	const imgPath = '/images/hero_image.webp';
</script>

<div class="card">
	<!-- aumenta per più altezza -->
	<div class="card__media">
		<img src={imgPath} alt={event.festivalEvent?.title || 'Event image'} loading="lazy" />
	</div>

	<div class="card__body">
		<div class="card__top">
			<div class="muted">
				{event.time.toLocaleTimeString([locale], { hour: '2-digit', minute: '2-digit' })}
			</div>
			<div class="muted">{event.venue?.name || 'Unknown Venue'}</div>
		</div>

		<p class="section-label">{$t(`program.${event.festivalEvent?.category}`)}</p>

		<h3 class="card__title">{event.festivalEvent?.title}</h3>

		<p class="card__desc">{event.festivalEvent?.description}</p>
	</div>
</div>

<style>
</style>
