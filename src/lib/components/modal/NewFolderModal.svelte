<script>
	import '$lib/assets/style.css';
	import { closeModal } from 'svelte-modals';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { ref, uploadBytes } from 'firebase/storage';
	import { currentUserRef } from '$lib/contextMenuHelpers';
	import toast from 'svelte-french-toast';

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
		toast.success('Folder Created');
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};
</script>

{#if isOpen}
	<div role="dialog" class="fluid-column modal" style:gap={'1rem'}>
		<!-- <div>lmao</div> -->
		<!-- <img src={imageThumbnailURL} alt="" />
		<button class="filled-button" on:click={closeModal}>CLOSE</button> -->
		<div class="title">New Folder</div>
		<input class="input-field" type="text" placeholder="Untitled" bind:value={folderName} />
		<div class="row" style:gap={'1rem'}>
			<div class="filled-button filled-button-outline" on:keypress={() => {}} on:click={closeModal}>
				Cancel
			</div>
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
	.input-field {
		border: none;
		outline: none;
		height: 40px;
		width: 100%;
		border-radius: 8px;
		background-color: #f3f3f4;
		transition: all 0.15s ease;
		padding: 0 16px;
	}
	.input-field:hover {
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: #fff;
		-webkit-box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1);
		box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1);
	}
	.filled-button {
		all: unset;
		background-color: #1187e0;
		border-radius: 10px;
		color: #fff;
		padding: 0.8rem 4rem;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.25px;
	}
	.filled-button:hover {
		background-color: #2f91db;
	}
	.filled-button:active {
		background-color: #0f83db;
	}

	.filled-button-outline {
		all: unset;
		/* background-color: #1187e0; */
		border-radius: 10px;
		color: #1187e0;
		outline: 2px solid #1187e0;
		padding: 0.8rem 4rem;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.25px;
	}

	.filled-button-outline:hover {
		background-color: #2f91db;
	}
	.filled-button-outline:active {
		background-color: #0f83db;
	}
</style>
