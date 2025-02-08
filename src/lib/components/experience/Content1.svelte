<script>
	const images = [
		"https://assets.aceternity.com/templates/startup-1.webp",
		"https://assets.aceternity.com/templates/startup-2.webp",
		"https://assets.aceternity.com/templates/startup-3.webp",
		"https://assets.aceternity.com/templates/startup-4.webp"
	];
</script>

<div>
	<p class="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
		Built and launched Aceternity UI and Aceternity UI Pro from scratch
	</p>
	<div class="grid grid-cols-2 gap-4">
		{#each images as src, i}
			<img
				{src}
				alt="startup template"
				width={500}
				height={500}
				class={`h-20 w-full rounded-lg object-cover shadow-[0_0_24px_theme(colors.neutral.950/0.06),_0_1px_1px_theme(colors.black/0.05),_0_0_0_1px_theme(colors.neutral.950/0.04),_0_0_4px_theme(colors.neutral.950/0.08),_0_16px_68px_theme(colors.neutral.950/0.05),_0_1px_0_theme(colors.white/0.1)_inset] md:h-44 lg:h-60 ${i > 0 ? 'h-20' : ''}`}
			/>
		{/each}
	</div>
</div>
