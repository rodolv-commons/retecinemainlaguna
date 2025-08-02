<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import '$lib/styles/app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="home-app">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: calc(var(--header-height) * -1);
	}
</style>
