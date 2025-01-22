<script lang="ts">
  import { page } from '$app/state';
  
  let isHome = $derived(page.url.pathname === '/');

  /**
   * Props for the Avatar component
   * @property {string} alt - Alternative text for the avatar image
   * @property {string} [size="40px"] - Size of the avatar (width and height)
   * @property {string} [className=""] - Additional CSS classes to apply
   */
  let { alt, size = "50px", className = "" } = $props<{
    alt: string;
    size?: string;
    className?: string;
  }>();

  const defaultAvatarUrl = "https://api.dicebear.com/9.x/lorelei/svg?seed=Alexander&beardProbability=100&scale=120&backgroundColor=663399&backgroundType=gradientLinear";
</script>

<a href="/" class={isHome ? 'relative top-20 scale-125 left-2' : 'relative top-0 scale-100 left-0'}>
  <img
    src={defaultAvatarUrl}
    {alt}
  class="avatar {className}"
  style="width: {size}; height: {size};"
  onerror={(e) => {
    // Fallback handling if the image fails to load
      console.error("Failed to load avatar image:", e);
    }}
  />
</a>

<style>
  .avatar {
    border-radius: 50%;
    object-fit: cover;
    background-color: var(--color-background);
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 5px 0 #e2e8f0;
  }
</style>
