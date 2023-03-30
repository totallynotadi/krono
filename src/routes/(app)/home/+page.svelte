<script>
	import FilesSection from '$lib/components/sections/FilesSection.svelte';
	import FolderSection from '$lib/components/sections/FolderSection.svelte';
	import QuickAccessSection from '$lib/components/sections/QuickAccessSection.svelte';
	import { auth, rootRef } from '$lib/firebase.client';
	import { authStore, refStore } from '$lib/stores';
	import { listAll, ref, getBlob, getMetadata } from 'firebase/storage';
	import { onMount } from 'svelte';
	import { decrypt, getBlobURL } from '$lib/cryptoUtils';

	// let fileName;
	// let pathRef;
	// let encryptedBlob;
	// let decryptedFile;
	// let miscMetadata;

	let currentUser = {};
	authStore.subscribe((newValue) => {
		currentUser = newValue.currentUser;
	});

	/**
	 * @type {import("@firebase/storage").FirebaseStorage | import("@firebase/storage").StorageReference}
	 */
	let userRef;
	// @ts-ignore
	userRef = ref(rootRef, currentUser.uid);
	refStore.update((newValue) => {
		return { ...newValue, userRef: newValue.userRef };
	});

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
		let decryptedFile = await decrypt(encryptedBlob, currentUser.uid);
		let result = {
			filename: miscMetadata.name,
			blobURL: getBlobURL(decryptedFile),
			fileType: miscMetadata.contentType
		};
		return { ...result };
	}

	async function getUserFiles() {
		console.log('from files loader', currentUser, 'auth', auth.currentUser);

		// const testRef = ref(rootRef, 'two');
		console.log('userRef', userRef);
		// @ts-ignore
		let userList = await listAll(userRef);
		console.log('userList', userList);

		let userFilesList = userList.items;
		let userFoldersList = userList.prefixes;

		let decryptedUserFiles = [];
		let finalFoldersList = [];

		// for (const file of userFilesList) {
		// 	decryptedUserFiles.push({});
		// }
		let promisesList = userFilesList.map((file) => {
			console.info(file);
			return processFile(file);
		});
		decryptedUserFiles = await Promise.all(promisesList);
		console.error(promisesList, decryptedUserFiles);

		for (const folder of userFoldersList) {
			if (folder.name === '.shared.' || folder.name === '.shared-with-me.') {
				continue;
			}
			// console.log(folder);
			// @ts-ignore
			let folderName = folder._location.path_.split('/').at(-1);
			finalFoldersList.push(folderName);
		}

		// userFilesList.items.forEach(async (file) => {
		// 	fileName = file._location.path_.split('/').at(-1);
		// 	pathRef = ref(userRef, fileName);
		// 	encryptedBlob = await getBlob(pathRef);
		// 	decryptedFile = await decrypt(encryptedBlob, currentUser.uid);
		// 	decryptedUserFiles.push(getBlobURL(decryptedFile));
		// });
		// console.log(decryptedUserFiles);
		return { filesList: decryptedUserFiles, foldersList: finalFoldersList };
	}
	let promise = getUserFiles();
</script>

{#await promise}
	loading
{:then data}
	<div class="fluid-column justify-start" style:gap={'2.4rem'}>
		<!-- {#each data as file}
			<img src={file} alt="" />	
		{/each} -->
		<QuickAccessSection />
		{#if data.foldersList.length > 0}
			<FolderSection userFolders={data.foldersList} />
		{/if}
		{#if data.filesList.length > 0}
			<FilesSection userFiles={data.filesList} />
		{:else}
			loading files...
		{/if}
	</div>
{/await}

<style>
</style>
