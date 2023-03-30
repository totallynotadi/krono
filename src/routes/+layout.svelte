<script>
	import { onMount, onDestroy } from 'svelte';
	import { auth, rootRef } from '$lib/firebase.client';
	import { browser } from '$app/environment';
	import { authStore, refStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { ref } from 'firebase/storage';

	onDestroy(() => {
		authStore.update(() => {
			return { currentUser: 'undefined' };
		});
	});

	onMount(() => {
		// alert('inside onMount');
		console.log('initial user state', auth.currentUser);
		auth.onAuthStateChanged((user) => {
			console.log('loll', user, auth.currentUser);

			// @ts-ignore
			authStore.update(() => {
				if (user) {
					// @ts-ignore
					let userRef = ref(rootRef, auth.currentUser.uid);
					refStore.update((oldValue) => {
						return { ...oldValue, userRef: userRef };
					});
				}
				// alert(`new current user ${user ? 'not null' : user}`);
				return { currentUser: auth.currentUser };
			});

			if (browser) {
				if (user === null || !user) {
					if (
						!$authStore?.currentUser &&
						['home', 'shared', 'starred', 'recent', 'trash'].includes(
							window.location.pathname.split('/')[1]
						)
					) {
						// alert('logged out user redirecting to homepage');
						goto('/');
						console.log('store info', $authStore.currentUser);
					}
				} else if (
					!['home', 'shared', 'starred', 'recent', 'trash'].includes(
						window.location.pathname.split('/')[1]
					)
				) {
					goto('/home');
				}
			}
		});
	});
</script>

<slot />
