<script lang="ts">
	import { page } from '$app/state';
	import Avatar from '$lib/components/Avatar.svelte';
	import { isMuted } from '$lib/stores/audio';
	
	const navItems = [
		{ href: '/about', text: 'About' },
		{ href: '/articles', text: 'Articles' },
		{ href: '/projects', text: 'Projects' },
		{ href: '/contact', text: 'Contact' }
	];
</script>

<header class="mb-20">
	<Avatar alt="Avatar" />
	<nav>
		<ul>
			{#each navItems as item}
				{@render NavItem(item.href, item.text)}
			{/each}
		</ul>
	</nav>
	<div class="flex gap-2">
		{@render MuteToggle()}
		{@render ThemeToggle()}
	</div>
</header>

{#snippet NavItem(href: string, text: string)}
	<li>
		<a {href} class:active={page.url.pathname === href}>{text}</a>
	</li>
{/snippet}

{#snippet MuteToggle()}
	<button 
		type="button" 
		class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
		aria-label={$isMuted ? "Unmute sound effects" : "Mute sound effects"}
		onclick={() => isMuted.update(v => !v)}
	>
		{#if $isMuted}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd" />
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clip-rule="evenodd" />
			</svg>
		{/if}
	</button>
{/snippet}

{#snippet ThemeToggle()}
	<button 
		type="button" 
		class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
		aria-label="Toggle theme"
	>
		<svg
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="w-6 h-6"
		>
			<path
				d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
			/>
			<path
				d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
				fill="none"
			/>
		</svg>
		<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 hidden">
			<path
				d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
{/snippet}

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 4rem;
		margin-top: 1.5rem;
	}

	nav ul {
		display: flex;
		text-align: sm;
		flex-direction: row;
		padding-inline: 2rem;
		padding-block: 0.75rem;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		background-color: var(--color-background);
		color: var(--color-foreground);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid var(--color-border);
		border-radius: 9999px;
		max-width: 36rem;
		font-weight: 600;
		font-size: 0.875rem;
	}

	a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
		position: relative;
	}

	a:hover::after {
		content: '';
		position: absolute;
		top: 1.9rem;
		left: -10%;
		width: 120%;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			oklch(from var(--color-primary) 55% 0.4 h),
			transparent
		);
	}

	a.active {
		color: var(--color-primary);
		position: relative;
	}

	a.active::after {
		content: '';
		position: absolute;
		top: 1.9rem;
		left: -10%;
		width: 120%;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			oklch(from var(--color-primary) 55% 0.4 h),
			transparent
		);
	}
</style>
