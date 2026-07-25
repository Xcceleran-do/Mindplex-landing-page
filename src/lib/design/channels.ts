const platformUrl = 'https://beta.mindplex.ai';

export type ChannelId = 'intelligence' | 'cosmos' | 'mind' | 'commons';

export interface Channel {
	id: ChannelId;
	/** Desk name shown in Michroma. Editorial sign-off pending; rename here only. */
	label: string;
	hex: string;
	cssVar: string;
	/** A real topic route in the beta product. Desks never introduce new URLs. */
	topicHref: string;
}

export const channels: readonly Channel[] = [
	{
		id: 'intelligence',
		label: 'Intelligence',
		hex: '#22D07F',
		cssVar: '--ch-intelligence',
		topicHref: `${platformUrl}/topics/ai`
	},
	{
		id: 'cosmos',
		label: 'Cosmos',
		hex: '#87B9FC',
		cssVar: '--ch-cosmos',
		topicHref: `${platformUrl}/topics/space`
	},
	{
		id: 'mind',
		label: 'Mind',
		hex: '#F598D9',
		cssVar: '--ch-mind',
		topicHref: `${platformUrl}/topics/consciousness`
	},
	{
		id: 'commons',
		label: 'Commons',
		hex: '#EAAB3F',
		cssVar: '--ch-commons',
		topicHref: `${platformUrl}/topics/blockchain`
	}
] as const;

export function channelById(id: ChannelId): Channel {
	const found = channels.find((c) => c.id === id);
	if (!found) throw new Error(`Unknown channel "${id}"`);
	return found;
}
