<script lang="ts">
	import LangSwitcher from '$lib/components/LangSwitcher.svelte';
	import NavBar from './NavBar.svelte';
</script>

<header>
	<NavBar />

	<div class="lang_switch_wrapper">
		<LangSwitcher />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: flex-end;
		z-index: 100;
		position: relative;
	}
</style>
