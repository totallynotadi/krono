<script>
	import HelpCircleOutline from 'svelte-material-icons/HelpCircleOutline.svelte';

	export let icon = HelpCircleOutline;
	export let size = 25;
	export let color = '#5F6368';
	export let callback = () => {};

	let iconProps = {
		size: size,
		color: color
	};
</script>

<div
	class="icon-container row align-center justify-center"
	on:click={callback}
	on:keypress={() => {}}
>
	<svelte:component this={icon} {...iconProps} />
</div>

<style>
	.icon-container {
		height: 40px;
		width: 40px;
		background-color: transparent;
		border-radius: 8rem;
		transition: background-color 0.25s ease;
	}
	.icon-container:hover {
		background-color: #e8ebed;
	}
	.icon-container:active {
		/* background-color: rgba(60, 64, 67, 0.122); */
		background-color: #e8f0fe;
	}
</style>
