<!-- src/lib/components/LanguageSwitcher.svelte -->
<script lang="ts">
	import { locale } from '$lib/i18n/';
	import { get } from 'svelte/store';

	// Initialize `selected` from the current locale
	export let selected: string = get(locale);
	const options = ['it', 'en'];

	// Reactive: runs whenever `selected` changes
	$: if (selected) {
		locale.set(selected);
	}
</script>

<div class="lang-switcher" role="radiogroup" aria-label="Language selector">
	{#each options as lang (lang)}
		<button
			type="button"
			class="lang-button"
			class:active={lang === selected}
			aria-pressed={lang === selected}
			on:click={() => (selected = lang)}
		>
			{lang.toUpperCase()}
		</button>
	{/each}
</div>

<style>
	.lang-switcher {
		display: flex;
		gap: 0.5rem;
		border: 1px solid var(--color-ui-border);
		border-radius: 999px;
		padding: 0.25rem 0.5rem;
		background: var(--color-ui-surface);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
	}
	.lang-button {
		all: unset;
		cursor: pointer;
		padding: 0.25rem 0.75rem;
		border-radius: 999px;
		font-weight: 500;
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		transition: all 0.2s ease;
	}
	.lang-button.active {
		background: var(--color-brand-primary);
		color: var(--color-brand-secondary);
	}
	.lang-button:hover:not(.active) {
		color: var(--color-text-primary);
	}
</style>
