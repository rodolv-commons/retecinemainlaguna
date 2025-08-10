<script lang="ts">
	// import the generated type so TS knows about your film prop
	import type { PageData } from './$types';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { t, locale as localeStore } from '$lib/i18n';
	import { Badge } from 'flowbite-svelte';
	import { getCountryName } from '$lib/utils/utils';

	// `data` is exactly the object you returned from load()
	export let data: PageData;

	// pull your film out of it
	const { film, director } = data;

	// Reactive locale store
	$: locale = $localeStore;

	//const heroImgPath = `/images/films/${film?.id}_full.jpg`;
	const hero2ImgPath = `/images/films/${film?.id}_card.jpg`;
	const directotImgPath = `/images/directors/${film?.director_id}_card.jpg`;

	// const widths = [480, 768, 1024, 1440, 1920]; // whatever you have generated
	// const sizes = '(max-width: 768px) 96vw, (max-width: 1200px) 60vw, 60vw';
</script>

{#if film}
	<section class="film__wrapper-upper">
		<div class="breadcrumb">
			<Breadcrumbs />
		</div>
		<div class="film-details__wrapper">
			<div>{$t(`program.${film.section}`)}</div>
			<h1>{film.title}</h1>
			<div>{film.synopsis_it}</div>

			<div class="film-details__tags">
				{#if locale === 'it'}
					{#each film.tags_it as tag (tag)}
						<Badge border large color="gray">{tag.name}</Badge>
					{/each}
				{:else}
					{#each film.tags_en as tag (tag)}
						<Badge border large color="gray">{tag.name}</Badge>
					{/each}
				{/if}
			</div>
		</div>
		<div class="film-image__wrapper">
			<picture>
				<img
					class="film-image__hero"
					alt={film.title}
					src={hero2ImgPath}
					loading="lazy"
					decoding="async"
					width="710"
					height="399"
				/>
			</picture>
		</div>
	</section>
	<section class="film__wrapper-bottom">
		<div class="film-bottom__details">
			<div class="film-director__wrapper">
				<div class="film-director__title">Meet the Artist</div>
				<div class="film-director__section">
					<img
						class="film-director__image"
						alt="Directors"
						src={directotImgPath}
						loading="lazy"
						decoding="async"
						width="223"
						height="297"
					/>
					<div class="film-director__bio-details">
						<div class="film-director__name">{director.name}</div>
						<div class="film-director__biography">{director.biography}</div>
						<div class="film-director__filmography">{director.filmography}</div>
					</div>
				</div>
			</div>
			<div class="film-credits__wrapper">
				<div class="film-credits__title">Credits</div>
				<ul class="film-credits__list">
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.director`)}</span>
						<div class="credit-item__name-wrapper">
							<p class="credit-item__name">{director.name}</p>
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.screenwriter`)}</span>
						<div class="credit-item__name-wrapper">
							{#each film.screenplay as sp (sp)}
								<p class="credit-item__name">{sp}</p>
							{/each}
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.producer`)}</span>
						<div class="credit-item__name-wrapper">
							{#each film.producers as p (p)}
								<p class="credit-item__name">{p}</p>
							{/each}
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.photography`)}</span>
						<div class="credit-item__name-wrapper">
							{#each film.photography as f (f)}
								<p class="credit-item__name">{f}</p>
							{/each}
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.editing`)}</span>
						<div class="credit-item__name-wrapper">
							{#each film.editing as e (e)}
								<p class="credit-item__name">{e}</p>
							{/each}
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.sound`)}</span>
						<div class="credit-item__name-wrapper">
							{#each film.sound as s (s)}
								<p class="credit-item__name">{s}</p>
							{/each}
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.cast`)}</span>
						<div class="credit-item__name-wrapper">
							{#each film.cast as c (c)}
								<p class="credit-item__name">{c}</p>
							{/each}
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.year`)}</span>
						<div class="credit-item__name-wrapper">
							<p class="credit-item__name">{film.year}</p>
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.country`)}</span>
						<div class="credit-item__name-wrapper">
							<p class="credit-item__name">{getCountryName(film.countryOfOrigin, locale)}</p>
						</div>
					</li>
					<li class="credit-item">
						<span class="credit-item__title">{$t(`film.duration`)}</span>
						<div class="credit-item__name-wrapper">
							<p class="credit-item__name">{film.duration}'</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
{:else}
	<p>Film not found.</p>
{/if}
