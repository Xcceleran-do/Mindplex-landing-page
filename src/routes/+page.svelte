<script lang="ts">
	const platformUrl = 'https://beta.mindplex.ai';

	const topics = [
		{ name: 'Artificial intelligence', href: `${platformUrl}/topics/ai` },
		{ name: 'Robotics', href: `${platformUrl}/topics/robotics` },
		{ name: 'Space', href: `${platformUrl}/topics/space` },
		{ name: 'Consciousness', href: `${platformUrl}/topics/consciousness` },
		{ name: 'Cyberculture', href: `${platformUrl}/topics/cyberpunk` },
		{ name: 'Decentralization', href: `${platformUrl}/topics/blockchain` }
	];

	const entryModes = [
		{
			name: 'Read deeply',
			description:
				'Long-form reporting, interviews, podcasts, and argument from people working at the edge of change.',
			linkLabel: 'Explore the magazine',
			href: `${platformUrl}/magazine`
		},
		{
			name: 'Track change',
			description:
				'Focused news desks and topic pages turn a constant stream of developments into something you can follow.',
			linkLabel: 'Enter the newsroom',
			href: `${platformUrl}/news`
		},
		{
			name: 'Join the exchange',
			description:
				'Publish ideas, challenge arguments, and build a body of work inside a community that values contribution.',
			linkLabel: 'Visit the community',
			href: `${platformUrl}/community`
		}
	];

	const workflow = [
		{ name: 'Find', detail: 'Bring relevant sources and emerging questions into view.' },
		{ name: 'Filter', detail: 'Separate repeated noise from material worth investigating.' },
		{ name: 'Shape', detail: 'Support research and production without hiding authorship.' },
		{ name: 'Publish', detail: 'Keep editorial judgment and attribution visible at the end.' }
	];

	const destinations = [
		{
			name: 'Magazine',
			description: 'Essays, interviews, reviews, and original reporting.',
			href: `${platformUrl}/magazine`
		},
		{
			name: 'Podcast',
			description: 'Long conversations with people building and questioning the future.',
			href: `${platformUrl}/podcast`
		},
		{
			name: 'News',
			description: 'Fast-moving developments with a clear editorial frame.',
			href: `${platformUrl}/news`
		},
		{
			name: 'Topics',
			description: 'Follow the subjects that matter to you across every format.',
			href: `${platformUrl}/topics`
		},
		{
			name: 'Community',
			description: 'Discussion, contribution, and the people behind the ideas.',
			href: `${platformUrl}/community`
		},
		{
			name: 'Mindbytes',
			description: 'Compact ideas for a shorter reading window.',
			href: `${platformUrl}/mindbytes`
		}
	];
</script>

<svelte:head>
	<title>Mindplex | Make sense of what comes next</title>
	<meta
		name="description"
		content="Mindplex brings independent media, community intelligence, and emerging AI tools together for people tracking the future."
	/>
	<link rel="canonical" href="https://mindplex.ai/" />
	<meta property="og:title" content="Mindplex | Make sense of what comes next" />
	<meta
		property="og:description"
		content="Independent media, community intelligence, and emerging AI tools for people tracking the future."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mindplex.ai/" />
</svelte:head>

<main id="main-content">
	<section class="hero page-shell" aria-labelledby="hero-title">
		<div class="hero-copy">
			<p class="eyebrow">AI, media, and community intelligence</p>
			<h1 id="hero-title">Make sense of what comes next.</h1>
			<p class="hero-deck">
				Independent media, community intelligence, and emerging AI tools for people tracking the
				future.
			</p>
			<div class="hero-actions">
				<a class="button button-primary" href={platformUrl}>
					Enter Mindplex
					<span aria-hidden="true">↗</span>
				</a>
				<a class="button button-secondary" href="#inside">See what is inside</a>
			</div>
		</div>

		<a
			class="hero-story"
			href="{platformUrl}/post/artemis-ii-flies-by-the-moon"
			aria-label="Read Artemis II flies by the Moon"
		>
			<img
				src="/images/artemis-moon-window.webp"
				alt="The Moon seen through the open hatch of the Artemis II spacecraft"
				width="1800"
				height="1271"
				fetchpriority="high"
			/>
			<div class="story-caption">
				<span>Space</span>
				<strong>Artemis II flies by the Moon</strong>
				<span aria-hidden="true">↗</span>
			</div>
		</a>
	</section>

	<div class="topic-rail" aria-label="Topics covered by Mindplex">
		<div class="topic-track">
			<div class="topic-set">
				{#each topics as topic}
					<a href={topic.href}>{topic.name}</a>
				{/each}
			</div>
			<div class="topic-set" aria-hidden="true">
				{#each topics as topic}
					<a href={topic.href} tabindex="-1">{topic.name}</a>
				{/each}
			</div>
		</div>
	</div>

	<section class="manifesto page-shell section-reveal" id="why" aria-labelledby="manifesto-title">
		<h2 id="manifesto-title">More than a magazine. Less noise than a feed.</h2>
		<p>
			Mindplex connects edited work, fast-moving news, and public conversation in one place, so
			important ideas arrive with context.
		</p>
	</section>

	<section
		class="entry-section page-shell section-reveal"
		id="inside"
		aria-labelledby="entry-title"
	>
		<div class="section-heading">
			<h2 id="entry-title">One platform. Three ways in.</h2>
			<p>
				Start with a story, a subject, or an argument. Move between them without losing context.
			</p>
		</div>

		<ol class="entry-list">
			{#each entryModes as mode, index}
				<li>
					<span class="entry-index">{String(index + 1).padStart(2, '0')}</span>
					<h3>{mode.name}</h3>
					<p>{mode.description}</p>
					<a href={mode.href}>
						{mode.linkLabel}
						<span aria-hidden="true">↗</span>
					</a>
				</li>
			{/each}
		</ol>
	</section>

	<section class="stories page-shell section-reveal" aria-labelledby="stories-title">
		<div class="stories-intro">
			<h2 id="stories-title">A living publication, not a content machine.</h2>
			<p>
				Mindplex makes room for reporting, criticism, conversation, and ideas that do not fit a
				single format.
			</p>
			<a class="inline-link" href="{platformUrl}/magazine">
				Browse the latest stories
				<span aria-hidden="true">↗</span>
			</a>
		</div>

		<a
			class="story-feature story-feature-poster"
			href="{platformUrl}/post/who-the-f-is-mark-fisher-and-why-you-should-care-they-made-a-film-about-making-a-film-about-mark-fisher"
		>
			<img
				src="/images/mark-fisher-film.webp"
				alt="Poster for a film about cultural theorist Mark Fisher"
				width="750"
				height="948"
				loading="lazy"
			/>
			<div>
				<span>Cyberculture</span>
				<h3>Who the f*** is Mark Fisher?</h3>
			</div>
		</a>

		<a
			class="story-feature story-feature-wide"
			href="{platformUrl}/post/up-and-down-and-all-around-with-vr-ai-and-the-comings-and-goings-of-slop"
		>
			<img
				src="/images/tony-parisi-interview.webp"
				alt="Tony Parisi and RU Sirius in conversation"
				width="2000"
				height="900"
				loading="lazy"
			/>
			<div>
				<span>Conversation</span>
				<h3>VR, AI, and the comings and goings of slop</h3>
			</div>
		</a>
	</section>

	<section class="trust page-shell section-reveal" id="trust" aria-labelledby="trust-title">
		<div class="trust-statement">
			<p>Context over virality.</p>
		</div>
		<div class="trust-copy">
			<h2 id="trust-title">Trust should follow the work.</h2>
			<p>
				Mindplex pairs visible authorship, editorial judgment, and reputation shaped by
				contribution. Useful signal matters more than empty reach.
			</p>
			<ul>
				<li>
					<strong>Visible authorship</strong>
					<span>Know who made the claim and where it came from.</span>
				</li>
				<li>
					<strong>Editorial judgment</strong>
					<span>Keep human responsibility clear, even when AI supports the process.</span>
				</li>
				<li>
					<strong>Earned reputation</strong>
					<span>Let a history of useful participation carry more weight than follower count.</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="workflow page-shell section-reveal" aria-labelledby="workflow-title">
		<div class="section-heading workflow-heading">
			<h2 id="workflow-title">AI belongs in the newsroom, not above it.</h2>
			<p>
				Emerging tools can accelerate research and production. Authors, editors, and communities
				still decide what deserves attention.
			</p>
		</div>

		<ol class="workflow-list">
			{#each workflow as step, index}
				<li>
					<span>{String(index + 1).padStart(2, '0')}</span>
					<h3>{step.name}</h3>
					<p>{step.detail}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section
		class="community page-shell section-reveal"
		id="community"
		aria-labelledby="community-title"
	>
		<div>
			<h2 id="community-title">The future needs participants, not spectators.</h2>
		</div>
		<div class="community-copy">
			<p>
				Bring an argument, a field of expertise, or a question worth pursuing. Mindplex gives
				writers, researchers, artists, and builders a place to publish and be challenged.
			</p>
			<div>
				<a class="button button-primary" href="{platformUrl}/contribute">Contribute to Mindplex</a>
				<a class="inline-link" href="{platformUrl}/community">
					Meet the community
					<span aria-hidden="true">↗</span>
				</a>
			</div>
		</div>
	</section>

	<section class="destinations page-shell section-reveal" aria-labelledby="destinations-title">
		<div class="section-heading">
			<h2 id="destinations-title">Choose your entry point.</h2>
			<p>Every format leads back to the same exchange of ideas.</p>
		</div>

		<div class="destination-grid">
			{#each destinations as destination}
				<a href={destination.href}>
					<div>
						<h3>{destination.name}</h3>
						<p>{destination.description}</p>
					</div>
					<span aria-hidden="true">↗</span>
				</a>
			{/each}
		</div>
	</section>

	<section class="final-cta page-shell section-reveal" aria-labelledby="final-title">
		<div>
			<h2 id="final-title">What comes next is still being written.</h2>
			<p>Read it. Question it. Help shape it.</p>
		</div>
		<a class="button button-primary" href={platformUrl}>
			Enter Mindplex
			<span aria-hidden="true">↗</span>
		</a>
	</section>
</main>
