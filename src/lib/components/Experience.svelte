<script lang="ts">
	import Content1 from "$lib/components/experience/Content1.svelte";
	import Content2 from "$lib/components/experience/Content2.svelte";
	import Content3 from "$lib/components/experience/Content3.svelte";
	import Timeline from "$lib/components/ui/Timeline.svelte";

	const timelineData = [
	  {
		title: "Svelte 5",
		content: Content1,
	  },
	  {
		title: "Early 2023",
		content: Content2,
	  },
	  {
		title: "Changelog",
		content: Content3,
	  },
	];
</script>
  
<Timeline {timelineData} />
  