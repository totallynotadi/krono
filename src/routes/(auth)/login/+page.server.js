import { authStore } from '$lib/stores';
import { get } from 'svelte/store';

// @ts-ignore
export async function load() {
	// console.log('login load cookies:', cookies.get('userIsLoggedIn'));
	console.log('form login load', get(authStore));

	// console.log('login load');
}
