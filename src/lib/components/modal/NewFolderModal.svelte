<script>
	import '$lib/assets/style.css';
	import { closeModal } from 'svelte-modals';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { ref, uploadBytes } from 'firebase/storage';
	import { currentUserRef } from '$lib/contextMenuHelpers';

	// import { scale } from 'svelte/transition';

	// provided by <Modals />
	/**
	 * @type {any}
	 */
	export let isOpen;

	let folderName = '';

	const createFolder = async () => {
		let file = new Blob([]);
		let currentFolderName = get(page).url.pathname.split('/').slice(2).join('/');
		console.log(currentFolderName, currentFolderName === '');

		let currentFolderRef =
			// @ts-ignore
			currentFolderName === '' ? currentUserRef : ref(currentUserRef, currentFolderName);
		// @ts-ignore
		let newFolderRef = ref(currentFolderRef, folderName);

		// @ts-ignore
		let finalFileRef = ref(newFolderRef, '.root.');
		let snapshot = await uploadBytes(finalFileRef, file);
		console.log('created folder', snapshot);
		closeModal();
	};
</script>

{#if isOpen}
	<div role="dialog" class="fluid-column modal" style:gap={'1rem'}>
		<!-- <div>lmao</div> -->
		<!-- <img src={imageThumbnailURL} alt="" />
		<button class="filled-button" on:click={closeModal}>CLOSE</button> -->
		<div class="title">New Folder</div>
		<input type="text" placeholder="Untitled" bind:value={folderName} />
		<div class="row">
			<div class="filled-button" on:keypress={() => {}} on:click={closeModal}>Cancel</div>
			<div class="filled-button" on:keypress={() => {}} on:click={createFolder}>Create</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		/* width: 800px;
		max-width: 1000px;
		min-width: 600px;
		height: 600px; */
		height: fit-content;
		width: fit-content;

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

		padding: 1rem;
		/* allow click-through to backdrop */
		/* pointer-events: all; */
	}
</style>
