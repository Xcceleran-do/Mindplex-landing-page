<script>
	// export interface Props {
	//   gap?: string;
	//   width?: string;
	// }
	export let gap;
	export let width;

	// const { gap = "1rem", width = "402px" } = Astro.props;
</script>

<div class="card-grid">
	<slot />
</div>

<style define:vars="{{" gap, width }}>
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(475px, 1fr));
		gap: 25px;
	}

	@media screen and (max-width: 768px) {
		.card-grid {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30px;
		}
	}
</style>
