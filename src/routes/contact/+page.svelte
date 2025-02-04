<script lang="ts">
	import { page } from '$app/state';

	let isHome = $derived(page.url.pathname === '/');
</script>

