import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from './firebase.client';
import { browser } from '$app/environment';

export const pageRerenderNotifier = writable(null);

export const authStore = writable({
	currentUser: 'undefined'
});

export const contextStore = writable({
	showMenu: false,
	pos: { x: 0, y: 0 },
	type: null,
	elementOptions: [],
	eventDetails: {}
});

export const refStore = writable({ userRef: {} });

export const authHandlers = {
	login: async (/** @type {string} */ email, /** @type {string} */ password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signup: async (/** @type {string} */ email, /** @type {string} */ password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
		if (browser) {
			// alert('logged out');
		}
	},
	resetPassword: async (/** @type {string} */ email) => {
		console.log('WE ARE HERE', email);
		if (!email) {
			console.log('inHERE');
			return;
		}
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (/** @type {string} */ email) => {
		// @ts-ignore
		authStore.update((/** @type {{ currentUser: any; }} */ curr) => {
			return {
				...curr,
				currentUser: {
					...curr.currentUser,
					email: email
				}
			};
		});
		// @ts-ignore
		await updateEmail(auth.currentUser, email);
	},
	updatePassword: async (/** @type {string} */ password) => {
		// @ts-ignore
		await updatePassword(auth.currentUser, password);
	}
};

export const contentStore = writable({})
