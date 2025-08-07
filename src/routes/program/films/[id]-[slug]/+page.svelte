<script lang="ts">
	// import the generated type so TS knows about your film prop
	import type { PageData } from './$types';

	// `data` is exactly the object you returned from load()
	export let data: PageData;

	// pull your film out of it
	const { film } = data;
</script>

{#if film}
	<h1>{film.title}</h1>
	<!-- etc… -->
{:else}
	<p>Film not found.</p>
{/if}
