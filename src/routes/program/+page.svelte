<script lang="ts">
	import waves from '$lib/images/motion_waves.mp4';
	import { t } from '$lib/i18n';

	import { onMount } from 'svelte';
	let video: HTMLVideoElement;

	onMount(() => {
		video.playbackRate = 0.3;
		video.play();
	});
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
		<div class="festival__middle__title text-column">
			<h2>{$t('program.title')}</h2>
			<p>{$t('program.subtitle')}</p>
		</div>
	</div>
</section>
