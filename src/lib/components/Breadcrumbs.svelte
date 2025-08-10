<!-- src/lib/components/Breadcrumbs.svelte -->
<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { page } from '$app/state';

	interface Crumb {
		label: string;
		path: string;
	}

	const pathname = $derived(page.url.pathname);

	const crumbs = $derived(
		pathname
			.split('/')
			.filter((s: string) => s)
			.map<Crumb>((seg, i, segments) => {
				const path = '/' + segments.slice(0, i + 1).join('/');
				const label = decodeURIComponent(seg)
					.split('-')
					.map((w) => w[0].toUpperCase() + w.slice(1))
					.join(' ');
				return { label, path };
			})
	);
</script>

<Breadcrumb aria-label="Breadcrumb">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>

	{#each crumbs as { label, path }, idx (path)}
		{#if idx < crumbs.length - 1}
			<BreadcrumbItem href={path}>{label}</BreadcrumbItem>
		{:else}
			<BreadcrumbItem>{label}</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>
