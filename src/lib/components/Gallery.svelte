<script lang="ts">
	import { onMount } from 'svelte';
	/**
	 * Array of image objects containing URLs and alt text
	 * Using placeholder images from picsum.photos for demonstration
	 */
	const images: Array<{ src: string; alt: string }> = Array.from({ length: 11 }, (_, i) => ({
		src: `https://picsum.photos/seed/${i + 1}/288/320`,
		alt: `Gallery image ${i + 1}`
	}));

	/** Type definition for gallery image parameters */
	type GalleryImageParams = {
		src: string;
		alt: string;
		rotation: number;
		i: number;
	};

	let isFlipped = $state(false);

	/** Set up dynamic hover styles for gallery elements */
	function createGalleryStyles() {
		const styleSheet = new CSSStyleSheet();
		const mediaQuery = '@media (hover) and (prefers-reduced-motion: no-preference)';
		const rules = Array.from(
			{ length: images.length },
			(_, index) => `
			${mediaQuery} {
				.gallery:has(> *:nth-child(${index + 1}):hover) {
					--target: ${index + 1};
				}
			}
		`
		).join('\n');

		styleSheet.replaceSync(rules);
		return styleSheet;
	}

	let gallery: HTMLDivElement;

	onMount(() => {
		if (!gallery) return;

		const styleSheet = createGalleryStyles();
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];

		// Cleanup when component unmounts
		return () => {
			document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
				(sheet) => sheet !== styleSheet
			);
		};
	});
</script>

{#snippet galleryImage({ src, alt, rotation, i }: GalleryImageParams)}
	{#if i === 4}
		<button
			class="image-button"
			onclick={() => (isFlipped = !isFlipped)}
			style="--rotation: {rotation}deg; --sibling-index: {i + 1}"
			class:isFlipped
		>
			<div class="front">
				<img {src} {alt} />
			</div>
			<div class="back">
				<div class="content">
					<h3>LingoMixup</h3>
					<p>This is the back of the card!</p>
				</div>
			</div>
		</button>
	{:else}
		<div class="image-wrapper" style="--rotation: {rotation}deg; --sibling-index: {i + 1}">
			<img {src} {alt} />
		</div>
	{/if}
{/snippet}

<div class="gallery-container" style="--sibling-count: {images.length}">
	<div class="gallery" bind:this={gallery}>
		{#each images as { src, alt }, i}
			{@render galleryImage({
				src,
				alt,
				rotation: ((i + 1) % 2 === 0 ? 1 : -1) * Math.random() * 4,
				i
			})}
		{/each}
	</div>
</div>

<style>
	.gallery-container {
		width: 100vw;
		position: relative;
		left: -70%;
	}
	.gallery {
		display: flex;
		gap: 2rem;
		padding: 2rem;
		position: relative;
		--size-multiplier: 0.1;

		animation: scroll-x linear both;
		animation-timeline: scroll();
		animation-range: 0 100vh;

		&:has(> *:hover) {
			& > * {
				transition:
					scale 2s var(--ease-spring-5),
					opacity 0.3s var(--ease-3);
			}

			&:hover > *:not(:hover) {
				--distance-from-target: calc(
					max((var(--sibling-index) - var(--target)), (var(--target) - var(--sibling-index)))
				);
				--distance-multiplier: calc(var(--distance-from-target) * 15%);
				--gradual-fadeout: calc(100% - var(--distance-multiplier));
				opacity: var(--gradual-fadeout);

				--scale-factor: calc(1 - (var(--distance-from-target) * var(--size-multiplier)));
				scale: var(--scale-factor);
			}
		}
	}

	.image-wrapper {
		flex: 0 0 auto;
		border-radius: 1rem;
		overflow: hidden;
		transform: rotate(var(--rotation));
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
		transition: all 0.3s ease;
	}

	.image-wrapper:hover {
		transform: rotate(0deg) scale(1.05);
		box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.4);
		animation: none;
		transition:
			box-shadow 2s var(--ease-spring-5),
			transform 2s var(--ease-spring-5);
	}

	img {
		width: 288px;
		height: 320px;
		object-fit: cover;
		border-radius: 1rem;
		display: block;
	}

	.image-button {
		padding: 0;
		margin: 0;
		display: block;
		line-height: 0;
		background: none;
		border: none;
		cursor: pointer;
		width: 288px;
		height: 320px;
		flex: 0 0 auto;
		transform: rotate(var(--rotation));
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
		transition: transform 1s ease;
		transform-style: preserve-3d;
		animation: jiggle 2s ease-in-out 2s infinite alternate;
		border-radius: 1rem;

		&:hover {
			transform: rotate(0deg) scale(1.05);
			box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.4);
			animation: none;
			transition:
				box-shadow 2s var(--ease-spring-5),
				transform 2s var(--ease-spring-5);
		}

		&.isFlipped {
			transform: rotateY(180deg) scale(2) translate(-50%, -50%);
			z-index: 10;
			position: absolute;
			left: 50%;
			top: 50%;
		}
	}

	.front,
	.back {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 1rem;
		overflow: hidden;
	}

	.front img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.back {
		background-color: #2a2a2a;
		color: white;
		transform: rotateY(180deg);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border: 4px solid white;
		outline: 2px solid black;
	}

	.content {
		text-align: center;
	}

	@keyframes scroll-x {
		to {
			transform: translateX(-350vw);
		}
	}

	@keyframes jiggle {
		0%,
		100% {
			transform: rotate(calc(var(--rotation) + 0deg));
		}
		5% {
			transform: rotate(calc(var(--rotation) + 1deg));
		}
		10% {
			transform: rotate(calc(var(--rotation) + 0deg));
		}
		15% {
			transform: rotate(calc(var(--rotation) + 1deg));
		}
		20%,
		100% {
			transform: rotate(calc(var(--rotation) + 0deg));
		}
	}
</style>
