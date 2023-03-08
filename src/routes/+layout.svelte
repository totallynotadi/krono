<script>
	import { onMount, onDestroy } from 'svelte';
	import { auth } from '$lib/firebase.client';
	import { browser } from '$app/environment';
	import { authStore } from '$lib/stores';
	import { goto } from '$app/navigation';

	onDestroy(() => {
		authStore.update(() => {
			return { currentUser: 'undefined' };
		});
	});

	onMount(() => {
		// alert('inside onMount');
		console.log('initial user state', auth.currentUser);
		auth.onAuthStateChanged((user) => {
			console.log('loll', user);

			// @ts-ignore
			authStore.update(() => {
				// alert(`new current user ${user ? 'not null' : user}`);
				return { currentUser: user };
			});

			if (user === null) {
				if (browser) {
					if (!$authStore?.currentUser && window.location.pathname === '/home') {
						// alert('logged out user redirecting to homepage');
						goto('/');
						console.log('store info', $authStore.currentUser);
					}
				}
			} else {
				goto('/home');
			}
		});
	});
</script>

<slot />
