<script lang="ts">
	/**
	 * Array of image objects containing URLs and alt text
	 * Using placeholder images from picsum.photos for demonstration
	 */
	const images: Array<{ src: string; alt: string }> = Array.from({ length: 10 }, (_, i) => ({
		src: `https://picsum.photos/seed/${i + 1}/288/320`,
		alt: `Gallery image ${i + 1}`
	}));

	/** Type definition for gallery image parameters */
	type GalleryImageParams = {
		src: string;
		alt: string;
		rotation: number;
		isButton: boolean;
	};

	let isFlipped = $state(false);
</script>

{#snippet galleryImage({ src, alt, rotation, isButton }: GalleryImageParams)}
	{#if isButton}
		<button
			class="image-button"
			onclick={() => (isFlipped = !isFlipped)}
			style="--rotation: {rotation}deg"
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
		<div class="image-wrapper" style="--rotation: {rotation}deg">
			<img {src} {alt} />
		</div>
	{/if}
{/snippet}

<div class="gallery-container">
	<div class="gallery">
		{#each images as { src, alt }, i}
			{@render galleryImage({
				src,
				alt,
				rotation: ((i + 1) % 2 === 0 ? 1 : -1) * Math.random() * 4,
				isButton: i === 4
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

		animation: scroll-x linear both;
		animation-timeline: scroll();
		animation-range: 0 100vh;

		&:has(> *:hover) > :not(:hover) {
			opacity: 0.5;
			scale: 0.9;
		}
	}

	.image-wrapper {
		flex: 0 0 auto;
		border-radius: 1rem;
		overflow: hidden;
		transform: rotate(var(--rotation));
		box-shadow: 0 4px 6px -1px rgb(0 0 0 0.2);
		transition: all 0.3s ease;
	}

	.image-wrapper:hover {
		transform: rotate(0deg) scale(1.05);
		box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.4);
		animation: none;
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
		box-shadow: 0 4px 6px -1px rgb(0 0 0 0.2);
		transition: all 0.3s ease;
		transform-style: preserve-3d;
		animation: jiggle 2s ease-in-out 2s infinite alternate;
		border-radius: 1rem;

		&:hover {
			transform: rotate(0deg) scale(1.05);
			animation: none;
			box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.4);
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
			transform: translateX(-200vw);
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
