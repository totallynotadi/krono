<script>
	import FilesSection from '$lib/components/sections/FilesSection.svelte';
	import { getBlobURL } from '$lib/cryptoUtils';
	import { rootRef } from '$lib/firebase.client';
	import { authStore } from '$lib/stores';
	import { decrypt } from '$lib/cryptoUtils.js';
	import { getBlob, getMetadata, listAll, ref } from 'firebase/storage';

	let currentUser = {};
	authStore.subscribe((newValue) => {
		currentUser = newValue.currentUser;
	});

	// @ts-ignore
	let userRef = ref(rootRef, currentUser.uid);
	let userStarredFolderRef = ref(userRef, '.starred.');

	/**
	 * @param {import("@firebase/storage").StorageReference} file
	 */
	async function processFile(file) {
		// @ts-ignore
		let fileName = file._location.path_.split('/').at(-1);
		let pathRef = ref(userRef, fileName);

		let miscMetadata = await getMetadata(pathRef);
		console.info('file metadata', miscMetadata, 'metadata');
		let encryptedBlob = await getBlob(pathRef);
		console.info('enc blob', encryptedBlob);
		// @ts-ignore
		// let decryptedFile = encryptedBlob;
		let decryptedFile = await decrypt(encryptedBlob, currentUser.uid);

		let result = {
			filename: miscMetadata.name,
			blobURL: getBlobURL(decryptedFile),
			fileType: miscMetadata.contentType
		};
		return { ...result };
	}

	async function getUserStarredItems() {
		let starredFolderContents = await listAll(userStarredFolderRef);
		let starredFolderItems = starredFolderContents.items;
		console.log('SHARED FOLDER ITEMS', starredFolderItems);
		let userStarredFile = [];
		let promisesList = starredFolderItems.map((file) => {
			console.info(file);
			// @ts-ignore
			return processFile(file, userStarredFolderRef);
		});
		userStarredFile = await Promise.all(promisesList);
		console.error(promisesList);

		return userStarredFile;
	}
</script>

{#await getUserStarredItems()}
	loading...
{:then data}
	<div class="fluid-column justify-start" style:gap={'2.4rem'}>
		<!-- {#if data.foldersList.length > 0}
			<FolderSection userFolders={data.foldersList} />
		{/if} -->
		{#if data}
			<FilesSection userFiles={data} sectionTitle={'Starred Files'} />
		{/if}
	</div>
{/await}
