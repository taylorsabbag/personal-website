<script lang="ts">
	import { page } from '$app/state';
	import { isMuted } from '$lib/stores/audio';

	/**
	 * Type definition for a greeting message
	 */
	type Greeting = {
		/** The text to display */
		text: string;
		/** Path to the sound file */
		sound?: string;
		/** Whether this greeting should stay visible */
		stayVisible?: boolean;
	};

	/**
	 * Predefined greetings with their associated sound files
	 */
	const greetings: Greeting[] = [
		{ text: 'Welcome to my personal website', sound: '/sounds/greeting-1.wav' },
		{ text: 'My name is Taylor Sabbag', sound: '/sounds/greeting-2.wav' },
		{ text: "I'm a software engineer", sound: '/sounds/greeting-3.wav', stayVisible: true }
	];

	let isHome = $derived(page.url.pathname === '/');

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
		onStart?: () => void;
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

	/**
	 * Manages sound playback for greetings
	 */
	class SoundManager {
		private currentSound: HTMLAudioElement | null = null;

		/**
		 * Plays a sound file if not muted
		 * @param soundPath - Path to the sound file
		 */
		play(soundPath: string | undefined): void {
			// Clean up any existing sound
			this.stop();

			if (!soundPath || $isMuted) return;

			this.currentSound = new Audio(soundPath);
			this.currentSound.play().catch((error) => {
				console.error('Failed to play sound:', error);
			});
		}

		/**
		 * Stops the currently playing sound
		 */
		stop(): void {
			if (this.currentSound) {
				this.currentSound.pause();
				this.currentSound.currentTime = 0;
				this.currentSound = null;
			}
		}
	}

	const soundManager = new SoundManager();

	// Reset startGreetings when navigating away from home page
	$effect(() => {
		if (!isHome) {
			startGreetings = false;
			soundManager.stop();
		}
	});

	// Keep the existing effect for mute state
	$effect(() => {
		if ($isMuted) {
			soundManager.stop();
		}
	});

	// Initialize messages with sound playback
	let messages: Message[] = $derived(
		isHome
			? generateMessages(
					greetings.map((greeting) => ({
						text: greeting.text,
						stayVisible: greeting.stayVisible,
						onStart: () => soundManager.play(greeting.sound)
					}))
				)
			: []
	);

	// Update function to include onStart callback
	function generateMessages(
		rawMessages: Array<{
			text: string;
			stayVisible?: boolean;
			onStart?: () => void;
		}>
	): Message[] {
		let currentDelay = 0;
		const gapBetweenMessages = 0.6;

		return rawMessages.map(({ text, stayVisible, onStart }) => {
			const duration = calculateDuration(text);
			const message: Message = {
				text,
				delay: currentDelay,
				duration,
				stayVisible,
				onStart
			};

			currentDelay += duration + gapBetweenMessages;
			return message;
		});
	}

	let startGreetings = $state(false);
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
		<button
			class="speech-element greeting-button text-sm text-gray-500"
			class:clicked={startGreetings}
			onclick={() => (startGreetings = true)}
		>
			<span class="typewriter-text !w-full opacity-100">Hi!</span>
		</button>
		{#if startGreetings}
			{#each messages as { text, delay, duration, stayVisible, onStart }}
				<div
					class="speech-element text-bubble flex text-sm text-gray-500 {stayVisible
						? 'stay-visible'
						: ''}"
					style="--delay: {delay}s; --duration: {duration}s"
					onanimationstart={() => onStart?.()}
				>
					<span class="typewriter-text">{text}</span>
				</div>
			{/each}
		{/if}
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

	.speech-element {
		position-anchor: --avatar;
		position-area: center right;
		position: fixed;
		margin-left: 1rem;
		background-color: var(--color-background);
		@apply rounded-full;
		border: 1px solid var(--color-border);
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
		margin-block-end: -0.25rem;
		font-family: monospace;
		padding: 0.75rem 1rem;

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

	.greeting-button {
		display: flex;
		align-items: center;

		&.clicked {
			animation: fadeOut 0.3s ease-out forwards;
		}

		& .typewriter-text {
			animation: blink-caret 1s ease-in-out infinite;
		}
	}

	.text-bubble {
		opacity: 0;
		animation:
			fadeIn 0.3s ease-out var(--delay) forwards,
			fadeOut 0.3s ease-out calc(var(--delay) + var(--duration) + 0.5s) forwards;
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
		0%,
		100% {
			border-right-color: transparent;
		}
		50% {
			border-right-color: #e2e8f0;
		}
	}
</style>
