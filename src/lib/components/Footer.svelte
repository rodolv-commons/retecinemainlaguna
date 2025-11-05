<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type Logo } from '../types/typeGuards';
	import LogoFader from '$lib/components/LogoFader.svelte';

	const logos: Logo[] = [
		{ src: 'images/sponsors/ri-prese.png', alt: 'Wikimedia Deutschland' },
		{ src: 'images/sponsors/rete_doc.png', alt: 'dpa' },
		{ src: 'images/sponsors/panorama.png', alt: 'Wikimedia Deutschland' },
		{ src: 'images/sponsors/villeggiatura.png', alt: 'dpa' },
		{ src: 'images/sponsors/circuito_cinema.png', alt: 'Helmholtz' },
		{ src: 'images/sponsors/corte_sconta.png', alt: 'Helmholtz' },
		{ src: 'images/sponsors/radio_cafoscari.png', alt: 'dpa' },
		{ src: 'images/sponsors/palazzo_grassi.png', alt: 'dpa' },
		{ src: 'images/sponsors/cinema_svizzero.png', alt: 'dpa' }
	];
</script>

<footer>
	<div class="footer__wrapper">
		<div class="footer__title">Rete Cinema In Laguna</div>
		<section class="footer-socials__wrapper">
			<ul>
				<li>
					<a href="mailto:retecinemainlaguna@gmail.com"> retecinemainlaguna@gmail.com </a>
				</li>
				<li>
					<a
						href="https://www.instagram.com/rete.cinemalaguna"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="mdi:instagram" width="var(--icon-size-lg)" />
					</a>
				</li>
				<li>
					<a href="https://www.instagram.com/inlff" target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:instagram" width="var(--icon-size-lg)" />
					</a>
				</li>
				<li>
					<a
						href="https://www.facebook.com/retecinemalaguna"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon="mdi:facebook" width="var(--icon-size-lg)" />
					</a>
				</li>
			</ul>
		</section>
		<section class="footer-sponsor__wrapper">
			<LogoFader {logos} delay={1600} duration={400} />
			<div class="sponsor-item__wrapper">
				<img src="images/sponsors/circuito_cinema.png" alt="Circuito Cinema" />
				<img src="images/sponsors/rete_doc.png" alt="Circuito Cinema" />
			</div>
		</section>
		<section class="support__wrapper">
			<div>
				<div class="support-title">Con il sostegno della</div>
				<img
					class="support-image"
					src="images/sponsors/fondazione_venezia.svg"
					alt="Fondazione Venezia"
				/>
			</div>
		</section>

		<section class="legal-infos__wrapper">
			<nav class="legal-infos__nav" aria-label="Informazioni legali">
				<ul class="legal-infos__list">
					<li class="legal-infos__item"><a href="/impressum">Note legali</a></li>
					<li class="legal-infos__item"><a href="/privacy">Privacy</a></li>
					<li class="legal-infos__item"><a href="/cookie-policy">Cookie</a></li>
				</ul>
			</nav>
		</section>
	</div>
</footer>
