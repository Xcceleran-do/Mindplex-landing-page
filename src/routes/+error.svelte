<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | Mindplex</title>
</svelte:head>

<section class="section error-section">
	<div class="section-wide">
		<p class="error-code tnum">{page.status}</p>
		<h1 class="landing-heading">
			{page.status === 404 ? "This page doesn't exist." : 'Something went wrong.'}
		</h1>
		<p class="landing-lead">
			{page.status === 404
				? 'The link may be outdated, or the page may have moved.'
				: (page.error?.message ?? 'Please try again in a moment.')}
		</p>
		<a href="/" class="error-home">
			<ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
			Back to the homepage
		</a>
	</div>
</section>

<style>
	.error-section {
		min-height: 55dvh;
	}

	.error-code {
		font-size: 0.875rem;
		font-weight: 720;
		letter-spacing: 0.18em;
		color: var(--accent);
	}

	.error-code + :global(.landing-heading) {
		margin-top: 1.25rem;
	}

	.error-home {
		display: inline-flex;
		min-height: 3rem;
		align-items: center;
		gap: 0.5rem;
		margin-top: 2.5rem;
		border: 1px solid var(--border-strong);
		border-radius: 999px;
		background: var(--surface);
		padding-inline: 1.35rem;
		font-size: 0.9375rem;
		font-weight: 680;
		transition: border-color 180ms ease;
	}

	.error-home:hover {
		border-color: var(--accent);
	}
</style>
