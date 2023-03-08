<script>
	// @ts-nocheck
	import '$lib/assets/style.css';
	import { closeModal } from 'svelte-modals';
	// import { scale } from 'svelte/transition';

	// provided by <Modals />
	export let isOpen;
</script>

{#if isOpen}
	<div role="dialog" class="container modal">
		<div>lmao</div>
		<button on:click={closeModal}>CLOSE</button>
	</div>
{/if}

<style>
	.modal {
		width: 800px;
		max-width: 1000px;
		min-width: 600px;
		height: 600px;

		background-color: #f2f5f8;
		border-radius: 1rem;

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto auto;

		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: all;
	}
</style>
