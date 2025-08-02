<script lang="ts">
	import { t } from '$lib/i18n';
	import headerRaw from '$lib/i18n/en/header.json';

	// 1) Derive the literal type of your header JSON
	type HeaderType = typeof headerRaw;

	// 2) SectionKey is now the union of "about"|"activities"|…|"newsletter"
	type SectionKey = keyof HeaderType;

	// 3) Define Section for clarity
	type Section = {
		label: string;
		entries: Record<string, string>;
	};

	// 4) Tell TS that header is exactly HeaderType
	const header = headerRaw as HeaderType;

	// 5) Now Object.entries(header) yields tuples of [SectionKey, Section]
	const sections = Object.entries(header) as [SectionKey, Section][];

	const menuTitles = sections.map(([key]) => key);

	// 6) A safe helper that only takes valid SectionKey
	function entriesFor(key: SectionKey): string[] {
		return Object.keys(header[key].entries);
	}
</script>

<nav class="navbar">
	<ul class="nav-list">
		{#each menuTitles as menuTitle (menuTitle)}
			<li class="nav-item dropdown">
				<!-- trigger -->
				<span class="dropdown-trigger">
					{$t(`header.${menuTitle}.label`)}
				</span>

				<!-- dropdown panel -->
				<ul class="dropdown-menu">
					{#each entriesFor(menuTitle) as menuItem (menuItem)}
						<li class="dropdown-item">
							<a href={'/' + menuItem}>{$t(`header.${menuTitle}.entries.${menuItem}`)}</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</nav>

<style>
	/* Horizontal list of top-level items */
	.nav-list {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.nav-item {
		position: relative;
		padding: 0.75rem 1.25rem;
		cursor: pointer;
	}

	/* Hide the dropdown by default */
	.dropdown-menu {
		display: none;
		position: absolute;
		top: 100%; /* just below the parent */
		left: 0;
		border: 1px solid #ddd;
		margin: 0;
		padding: 0.5rem 0;
		list-style: none;
		min-width: 180px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		z-index: 10;
	}

	/* Show on hover of the parent <li> */
	.dropdown:hover .dropdown-menu {
		display: block;
	}

	.dropdown-item a {
		display: block;
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: #333;
		white-space: nowrap;
	}

	.dropdown-item a:hover {
		background-color: #f0f0f0;
	}
</style>
