<script lang="ts">
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import RecentArticles from '$lib/components/RecentArticles.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
</script>

<section class="space-y-4">
	<h1>Things About Me (Taylor Sabbag)</h1>
	<p>
		I'm currently the full-stack lead software engineer at Evexia Inc. building a real revolution in
		mental health.
	</p>
	<p>
		I code mostly for the web using technologies like JavaScript, TypeScript, Python, React, React
		Native, HTML, CSS, Node, Express.js, Next.js, Svelte, SvelteKit, SQL, PostgresSQL, and MySQL.
		Yeah, that's a lot, but such is the web these days. However, I love going deep particularly on
		understanding the eccentricities and capabilities of JavaScript and the web APIs. I use Git and
		GitHub to manage my software versioning.
	</p>
	<p>
		I currently live in Hamilton, Ontario, Canada (near Toronto if you're from outside Canada), but
		I'm open to opportunities around the world!
	</p>
	<div class="flex gap-4">
		<a href="https://www.linkedin.com/in/taylor-sabbag/">LinkedIn</a>
		<a href="https://github.com/taylor-sabbag">GitHub</a>
	</div>
</section>

<section>
	<Gallery />
</section>

<section>
	<h2>Places I've Worked</h2>
	<Experience />
</section>

<section>
	<h2>Things I've Built</h2>
	<Projects />
</section>

<section>
	<h2>Things I've Written</h2>
	<RecentArticles numberOfArticles={5} />
</section>
