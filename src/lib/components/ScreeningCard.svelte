<script lang="ts">
	import { t } from '$lib/i18n';
	import { getCountryName } from '$lib/utils/utils';
	import type { Director } from '$lib/types/Film';

	let { locale, event, directors } = $props();

	const imgPath = `/images/films/${event.film?.id}_card.jpg`;

	const directorNames = event.film?.director_id
		? directors
				.filter((d: Director) => d.id === event.film?.director_id)
				.map((d: Director) => d.name)
				.join(', ')
		: 'Unknown Director';
</script>

<a
	class="card"
	href={`/program/${event.film?.id}-${event.film?.slug}`}
	aria-label={event.film?.title || 'Film'}
	style="--card-h: 28rem"
>
	<div class="card__media">
		<img src={imgPath} alt={event.film?.title || 'Film image'} loading="lazy" />
	</div>

	<div class="card__body">
		<div class="card__top">
			<div class="muted">
				{event.time.toLocaleTimeString([locale], { hour: '2-digit', minute: '2-digit' })}
			</div>
			<div class="muted">{event.venue?.name || 'Unknown Venue'}</div>
		</div>

		<div class="section-label">{$t(`program.${event.film?.section}`)}</div>

		<h3 class="card__title">{event.film?.title}</h3>

		<div class="chips">
			<span class="badge">
				{$t('program.by')}
				{directorNames}
			</span>
			<span class="badge">
				{event.film?.countryOfOrigin ? getCountryName(event.film?.countryOfOrigin, locale) : 'TBA'}
			</span>
			<span class="badge">{event.film?.year}</span>
			<span class="badge">{event.film?.duration}'</span>
			<span class="badge">{$t(`program.${event.film?.version}`)}</span>
		</div>
	</div>
</a>

<style>
</style>
