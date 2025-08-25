<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="hero"></section>

<style>
	.hero {
		position: relative;
		min-height: 90vh;
		display: flex;
		flex-direction: column;

		/* ← your full-screen background */
		background-image: url('/images/hero_image_3.png');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
