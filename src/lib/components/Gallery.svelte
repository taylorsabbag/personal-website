<script lang="ts">
  /**
   * Array of image objects containing URLs and alt text
   * Using placeholder images from picsum.photos for demonstration
   */
  const images: Array<{ src: string; alt: string }> = Array.from({ length: 10 }, (_, i) => ({
    src: `https://picsum.photos/seed/${i+1}/288/320`,
    alt: `Gallery image ${i + 1}`
  }));

  /** Type definition for gallery image parameters */
  type GalleryImageParams = {
    src: string;
    alt: string;
    rotation: number;
  };
</script>

{#snippet galleryImage({ src, alt, rotation }: GalleryImageParams)}
  <div 
    class="image-wrapper"
    style="--rotation: {rotation}deg"
  >
    <img {src} {alt} />
  </div>
{/snippet}

<div class="gallery-container">
  <div class="gallery">
    {#each images as { src, alt }, i}
      {@render galleryImage({
        src,
        alt,
        rotation: ((i+1) % 2 === 0 ? 1 : -1) * Math.random() * 4
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
    
    animation: scroll-x linear;
    animation-timeline: scroll();
    animation-range: 0 100vh;
  }

  .image-wrapper {
    flex: 0 0 auto;
    border-radius: 1rem;
    overflow: hidden;
    transform: rotate(var(--rotation));
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease;
  }

  .image-wrapper:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 0 8px 12px -1px rgb(0 0 0 / 0.2);
  }

  img {
    width: 288px;
    height: 320px;
    object-fit: cover;
    border-radius: 1rem;
  }

  @keyframes scroll-x {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(calc(-100% + 100vw));
    }
  }
</style>
