<script lang="ts">
	// Define checklist items for better maintainability
	const checklistItems = [
		"Card grid component",
		"Startup template Aceternity",
		"Random file upload lol",
		"Himesh Reshammiya Music CD",
		"Salman Bhai Fan Club registrations open"
	];

	// Define image data with alt text for better accessibility
	const images = [
		{
			src: "https://assets.aceternity.com/pro/hero-sections.png",
			alt: "hero template"
		},
		{
			src: "https://assets.aceternity.com/features-section.png",
			alt: "feature template"
		},
		{
			src: "https://assets.aceternity.com/pro/bento-grids.png",
			alt: "bento template"
		},
		{
			src: "https://assets.aceternity.com/pro/bento-grids.png",
			alt: "bento template"
		}
	];
</script>

<div>
	<p class="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
		Deployed 5 new components on Aceternity today
	</p>
	<div class="mb-8">
		{#each checklistItems as item}
			<div class="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
				✅ {item}
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-2 gap-4">
		{#each images as { src, alt }}
			<img
				{src}
				{alt}
				width={500}
				height={500}
				class="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_theme(colors.neutral.950/0.06),_0_1px_1px_theme(colors.black/0.05),_0_0_0_1px_theme(colors.neutral.950/0.04),_0_0_4px_theme(colors.neutral.950/0.08),_0_16px_68px_theme(colors.neutral.950/0.05),_0_1px_0_theme(colors.white/0.1)_inset] md:h-44 lg:h-60"
			/>
		{/each}
	</div>
</div>
