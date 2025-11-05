<!-- src/lib/components/LogoFader.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Logo } from '../types/typeGuards'; // o definisci: type Logo = { src:string; alt:string }

	export let logos: Logo[] = [];
	export let delay = 2200; // ms tra un logo e l'altro
	export let duration = 400; // ms di crossfade

	let i = 0;
	let showA = true; // quale layer è visibile
	let a: Logo | null = null; // buffer A
	let b: Logo | null = null; // buffer B
	let timer: ReturnType<typeof setInterval> | null = null;
	let paused = false;
	let reduced = false;

	function stop() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	function start() {
		if (!reduced && delay > 0) {
			stop();
			timer = setInterval(() => {
				if (!paused) next();
			}, delay);
		}
	}

	async function preload(src: string) {
		const img = new Image();
		img.decoding = 'async';
		img.loading = 'eager';
		img.src = src;
		try {
			if (img.decode) await img.decode();
		} catch {
			/* ignore */
		}
	}

	async function prime() {
		if (!logos.length) return;
		a = logos[0];
		await preload(a.src);
		if (logos.length > 1) {
			b = logos[1];
			await preload(b.src);
		}
	}

	async function next() {
		if (!logos.length) return;
		const nextIndex = (i + 1) % logos.length;
		const nextLogo = logos[nextIndex];
		await preload(nextLogo.src); // carica PRIMA
		if (showA) b = nextLogo;
		else a = nextLogo; // metti nel buffer nascosto
		showA = !showA; // switch → crossfade
		i = nextIndex;
	}

	async function prev() {
		if (!logos.length) return;
		const prevIndex = (i - 1 + logos.length) % logos.length;
		const prevLogo = logos[prevIndex];
		await preload(prevLogo.src);
		if (showA) b = prevLogo;
		else a = prevLogo;
		showA = !showA;
		i = prevIndex;
	}

	onMount(async () => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.documentElement.style.setProperty('--logo-fade-dur', `${duration}ms`);
		await prime();
		start();
	});
	onDestroy(stop);

	$: total = logos.length;
	$: current = total ? i + 1 : 0;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="logo-fader"
	on:mouseenter={() => (paused = true)}
	on:mouseleave={() => (paused = false)}
	aria-roledescription="carousel"
>
	<div class="fraction" aria-live="polite" aria-atomic="true">{current} / {total}</div>

	{#if a}
		<img class="layer a" src={a.src} alt={a.alt} draggable="false" class:visible={showA} />
	{/if}
	{#if b}
		<img class="layer b" src={b.src} alt={b.alt} draggable="false" class:visible={!showA} />
	{/if}

	<!-- <button class="nav prev" aria-label="Previous" on:click={prev}>‹</button>
	<button class="nav next" aria-label="Next" on:click={next}>›</button> -->
</div>

<style>
	.logo-fader {
		position: relative;
		width: min(100%, 480px);
		height: 200px; /* fissa l’area di stage */
		overflow: hidden;
	}

	/* due layer sovrapposti, sempre centrati identici */
	.layer {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		user-select: none;
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--logo-fade-dur, 400ms) ease;
	}
	.layer.visible {
		opacity: 1;
	}

	.fraction {
		position: absolute;
		top: 6px;
		right: 8px;
		padding: 2px 6px;
		border-radius: 6px;
		font-size: 0.85rem;
		background: rgba(0, 0, 0, 0.35);
		color: #fff;
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 28px;
		height: 28px;
		border: 0;
		border-radius: 999px;
		display: grid;
		place-items: center;
		cursor: pointer;
		background: rgba(0, 0, 0, 0.35);
		color: #fff;
		opacity: 0.65;
	}
	.nav:hover {
		opacity: 1;
	}
	.prev {
		left: 6px;
	}
	.next {
		right: 6px;
	}

	@media (prefers-reduced-motion: reduce) {
		.layer {
			transition: none !important;
		}
	}
</style>
