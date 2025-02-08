<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	const { timelineData } = $props();
	let containerRef: HTMLDivElement;
	let height = $state(0);
	let scrollProgress = $state(0);
	let heightTransform = $state(0);
	let opacityTransform = $state(0);

	// Helper function to animate values
	const animate = (target: number, current: number): number => {
		const duration = 400;
		const delta = target - current;
		return current + delta * cubicOut(1 / duration);
	};

	onMount(() => {
		if (containerRef) {
			const rect = containerRef.getBoundingClientRect();
			height = rect.height;
		}

		const onScroll = () => {
			const rect = containerRef.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			let progress = Math.min(
				1,
				Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height))
			);
			progress = progress < 0.6 ? progress - 0.09 : progress - 0.004;
			scrollProgress = progress;
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	$effect(() => {
		heightTransform = animate(scrollProgress * height, heightTransform);
		opacityTransform = animate(scrollProgress < 0.1 ? scrollProgress * 10 : 1, opacityTransform);
	});
</script>

<div class="w-full bg-white font-sans md:px-10 dark:bg-neutral-950" bind:this={containerRef}>
	<div class="relative mx-auto max-w-7xl overflow-hidden pb-20">
		{#each timelineData as item}
			<div class="flex justify-start pt-10 md:gap-10 md:pt-40">
				<div
					class="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm"
				>
					<div
						class="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white md:left-3 dark:bg-black"
					>
						<div
							class="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800"
						></div>
					</div>
					<h3
						class="hidden text-xl font-bold text-neutral-500/100 md:block md:pl-20 md:text-5xl dark:text-neutral-500/100"
					>
						{item.title}
					</h3>
				</div>

				<div class="relative w-full pr-4 pl-20 md:pl-4">
					<h3
						class="mb-4 block text-left text-2xl font-bold text-neutral-500/100 md:hidden dark:text-neutral-500/100"
					>
						{item.title}
					</h3>
					{#if typeof item.content === 'string'}
						{item.content}
					{:else}
						{@render item.content()}
					{/if}
				</div>
			</div>
		{/each}

		<div
			style="height: {height}px;"
			class="timeline-line absolute top-0 left-8 w-[2px] overflow-hidden bg-gradient-to-b from-transparent from-0% via-neutral-200/100 to-transparent to-[99%] md:left-8 dark:via-neutral-700/100"
		>
			<div
				style="height: {heightTransform}px; opacity: {opacityTransform};"
				class="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500/100 from-0% via-blue-500/100 via-10% to-transparent"
			></div>
		</div>
	</div>
</div>

<style>
	.timeline-line {
		mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
	}
</style>
