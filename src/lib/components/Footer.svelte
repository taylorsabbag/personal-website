<script lang="ts">
	const navItems = [
		{ href: '/about', text: 'About' },
		{ href: '/articles', text: 'Articles' },
		{ href: '/projects', text: 'Projects' },
		{ href: '/contact', text: 'Contact' }
	];
</script>

<footer>
	<nav>
		<ul>
			{#each navItems as {href, text}}
				<li>
					<a {href}>{text}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<p>
		&copy; {new Date().getFullYear()} Taylor Sabbag. All rights reserved.
	</p>
</footer>

<style>
	footer {
		border-block-start: 1px solid var(--color-border);
		padding-block: 2rem;
		padding-inline: 4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

    & nav ul {
        display: flex;
        gap: 2rem;
        font-size: var(--text-sm);
    }

    & p {
        font-size: var(--text-sm);
        color: var(--color-muted-foreground);
    }
}
</style>