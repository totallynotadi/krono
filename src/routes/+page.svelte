<script>
	import { authStore } from '$lib/stores';
	import '$lib/assets/style.css';
	import { goto } from '$app/navigation';
</script>

<!-- {$authStore.currentUser} -->
{#if $authStore.currentUser === undefined || $authStore.currentUser === null}
	<div class="scaffold ">
		<div class="fluid-column justify-center" style:gap="1rem">
			<div>LANDING PAGE</div>
			<button
				class="filled-button"
				on:keypress={() => {}}
				on:click={() => {
					goto('/login');
				}}>LOGIN</button
			>
		</div>
	</div>
{:else}
	loading
{/if}
