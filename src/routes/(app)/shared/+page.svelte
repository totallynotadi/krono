<script>
	import FilesSection from '$lib/components/sections/FilesSection.svelte';
	import { currentUserRef } from '$lib/contextMenuHelpers';
	import { getBlobURL } from '$lib/cryptoUtils';
	import { getBlob, getMetadata, listAll, ref } from 'firebase/storage';

	// @ts-ignore
	let userSharedFolderRef = ref(currentUserRef, '.shared.');
	// @ts-ignore
	let userSharedWithMeFolderRef = ref(currentUserRef, '.shared-with-me.');

	/**
	 * @param {import("@firebase/storage").StorageReference} file
	 */
	async function processFile(file, sharedFolderRef = null) {
		// @ts-ignore
		let fileName = file._location.path_.split('/').at(-1);
		// @ts-ignore
		let pathRef = ref(sharedFolderRef, fileName);

		let miscMetadata = await getMetadata(pathRef);
		console.info('file metadata', miscMetadata, 'metadata');
		let fileBlob = await getBlob(pathRef);
		console.info('enc blob', fileBlob);
		// @ts-ignore
		// let decryptedFile = await decrypt(encryptedBlob, currentUser.uid);
		let result = {
			filename: miscMetadata.name,
			blobURL: getBlobURL(fileBlob),
			fileType: miscMetadata.contentType
		};
		return { ...result };
	}

	async function getSharedItems() {
		let sharedFolderContents = await listAll(userSharedFolderRef);
		let sharedFolderItems = sharedFolderContents.items;
		console.log('SHARED FOLDER ITEMS', sharedFolderItems);
		let userSharedFiles = [];
		let promisesList = sharedFolderItems.map((file) => {
			console.info(file);
			// @ts-ignore
			return processFile(file, userSharedFolderRef);
		});
		userSharedFiles = await Promise.all(promisesList);
		console.error(promisesList, userSharedFiles);

		let sharedWithMeContents = await listAll(userSharedWithMeFolderRef);
		let sharedWithMeItems = sharedWithMeContents.items;
		console.log('SHARED WITH ME', sharedWithMeItems);
		let userSharedWithMeFiles = [];
		let SharedWithMePromisesList = sharedWithMeItems.map((file) => {
			console.info(file);
			// @ts-ignore
			return processFile(file, userSharedWithMeFolderRef);
		});
		userSharedWithMeFiles = await Promise.all(SharedWithMePromisesList);

		return [userSharedFiles, userSharedWithMeFiles];
	}
</script>

{#await getSharedItems()}
	loading...
{:then data}
	<div class="fluid-column justify-start" style:gap={'2.4rem'}>
		<!-- {#if data.foldersList.length > 0}
			<FolderSection userFolders={data.foldersList} />
		{/if} -->
		{#if data[0].length > 0}
			<FilesSection userFiles={data[0]} sectionTitle={'Shared Files'} />
		{/if}
		{#if data[1].length > 0}
			<FilesSection userFiles={data[1]} sectionTitle={'Shared With Me'} />
		{/if}
	</div>
{/await}

<style></style>
