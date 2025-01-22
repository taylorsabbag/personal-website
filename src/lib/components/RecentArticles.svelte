<script lang="ts">
	let { numberOfArticles = 5 } = $props();
</script>

<ul>
	{#each Array(numberOfArticles) as _}
		{@render article('Hello', '2025-01-23', 'https://www.google.com')}
	{/each}
</ul>

{#snippet article(title: string, date: string, url: string)}
	<li>
        <small>{date}</small>
		<a href={url}>{title}</a>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
	</li>
{/snippet}
