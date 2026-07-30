import type { Component } from 'svelte';
import History from '@lucide/svelte/icons/history';
import ListTree from '@lucide/svelte/icons/list-tree';
import BrainCircuit from '@lucide/svelte/icons/brain-circuit';
import Eye from '@lucide/svelte/icons/eye';
import Fingerprint from '@lucide/svelte/icons/fingerprint';
import UserCheck from '@lucide/svelte/icons/user-check';

/**
 * Content for the OmegaPlex / OmegaClaw positioning.
 *
 * Every string here is drawn from the product brief. Nothing describes a
 * capability, metric, date, or partner that the brief does not state. Where the
 * brief hedges ("possible future beats"), the copy hedges too.
 */

/** The beat OmegaPlex covers at first release, and what is planned after it. */
export const beat = {
	current: 'AGI and Frontier AI',
	// Named as planned expansion in the memory-layer architecture doc, which is
	// firmer than the earlier brief's "possible". Wording follows that doc.
	planned: ['Decentralized AI and Crypto-AI', 'Biotech and Longevity', 'Geopolitics of Compute']
};

/**
 * How a drafted claim is dispositioned by the self-critique pass. Blocked
 * claims are cut before an editor ever sees the draft.
 */
export const dispositions = [
	{
		name: 'Backed',
		body: 'The claim traces to an acceptable-tier source and agrees with what memory already holds.'
	},
	{
		name: 'Flagged',
		body: 'Something is off. The editor sees which rule fired, why, and the suggested fix.'
	},
	{
		name: 'Blocked',
		body: 'No acceptable backing. The claim is cut from the draft before review.'
	}
];

export type Phase = {
	name: string;
	summary: string;
	steps: string[];
};

/**
 * The ten-step pipeline from the brief, grouped into three phases. Grouping is
 * presentational; the steps and their order are unchanged.
 */
export const phases: Phase[] = [
	{
		name: 'Research',
		summary: 'Read everything, then narrow to what deserves a close look.',
		steps: [
			'Collect news and source candidates',
			'Filter, cluster, rank, enrich',
			'Pull prior storylines and open questions',
			'Deep-read the selected sources'
		]
	},
	{
		name: 'Draft and verify',
		summary: 'Writing is not the last step. Checking is.',
		steps: ['Draft the piece, with sources', 'Check every claim against sources and memory']
	},
	{
		name: 'Review and learn',
		summary: 'An editor decides. The discussion feeds tomorrow.',
		steps: [
			'Hand the unpublished draft to an editor',
			'Publish only on human approval',
			'Reply when readers bring it in',
			"Turn good discussion into tomorrow's leads"
		]
	}
];

/**
 * What the symbolic memory holds, and what it deliberately does not. The
 * contrast is the point: only distilled, provenance-backed knowledge enters the
 * graph.
 */
export const memory = {
	stored: [
		'Entities',
		'Storylines',
		'Previous coverage',
		'Unresolved questions',
		'Editorial decisions',
		'Disputes',
		'Reader-demand signals',
		'Source and methodology rules'
	],
	notStored: ['Raw articles', 'Drafts', 'Full conversations', 'Comment threads']
};

export type Differentiator = {
	icon: Component;
	title: string;
	description: string;
};

/** How OmegaPlex differs from products that summarize isolated inputs. */
export const differentiators: Differentiator[] = [
	{
		icon: History,
		title: 'It remembers yesterday',
		description: 'Coverage builds on what was already reported instead of restarting each morning.'
	},
	{
		icon: ListTree,
		title: 'Sources sit on a ladder',
		description:
			'Every source has a tier. A social post can flag that something happened; it can never be the evidence that it did.'
	},
	{
		icon: BrainCircuit,
		title: 'Symbolic memory',
		description:
			'Entities and storylines persist in a knowledge graph built on MeTTa and Atomspace.'
	},
	{
		icon: Eye,
		title: 'The method is readable',
		description:
			'How claims get assessed and hedged is configuration you can read, not a hidden prompt.'
	},
	{
		icon: Fingerprint,
		title: 'Every claim gets a verdict',
		description:
			'Each one is marked backed, flagged, or blocked, with the rule that decided it and the source behind it.'
	},
	{
		icon: UserCheck,
		title: 'A person signs off',
		description: 'Drafts reach an editor unpublished. Nothing goes out without human approval.'
	}
];
