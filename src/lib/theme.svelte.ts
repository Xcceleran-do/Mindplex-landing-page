import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readInitial(): Theme {
	// During SSR there is no correct answer, and guessing would cause a
	// hydration mismatch. The inline script in app.html has already set the
	// real value on <html> before paint, so on the client we read that back
	// rather than recomputing it.
	if (!browser) return 'light';
	const attr = document.documentElement.getAttribute('data-theme');
	return attr === 'dark' ? 'dark' : 'light';
}

class ThemeState {
	current = $state<Theme>(readInitial());
	/** True while the user has not overridden the system preference. */
	followsSystem = $state(true);

	constructor() {
		if (!browser) return;
		try {
			this.followsSystem = localStorage.getItem(STORAGE_KEY) === null;
		} catch {
			this.followsSystem = true;
		}
	}

	set(theme: Theme) {
		this.current = theme;
		this.followsSystem = false;
		if (!browser) return;

		document.documentElement.setAttribute('data-theme', theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			// Storage can be unavailable (private mode, blocked cookies). The theme
			// still applies for this session; it just will not be remembered.
		}
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', theme === 'dark' ? '#15181f' : '#f8f8fa');
	}

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}

	/**
	 * Keeps the page in step with the OS while the user has not chosen for
	 * themselves. Returns a cleanup function.
	 */
	watchSystem() {
		if (!browser) return () => {};
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (e: MediaQueryListEvent) => {
			if (!this.followsSystem) return;
			const next: Theme = e.matches ? 'dark' : 'light';
			this.current = next;
			document.documentElement.setAttribute('data-theme', next);
		};
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}
}

export const theme = new ThemeState();
