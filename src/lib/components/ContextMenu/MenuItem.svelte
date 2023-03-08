<script>
	import { closeContextMenu } from '$lib/contextMenuHelpers';

	// @ts-nocheck
	/**
	 * @type {{ callback: () => void; name: any; expandable: any; }}
	 */
	export let optionData;

	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
</script>

<div
	class="menu-item fluid-row"
	on:click={() => {
		optionData.callback();
		closeContextMenu();
	}}
	on:keypress={() => {}}
>
	<div class="title">
		{optionData.name}
	</div>
	{#if optionData.expandable}
		<ChevronRight size={18} viewBox={'0 0 24 20'} color={'#5F6368'} />
	{/if}
</div>

<style>
	.menu-item {
		height: fit-content;
		background-color: transparent;
		padding: 0.8rem 1rem;
		border-radius: 0.6rem;
		backdrop-filter: blur(6px);
	}
	.title {
		font-size: 14px;
		color: rgb(60, 64, 67);
		font-weight: 500;
	}
	.menu-item:hover {
		background-color: rgba(206, 206, 206, 0.6);
	}
</style>
