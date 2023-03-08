<script>
	// @ts-nocheck

	import FilesSection from '$lib/components/sections/FilesSection.svelte';
	import FolderSection from '$lib/components/sections/FolderSection.svelte';
	import QuickAccessSection from '$lib/components/sections/QuickAccessSection.svelte';
	import { rootRef } from '$lib/firebase.client';
	import { authStore, refStore } from '$lib/stores';
	import { listAll, ref, getBlob } from 'firebase/storage';
	import { onMount } from 'svelte';
	import { decrypt, getBlobURL } from '$lib/cryptoUtils';

	let fileName;
	let pathRef;
	let encryptedBlob;
	let decryptedFile;

	let userRef;
	let currentUser = {};
	authStore.subscribe((newValue) => {
		currentUser = newValue.currentUser;
	});

	async function getUserFiles() {
		userRef = ref(rootRef, currentUser.uid);
		refStore.update(() => {
			return userRef;
		});
		// const testRef = ref(rootRef, 'two');
		console.log(userRef);
		let userFilesList = await (await listAll(userRef)).items;
		let decryptedUserFiles = [];

		for (const file of userFilesList) {
			fileName = file._location.path_.split('/').at(-1);
			pathRef = ref(userRef, fileName);
			encryptedBlob = await getBlob(pathRef);
			decryptedFile = await decrypt(encryptedBlob, currentUser.uid);
			decryptedUserFiles.push(getBlobURL(decryptedFile));
		}

		// userFilesList.items.forEach(async (file) => {
		// 	fileName = file._location.path_.split('/').at(-1);
		// 	pathRef = ref(userRef, fileName);
		// 	encryptedBlob = await getBlob(pathRef);
		// 	decryptedFile = await decrypt(encryptedBlob, currentUser.uid);
		// 	decryptedUserFiles.push(getBlobURL(decryptedFile));
		// });
		// console.log(decryptedUserFiles);
		return decryptedUserFiles;
	}
	let promise = getUserFiles();
</script>

{#await promise}
	loading
{:then data}
	<div class="fluid-column" style:gap={'2.4rem'}>
		<!-- {#each data as file}
			<img src={file} alt="" />	
		{/each} -->
		<QuickAccessSection />
		<FolderSection />
		<FilesSection userFiles={data} />
	</div>
{/await}

<style>
</style>
