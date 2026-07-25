import { page } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ChannelBand from './ChannelBand.svelte';

const stories = {
	intelligence: 'What a reasoning model actually does',
	cosmos: 'Artemis II flies by the Moon',
	mind: 'The hard problem, thirty years on',
	commons: 'Who owns a protocol'
};

describe('ChannelBand', () => {
	it('renders one cell per desk', async () => {
		const { container } = render(ChannelBand, {
			stories,
			active: 'intelligence',
			onselect: () => {}
		});
		expect(container.querySelectorAll('.band-cell')).toHaveLength(4);
	});

	it('labels each cell with its desk name', async () => {
		render(ChannelBand, { stories, active: 'intelligence', onselect: () => {} });
		for (const desk of ['Intelligence', 'Cosmos', 'Mind', 'Commons']) {
			await expect.element(page.getByText(desk, { exact: true })).toBeInTheDocument();
		}
	});

	it('carries the current headline for each desk', async () => {
		render(ChannelBand, { stories, active: 'intelligence', onselect: () => {} });
		await expect.element(page.getByText('Artemis II flies by the Moon')).toBeInTheDocument();
	});

	it('marks exactly the active desk as pressed', async () => {
		const { container } = render(ChannelBand, {
			stories,
			active: 'cosmos',
			onselect: () => {}
		});
		const pressed = [...container.querySelectorAll('[aria-pressed="true"]')];
		expect(pressed).toHaveLength(1);
		expect(pressed[0].textContent).toContain('Cosmos');
	});

	it('reports the chosen desk when a cell is activated', async () => {
		const onselect = vi.fn();
		render(ChannelBand, { stories, active: 'intelligence', onselect });
		await page.getByRole('button', { name: /Mind/ }).click();
		expect(onselect).toHaveBeenCalledWith('mind');
	});

	it('describes itself for assistive technology', async () => {
		render(ChannelBand, { stories, active: 'intelligence', onselect: () => {} });
		await expect
			.element(page.getByRole('group', { name: 'Mindplex editorial desks' }))
			.toBeInTheDocument();
	});
});
