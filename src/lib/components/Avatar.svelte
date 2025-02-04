<script lang="ts">
	import { page } from '$app/state';
	import { libSounds } from '$lib/sounds';
	import { isMuted } from '$lib/stores/audio';
	import { Howl } from 'howler';
	import { onMount } from 'svelte';

	let isHome = $derived(page.url.pathname === '/');
	let howlerBank: Howl[] = [];
	let currHowlPlaying: Howl | null = null;
	let currentIndex = 0;
	let canAutoplay = false;
	let userHasInteracted = false;

	// Handle mute/unmute
	$effect(() => {
		if ($isMuted) {
			// Stop all sounds when muted
			for (const howl of howlerBank) {
				howl.stop();
			}
			if (currHowlPlaying?.playing()) {
				currHowlPlaying.stop();
			}
		} else if (currHowlPlaying && currentIndex < howlerBank.length) {
			// Resume from where we left off when unmuted
			howlerBank[currentIndex].play();
			currHowlPlaying = howlerBank[currentIndex];
		}
	});

	// Check autoplay capability and set up interaction listener
	onMount(() => {
		// Test if we can autoplay
		const audio = new Audio();
		audio.play().then(() => {
			canAutoplay = true;
		}).catch(() => {
			// If we can't autoplay, wait for user interaction
			const enableAudio = () => {
				userHasInteracted = true;
				document.removeEventListener('click', enableAudio);
				document.removeEventListener('keydown', enableAudio);
				document.removeEventListener('touchstart', enableAudio);
			};

			document.addEventListener('click', enableAudio);
			document.addEventListener('keydown', enableAudio);
			document.addEventListener('touchstart', enableAudio);
		});
	});

	/**
	 * Props for the Avatar component
	 * @property {string} alt - Alternative text for the avatar image
	 * @property {string} [size="40px"] - Size of the avatar (width and height)
	 * @property {string} [className=""] - Additional CSS classes to apply
	 */
	let {
		alt,
		size = '50px',
		className = ''
	} = $props<{
		alt: string;
		size?: string;
		className?: string;
	}>();

	const defaultAvatarUrl =
		'https://api.dicebear.com/9.x/lorelei/svg?seed=Alexander&beardProbability=100&scale=120&backgroundColor=663399&backgroundType=gradientLinear';

	/**
	 * Represents a message to be displayed in a text bubble
	 */
	type Message = {
		text: string;
		delay: number;
		duration: number;
		stayVisible?: boolean;
	};

	/**
	 * Calculates the duration for a message based on its text length
	 * @param text - The message text
	 * @returns Duration in seconds
	 */
	function calculateDuration(text: string): number {
		const baseMs = 600; // Minimum duration in milliseconds
		const msPerChar = 50; // Milliseconds per character
		const duration = Math.max(baseMs, text.length * msPerChar) / 1000; // Convert to seconds
		return duration;
	}

	const allowedChars = Object.keys(libSounds);

	/**
	 * Plays Animal Crossing style sounds for the given text
	 * @param text - The text to play sounds for
	 * @param duration - How long the sound sequence should last
	 */
	function playTextSound(text: string, duration: number): void {
		if ($isMuted) return;
		if (!canAutoplay && !userHasInteracted) return;

		const textToPlay = text.toLowerCase();
		const filteredText: string[] = [];

		// Filter text to only allowed characters
		for (let i = 0; i < textToPlay.length; i++) {
			if (allowedChars.includes(textToPlay[i])) {
				filteredText.push(textToPlay[i]);
			}
		}

		// Build playlist URLs
		const playlistUrls: string[] = [];
		let i = 0;
		while (i < filteredText.length) {
			let currToken = filteredText[i];
			if (['c', 'p', 's', 't', 'w'].includes(currToken)) {
				if (i !== filteredText.length - 1) {
					currToken += 'h';
					i += 1;
				}
			}
			playlistUrls.push(libSounds[currToken as keyof typeof libSounds]);
			i += 1;
		}

		// Select a representative subset of sounds
		const maxSounds = Math.floor(duration / 0.1); // One sound every 100ms
		const step = Math.max(1, Math.ceil(playlistUrls.length / maxSounds));
		const selectedSounds = playlistUrls.filter((_, index) => index % step === 0);

		// Chain audio files
		const onEnd = () => {
			currentIndex++;
			if (currentIndex < howlerBank.length && !$isMuted) {
				howlerBank[currentIndex].play();
				currHowlPlaying = howlerBank[currentIndex];
			}
		};

		// Build Howler bank
		howlerBank = selectedSounds.map(url => new Howl({ 
			src: [url], 
			onend: onEnd,
			volume: 0.5
		}));
		currentIndex = 0;

		// Stop current playing sound if any
		if (currHowlPlaying?.playing()) {
			currHowlPlaying.stop();
		}

		// Start playback if not muted
		if (!$isMuted) {
			howlerBank[0].play();
			currHowlPlaying = howlerBank[0];
		}
	}

	/**
	 * Generates messages with calculated delays and durations
	 * @param rawMessages - Array of message text and optional stayVisible flag
	 * @returns Array of complete Message objects
	 */
	function generateMessages(
		rawMessages: Array<{ text: string; stayVisible?: boolean }>
	): Message[] {
		let currentDelay = 0;
		const gapBetweenMessages = 0.6; // Seconds to wait between messages

		return rawMessages.map(({ text, stayVisible }) => {
			const duration = calculateDuration(text);
			const message: Message = {
				text,
				delay: currentDelay,
				duration,
				stayVisible
			};

			// Schedule sound playback
			setTimeout(() => {
				playTextSound(text, duration);
				
				// If we couldn't autoplay, try playing again after user interaction
				if (!canAutoplay) {
					$effect(() => {
						if (userHasInteracted) {
							playTextSound(text, duration);
						}
					});
				}
			}, currentDelay * 1000);

			// Update delay for next message
			currentDelay += duration + gapBetweenMessages;

			return message;
		});
	}

	// Initialize messages
	let messages: Message[] = $derived(isHome ? generateMessages([
		{ text: "Hi!" },
		{ text: "Welcome to my personal website" },
		{ text: "My name is Taylor Sabbag" },
		{ text: "I'm a software engineer", stayVisible: true }
	]) : []);
</script>

<a
	href="/"
	class={isHome ? 'is-home relative left-2 top-20 scale-125' : 'relative left-0 top-0 scale-100'}
>
	<img
		src={defaultAvatarUrl}
		{alt}
		class="avatar {className}"
		width={size}
		height={size}
		onerror={(e) => {
			// Fallback handling if the image fails to load
			console.error('Failed to load avatar image:', e);
		}}
	/>
	{#if isHome}
		{#each messages as { text, delay, duration, stayVisible }}
			<div
				class="text-bubble flex text-sm text-gray-500 {stayVisible ? 'stay-visible' : ''}"
				style="--delay: {delay}s; --duration: {duration}s"
			>
				<span class="typewriter-text">{text}</span>
			</div>
		{/each}
	{/if}
</a>

<style>
	.avatar {
		border-radius: 50%;
		object-fit: cover;
		background-color: var(--color-background);
		border: 1px solid #e2e8f0;
		box-shadow: 0 2px 5px 0 #e2e8f0;
		view-transition-name: avatar;
		anchor-name: --avatar;
	}

	.text-bubble {
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid var(--color-border);
        @apply rounded-full;
		position-anchor: --avatar;
		position-area: center right;
		position: fixed;
		font-family: monospace;
		padding: 0.75rem 1rem;
		anchor-name: --bubble;
		margin-left: 1rem;
		background-color: var(--color-background);
		opacity: 0;
		animation:
			fadeIn 0.3s ease-out var(--delay) forwards,
			fadeOut 0.3s ease-out calc(var(--delay) + var(--duration) + 0.5s) forwards;

		&::after {
			content: '';
			position: absolute;
			left: -5px;
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
			width: 12px;
			height: 12px;
			background: var(--color-background);
			border-left: 1px solid var(--color-border);
			border-bottom: 1px solid var(--color-border);
		}
	}

	.text-bubble.stay-visible {
		animation: fadeIn 0.3s ease-out var(--delay) forwards;
	}

	.typewriter-text {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		width: 0;
		border-right: 0.15em solid #e2e8f0;
		margin-block-end: -0.25rem;
		animation:
			typing var(--duration) steps(30, end) var(--delay) forwards,
			blink-caret 0.75s step-end infinite;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}

	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink-caret {
		from,
		to {
			border-right-color: transparent;
		}
		50% {
			border-right-color: #e2e8f0;
		}
	}
</style>
