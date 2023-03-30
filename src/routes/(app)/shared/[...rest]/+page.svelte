<script>
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { rootRef } from '$lib/firebase.client';
	import { currentUserRef } from '$lib/contextMenuHelpers';
	import { getBlob, ref, uploadBytes } from 'firebase/storage';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		let sharedWithMeFileName = get(page).url.pathname.split('/').slice(2);
		console.log(sharedWithMeFileName);
		let sharedWithMeFileRef = ref(
			rootRef,
			`${sharedWithMeFileName[0]}/.shared./${sharedWithMeFileName[1]}`
		);
		// @ts-ignore
		let currentUserSharedWithMeRef = ref(currentUserRef, '.shared-with-me.');
		let sharedWithMeDestRef = ref(currentUserSharedWithMeRef, sharedWithMeFileName[1]);
		let fileBlob = await getBlob(sharedWithMeFileRef);
		let snapshot = await uploadBytes(sharedWithMeDestRef, fileBlob);
		console.log('FILE UPLOADED', snapshot);
		goto('/shared');
	});
</script>

<div />

<style></style>
