<script>
	import { t } from '$lib/i18n';
	import waves from '$lib/images/motion_waves.mp4';

	const venuesLogoPinPath = '/images/map-venice-pin.png';
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
		<div class="venues__logo">
			<img src={venuesLogoPinPath} alt="Logo Venice Pin Map" loading="lazy" />
		</div>
	</div>
</section>
