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
		<!-- svelte-ignore a11y-missing-attribute -->
		<!-- <iframe
			src="https://docs.google.com/gview?url=http://remote.url.tld/path/to/document.doc&embedded=true"
		/> -->

		<iframe
			src="https://docs.google.com/gview?url=https://www.adobe.com/support/ovation/ts/docs/ovation_test_show.ppt&embedded=true"
		/>
		<!-- <iframe src={`https://docs.google.com/gview?url=${blobURL}&embedded=true`} /> -->
		<div class="title">{fileName}</div>
	</div>
{/if}

<style>
	.modal {
		width: 60%;
		/* width: fit-content; */
		/* max-width: 1000px; */
		/* min-width: 600px; */
		height: 98%;
		/* height: fit-content; */

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
	iframe {
		width: 100%;
		height: 100%;
	}
</style>
