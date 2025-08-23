<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ChevronUpOutline } from 'flowbite-svelte-icons';

	// Svelte 5:
	let { targetId = 'map', offset = 80, label = 'Torna alla mappa' } = $props();

	let show = $state(false);
	let target: HTMLElement | null = null;
	let io: IntersectionObserver | null = null;

	function scrollToTarget() {
		const el = document.getElementById(targetId);
		if (!el) return;
		const top = window.scrollY + el.getBoundingClientRect().top - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	onMount(() => {
		target = document.getElementById(targetId);

		const reveal = (entries: IntersectionObserverEntry[]) => {
			const e = entries[0];
			// mostra il bottone quando la mappa NON è (quasi) visibile
			show = !(e?.isIntersecting && e?.intersectionRatio > 0.1);
		};

		if ('IntersectionObserver' in window && target) {
			io = new IntersectionObserver(reveal, { threshold: [0, 0.1, 1] });
			io.observe(target);
		} else {
			// fallback semplice: dopo 300px di scroll
			const onScroll = () => (show = window.scrollY > 300);
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
			onDestroy(() => window.removeEventListener('scroll', onScroll));
		}
	});

	onDestroy(() => {
		if (io && target) io.unobserve(target);
	});
</script>

<button
	class="upbtn"
	class:upbtn--show={show}
	onclick={scrollToTarget}
	aria-label={label}
	title={label}
>
	<ChevronUpOutline class="upbtn__icon" />
	<span class="sr-only">{label}</span>
</button>

<style>
	.upbtn {
		position: fixed;
		right: 16px;
		bottom: calc(16px + env(safe-area-inset-bottom));
		z-index: 50;
		width: 48px;
		height: 48px;
		border: 0;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.65);
		color: #fff;
		backdrop-filter: blur(6px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
		display: grid;
		place-items: center;
		opacity: 0;
		transform: translateY(16px) scale(0.95);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease,
			background 0.2s ease;
		pointer-events: none;
	}
	.upbtn--show {
		opacity: 1;
		transform: translateY(0) scale(1);
		pointer-events: auto;
	}
	.upbtn:hover {
		background: rgba(0, 0, 0, 0.82);
	}
	.sr-only {
		position: absolute !important;
		height: 1px;
		width: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
