<script>
	import { page } from '$app/stores';
	import { getBlob, getMetadata, listAll, ref } from 'firebase/storage';
	import { authStore, refStore } from '$lib/stores';
	import { decrypt, getBlobURL } from '$lib/cryptoUtils';
	import FolderSection from '$lib/components/sections/FolderSection.svelte';
	import FilesSection from '$lib/components/sections/FilesSection.svelte';
	import toast from 'svelte-french-toast';

	let currentUserRef = {};
	refStore.subscribe((newValue) => {
		currentUserRef = newValue.userRef;
	});

	let currentUser = {};
	authStore.subscribe((newValue) => {
		currentUser = newValue.currentUser;
	});

	$: currentFolderName = $page.url.pathname.split('/').slice(2).join('/');
	// @ts-ignore
	const getPageData = async (currentFolderName) => {
		// @ts-ignore
		let currentFolderRef = ref(currentUserRef, currentFolderName);
		let currentFolderUserList = await listAll(currentFolderRef);

		console.error('PAGE DATA FROM REST', currentFolderUserList, currentFolderName);
		let currentFolderItems = currentFolderUserList.items;
		let currentFolderPrefixes = currentFolderUserList.prefixes;

		let finalDecryptedFiles = [];
		let finalFoldersList = [];
		for (const file of currentFolderItems) {
			if (file.name === '.root.') {
				continue;
			}
			// @ts-ignore
			let fileName = file._location.path_.split('/').at(-1);
			let pathRef = ref(currentFolderRef, fileName);

			let miscMetadata = await getMetadata(pathRef);
			console.info('file metadata', miscMetadata, 'metadata');
			let encryptedBlob = await getBlob(pathRef);
			// @ts-ignore
			let decryptedFile = await decrypt(encryptedBlob, currentUser.uid);
			finalDecryptedFiles.push({
				filename: miscMetadata.name,
				blobURL: getBlobURL(decryptedFile),
				fileType: miscMetadata.contentType
			});
		}
		for (const folder of currentFolderPrefixes) {
			// @ts-ignore
			let folderName = folder._location.path_.split('/').at(-1);
			finalFoldersList.push(folderName);
		}
		return { filesList: finalDecryptedFiles, foldersList: finalFoldersList };
	};

	let promise = getPageData(currentFolderName);
	toast.promise(promise, {
		loading: 'Fetching Files',
		success: 'Files Fetched Successfully',
		error: 'Could not fetch.'
	});
</script>

{#await promise}
	loading...
{:then data}
	<div class="fluid-column justify-start" style:gap={'2.4rem'}>
		<!-- {$page.url.pathname} -->
		{#if data.foldersList.length > 0}
			<FolderSection userFolders={data.foldersList} />
		{/if}
		{#if data.filesList.length > 0}
			<FilesSection userFiles={data.filesList} />
		{/if}
	</div>
{/await}

<style></style>
