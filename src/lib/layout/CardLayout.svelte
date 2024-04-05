<script>
	export let gap = '1rem';
	export let width = '402px';
</script>

<div>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
		style="gap: {gap}; width: {width};"
	>
		<slot />
	</div>
</div>
=
