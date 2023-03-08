// // @ts-nocheck
// // @ts-ignore
// import { browser } from '$app/environment';
// import { goto } from '$app/navigation';
// import { authStore } from '$lib/stores';
// // import { redirect } from '@sveltejs/kit';

// export function load() {
// 	let currentAuth;
// 	authStore.subscribe((newAuth) => {
// 		currentAuth = newAuth;
// 	});
// 	console.log('currentAuth', currentAuth);
// 	if (!currentAuth.currentUser) {
// 		if (browser) {
// 			goto('/login');
// 		}
// 	}
// }
