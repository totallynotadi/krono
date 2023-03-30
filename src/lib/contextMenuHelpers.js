import { browser } from '$app/environment';
import { ref, uploadBytes } from 'firebase/storage';
import { contextStore, refStore, authStore } from './stores';
import { encrypt } from './cryptoUtils';

import { openModal } from 'svelte-modals';
import NewFolderModal from './components/modal/NewFolderModal.svelte';
import { page } from '$app/stores';
import { get } from 'svelte/store';
import ShareModal from './components/modal/ShareModal.svelte';

export const contextMenuTypes = ['file', 'folder', 'default'];

/**
 * @type {HTMLElement | null}
 */
let mainContent;
/**
 * @type {string}
 */
export let currentAuth;
authStore.subscribe((newValue) => {
	currentAuth = newValue.currentUser;
});
export let currentUserRef = {};
refStore.subscribe((newValue) => {
	currentUserRef = newValue.userRef;
});
/**
 * @type {{ eventDetails: any; showMenu?: boolean; pos?: { x: number; y: number; }; type?: null; elementOptions?: {}; }}
 */
let contextInfo;
contextStore.subscribe((newValue) => {
	contextInfo = newValue;
});

export function closeContextMenu() {
	contextStore.update((oldValue) => {
		return { ...oldValue, showMenu: false };
	});
}

// @ts-ignore
export function showContextMenu(e, ElementType = null) {
	if (browser) {
		mainContent = document.getElementById('main-content');
	}
	if (e.button == 2 && mainContent?.contains(e.explicitOriginalTarget)) {
		// let __type =
		// 	ElementType !== null
		// 		? ElementType
		// 		: contextMenuTypes.includes(e.explicitOriginalTarget.dataset.elementType)
		// 		? e.explicitOriginalTarget.dataset.elementType
		// 		: 'default';
		let __type = ElementType;
		// console.error('TYPE', __type, ElementType);
		// @ts-ignore
		contextStore.update(() => {
			return {
				showMenu: true,
				// @ts-ignore
				pos: { x: e.x | window.currentMouseX, y: e.y | window.currentMouseY },
				type: __type,
				// @ts-ignore
				elementOptions: elementOptions.get(__type),
				eventDetails: e.details
			};
		});
	}
}

// @ts-ignore
export function showUploadContextMenu(e) {
	let elementPos = e.target.getBoundingClientRect();
	let type = 'default';
	// console.log(elementPos);
	let menuPos = { x: elementPos.x + elementPos.width + 20, y: elementPos.y };
	// @ts-ignore
	contextStore.update((oldValue) => {
		return {
			...oldValue,
			showMenu: true,
			pos: menuPos,
			type: type,
			elementOptions: elementOptions.get(type)
		};
	});
}

/**
 * @param {MouseEvent} e
 * @param {String | null} type
 *
 */
export function onRightMouseDown(e, type = null) {
	// @ts-ignore
	// if (contextInfo.showMenu && e.button == 2) {
	// 	// @ts-ignore
	// 	contextStore.update((oldValue) => {
	// 		return { ...oldValue, showMenu: false, elementOptions: {} };
	// 	});
	// 	// @ts-ignore
	// 	console.log(contextInfo.showMenu);
	// 	window.onmouseup = async (e) => {
	// 		if (e.button == 2) {
	// 			console.error('TYYYYYPE', type);
	// 			setTimeout(() => {
	// 				showContextMenu(e, type);
	// 			}, 25);
	// 		}
	// 	};
	// 	return;
	// }
	// console.info(type);
	showContextMenu(e, type);
}

let defaultOptions = [
	{
		name: 'New Folder',
		callback: async () => {
			console.log('create folder');
			if (browser) {
				// let folderName = 'new-test';
				// @ts-ignore
				openModal(NewFolderModal);
			}
		},
		expandable: false
	},
	{ name: '__section' },
	{
		name: 'Upload File',
		callback: () => {
			console.log('upload file');
			if (browser) {
				let input = document.createElement('input');
				input.type = 'file';
				input.onchange = async () => {
					// @ts-ignore
					var file = input.files[0];
					// var file = e.target.files[0];

					// @ts-ignore
					var encrypted = await encrypt(file, currentAuth.uid);

					console.info(encrypted, file);

					let currentFolderName = get(page).url.pathname.split('/').slice(2).join('/');
					let currentFolderRef =
						// @ts-ignore
						currentFolderName === '' ? currentUserRef : ref(currentUserRef, currentFolderName);
					// let newFolderRef = ref(currentFolderRef, folderName);

					// @ts-ignore
					// let fileRef = ref(currentUserRef, file.name);
					let fileRef = ref(currentFolderRef, file.name);
					let snapshot = await uploadBytes(fileRef, encrypted);
					console.error('uploaded files', snapshot);

					// @ts-ignore
					// let file = e.target.files[0];
					// console.log(file);
					// let testRef = ref(rootRef, 'two');
					// let imageRef = ref(testRef, file.name);
				};
				input.click();
			}
		},
		expandable: false
	},
	{
		name: 'Upload Folder',
		callback: () => {
			console.log('upload folder');
		},
		expandable: false
	},
	{ name: '__section' },
	{
		name: 'Settings',
		callback: () => {
			console.log('settings');
		},
		expandable: false
	},
	{
		name: 'About',
		callback: () => {
			console.log('about');
		},
		expandable: false
	}
];

let fileOptions = [
	{
		name: 'Preview',
		callback: () => {
			console.log('preview');
		},
		expandable: false
	},
	{
		name: 'Download',
		callback: () => {
			console.log('Download');
		},
		expandable: false
	},
	{ name: '__section' },
	{
		name: 'Share',
		callback: async () => {
			console.log('Share');
			// let currentFolderName = get(page).url.pathname.split('/').slice(2).join('/');
			// let currentFolderRef =
			// 	// @ts-ignore
			// 	currentFolderName === '' ? currentUserRef : ref(currentUserRef, currentFolderName);
			// @ts-ignore
			let sharedFolderRef = ref(currentUserRef, '.shared.');
			let eventData = contextInfo.eventDetails;
			console.error(eventData);
			// @ts-ignore
			// let toBeSharedFileRef = ref(currentFolderRef, eventData.fileName);
			let fileToBeShared = await fetch(eventData.blobURL)
				.then((r) => r.blob())
				.then((blob) => new File([blob], eventData.fileName, { type: blob.type }));
			console.error(fileToBeShared, sharedFolderRef);
			let fileSharedFolderRef = ref(sharedFolderRef, eventData.fileName);
			let snapshot = await uploadBytes(fileSharedFolderRef, fileToBeShared);
			console.error('file shared', snapshot);
			// @ts-ignore
			openModal(ShareModal, { ...eventData, fileType: fileToBeShared.type });
		},
		expandable: false
	},
	{
		name: 'Add to Starred',
		callback: () => {
			console.log('Add to Starred');
		},
		expandable: false
	},
	{
		name: 'Move',
		callback: () => {
			console.log('Move');
		},
		expandable: false
	},
	{
		name: 'Rename',
		callback: () => {
			console.log('Rename');
		},
		expandable: false
	},
	{ name: '__section' },
	{
		name: 'Details',
		callback: () => {
			console.log('Details');
		},
		expandable: false
	},
	{
		name: 'Remove',
		callback: () => {
			console.log('Remove');
		},
		expandable: false
	}
];

let folderOptions = [
	{ name: '__section' },
	{
		name: 'About',
		callback: () => {
			console.log('about');
		},
		expandable: false
	}
];

export const elementOptions = new Map([
	['default', defaultOptions],
	['file', fileOptions],
	['folder', folderOptions]
]);
