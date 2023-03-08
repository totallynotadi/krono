<script>
	import { authStore } from '$lib/stores';
</script>

<!-- {$authStore.currentUser} -->
{#if $authStore.currentUser === undefined || $authStore.currentUser === null}
	lol
{:else}
	loading
{/if}
