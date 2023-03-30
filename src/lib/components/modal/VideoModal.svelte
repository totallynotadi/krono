<script>
	import '$lib/assets/style.css';
	import { closeModal } from 'svelte-modals';
	import { blur } from 'svelte/transition';

	// import { scale } from 'svelte/transition';

	// provided by <Modals />
	/**
	 * @type {any}
	 */
	export let isOpen;

	/**
	 * @type {any}
	 */
	export let blobURL;
	/**
	 * @type {any}
	 */
	export let fileName;
</script>

{#if isOpen}
	<div
		role="dialog"
		class="fluid-column modal"
		style:gap={'1rem'}
		transition:blur={{ duration: 400 }}
	>
		<!-- <div>lmao</div> -->
		<!-- svelte-ignore a11y-media-has-caption -->
		<video src={blobURL} autoplay="true" />
		<!-- <button class="filled-button" on:click={closeModal}>CLOSE</button> -->
		<div class="title">{fileName}</div>
	</div>
{/if}

<style>
	video {
		width: 100%;
		/* height: 100%; */
		max-width: min-content;
		max-height: min-content;
		/* background-size: contain; */
	}
	.modal {
		width: 80%;
		/* width: fit-content; */
		/* max-width: 1000px; */
		/* min-width: 600px; */
		height: 90%;
		height: fit-content;

		background-color: #f2f5f8;
		background-color: transparent;
		border-radius: 0.4rem;

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto auto;

		display: flex;
		justify-content: center;
		align-items: center;

		padding: 1rem;
		/* allow click-through to backdrop */
		/* pointer-events: all; */
	}
	.title {
		color: rgb(255, 255, 255);
		font-size: 16px;
		font-weight: 500;
	}
</style>
