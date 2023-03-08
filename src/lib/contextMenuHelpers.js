import { browser } from '$app/environment';
import { ref, uploadBytes } from 'firebase/storage';
import { contextStore, refStore, authStore } from './stores';
import { encrypt } from './cryptoUtils';

export const contextMenuTypes = ['file', 'folder', 'default'];

/**
 * @type {HTMLElement | null}
 */
let mainContent;
/**
 * @type {string}
 */
let currentAuth;
authStore.subscribe((newValue) => {
	currentAuth = newValue.currentUser;
});
let currentUserRef = {};
refStore.subscribe((newValue) => {
	currentUserRef = newValue;
});
let contextInfo = {};
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
		let __type =
			ElementType !== null
				? ElementType
				: contextMenuTypes.includes(e.explicitOriginalTarget.dataset.elementType)
				? e.explicitOriginalTarget.dataset.elementType
				: 'default';
		// @ts-ignore
		contextStore.update(() => {
			return {
				showMenu: true,
				// @ts-ignore
				pos: { x: e.x | window.currentMouseX, y: e.y | window.currentMouseY },
				type: __type,
				// @ts-ignore
				elementOptions: elementOptions.get(__type)
			};
		});
	}
}

// @ts-ignore
export function showUploadContextMenu(e) {
	let elementPos = e.target.getBoundingClientRect();
	let type = 'default';
	console.log(elementPos);
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
 * @param {any} e
 */
export function onRightMouseDown(e, type = null) {
	// @ts-ignore
	if (contextInfo.showMenu) {
		// @ts-ignore
		contextStore.update((oldValue) => {
			return { ...oldValue, showMenu: false, elementOptions: {} };
		});
		window.onmouseup = async (e) => {
			// @ts-ignore
			setTimeout(() => {
				showContextMenu(e, type);
			}, 25);
		};
		return;
	}
	showContextMenu(e, type);
}

let defaultOptions = [
	{
		name: 'New Folder',
		callback: () => {
			console.log('create folder');
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

					// @ts-ignore
					// var wordArray = lib.WordArray.create(reader.result);
					// var encrypted = AES.encrypt(reader.result, key).toString();

					console.info(encrypted, file);
					// @ts-ignore
					let fileRef = ref(currentUserRef, file.name);
					let snapshot = await uploadBytes(fileRef, encrypted);
					console.error('uploaded files', snapshot);

					// @ts-ignore
					// let file = e.target.files[0];
					// console.log(file);
					// let testRef = ref(rootRef, 'two');
					// let imageRef = ref(testRef, file.name);

					// @ts-ignore
					// let fileRef = ref(currentUserRef, file.name);
					// let snapshot = await uploadBytes(fileRef, file);
					// console.error('uploaded files', snapshot);
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
		name: 'About',
		callback: () => {
			console.log('about');
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
