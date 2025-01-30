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
