<script>
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import { fade, slide } from 'svelte/transition';

	export let fieldWidth = 0;

	let searchFieldExpanded = false;
</script>

<div class="column search-field" style="--field-width:{fieldWidth}px">
	<div class="fluid-row" style:gap="1rem">
		<Magnify size={26} color={'#5F6368'} />
		<input
			type="text"
			id="search-field"
			placeholder="Press Ctrl+S to search Krono"
			on:focusin={() => {
				console.log('focus in');
				searchFieldExpanded = !searchFieldExpanded;
			}}
			on:focusout={() => {
				console.log('focus out');
				searchFieldExpanded = !searchFieldExpanded;
			}}
		/>
		{#if searchFieldExpanded}
			<div in:fade>X</div>
		{/if}
	</div>

	{#if searchFieldExpanded}
		<div class="suggestions" in:slide>
			<div>X</div>
			<div>C</div>
			<div>C</div>
			<div>C</div>
			<div>C</div>
		</div>
	{/if}
</div>

<style>
	.search-field {
		position: absolute;
		top: 8px;

		height: fit-content;
		min-height: 3rem;
		width: 100%;
		width: var(--field-width);
		max-width: 700px;

		border-radius: 8rem;
		border-radius: 2rem;

		background-color: transparent;
		gap: 1rem;
		padding: 0 2rem 0 3rem;
		padding: 1rem 2rem 1rem 3rem;
	}
	.search-field:focus-within {
		background-color: #f2f5f8;

		background-color: rgba(244, 244, 244, 0.3);
		backdrop-filter: blur(12px);
		border: 1px solid lightgray;
		z-index: 100;

		box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 4px 0px inset;
		padding: 1rem 2rem 1rem 1.6rem;
	}
	#search-field {
		appearance: none;
		border: none;
		outline: none;
		background-color: transparent;

		margin-bottom: 4px;
		height: 100%;
		width: 100%;
		font-size: 14px;
	}
</style>
