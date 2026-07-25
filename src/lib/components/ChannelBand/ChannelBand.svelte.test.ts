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

	it('marks exactly the active desk as checked', async () => {
		const { container } = render(ChannelBand, {
			stories,
			active: 'cosmos',
			onselect: () => {}
		});
		const checked = [...container.querySelectorAll('[aria-checked="true"]')];
		expect(checked).toHaveLength(1);
		expect(checked[0].textContent).toContain('Cosmos');
	});

	it('reports the chosen desk when a cell is activated', async () => {
		const onselect = vi.fn();
		render(ChannelBand, { stories, active: 'intelligence', onselect });
		await page.getByRole('radio', { name: /Mind/ }).click();
		expect(onselect).toHaveBeenCalledWith('mind');
	});

	it('describes itself for assistive technology', async () => {
		render(ChannelBand, { stories, active: 'intelligence', onselect: () => {} });
		await expect
			.element(page.getByRole('radiogroup', { name: 'Mindplex editorial desks' }))
			.toBeInTheDocument();
	});

	it('selects a desk on hover, so pointer users need no click', async () => {
		const onselect = vi.fn();
		const { container } = render(ChannelBand, { stories, active: 'intelligence', onselect });

		const cells = container.querySelectorAll<HTMLButtonElement>('.band-cell');
		cells[1].dispatchEvent(new MouseEvent('mouseenter', { bubbles: false }));

		expect(onselect).toHaveBeenCalledWith('cosmos');
	});

	it('selects a desk on focus, so keyboard users need no click', async () => {
		const onselect = vi.fn();
		const { container } = render(ChannelBand, { stories, active: 'intelligence', onselect });

		container.querySelectorAll<HTMLButtonElement>('.band-cell')[3].focus();

		expect(onselect).toHaveBeenCalledWith('commons');
	});

	it('exposes one tab stop and moves between desks with arrow keys', async () => {
		const onselect = vi.fn();
		const { container } = render(ChannelBand, { stories, active: 'intelligence', onselect });

		const cells = [...container.querySelectorAll<HTMLButtonElement>('.band-cell')];
		expect(cells.filter((cell) => cell.tabIndex === 0)).toHaveLength(1);
		expect(cells[0].tabIndex).toBe(0);

		cells[0].focus();
		cells[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

		expect(document.activeElement).toBe(cells[1]);
		expect(onselect).toHaveBeenCalledWith('cosmos');
	});
});
