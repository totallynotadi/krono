<script>
	// @ts-nocheck

	import { Modals, closeModal } from 'svelte-modals';
	import { blur } from 'svelte/transition';
</script>

<Modals>
	<div
		slot="backdrop"
		class="backdrop"
		on:click={closeModal}
		on:keypress={() => {}}
		in:blur={{ duration: 400 }}
		out:blur={{ duration: 400 }}
	/>
</Modals>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);

		display: flex;
		justify-content: center;
		align-items: center;

		pointer-events: all;
	}
</style>
