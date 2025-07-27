<script lang="ts">
	import logo from '$lib/images/logo.jpg';
	import LangSwitcher from '$lib/components/LangSwitcher.svelte';
	import NavBar from './NavBar.svelte';
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={logo} alt="Rete cinema in laguna" />
		</a>
	</div>

	<NavBar />

	<LangSwitcher />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
