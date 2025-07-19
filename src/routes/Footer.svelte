<script lang="ts">
	// import { page } from '$app/state';
	import '../styles/footer.css';
	import Icon from '@iconify/svelte';
</script>

<footer>
	<div class="footer__wrapper">
		<div class="footer__infos">Rete Cinema In Laguna</div>
		<nav class="footer__nav">
			<ol>
				<li>
					<a href="mailto:retecinemainlaguna@gmail.com">
						retecinemainlaguna@gmail.com
					</a>
				</li>
				<li>
					<a href="https://www.instagram.com/rete.cinemalaguna" target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:instagram" width="var(--icon-size-lg)" />
					</a>
				</li>
        <li>
					<a href="https://www.instagram.com/inlff" target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:instagram" width="var(--icon-size-lg)" />
					</a>
				</li>
				<li>
					<a href="https://www.facebook.com/retecinemalaguna" target="_blank" rel="noopener noreferrer">
						<Icon icon="mdi:facebook" width="var(--icon-size-lg)" />
					</a>
				</li>
			</ol>
		</nav>
	</div>
</footer>

