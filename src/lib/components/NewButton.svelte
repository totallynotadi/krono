<script>
	// import Plus from '../assets/Plus.svelte';
	import PlusDark from '../assets/PlusDark.svelte';
	// import Plus from 'svelte-material-icons/Plus.svelte';

	import { showUploadContextMenu } from '$lib/contextMenuHelpers';
</script>

<div
	class="button-container"
	on:mousedown={(e) => {
		console.log(e);
		showUploadContextMenu(e);
	}}
>
	<button class="row justify-center" style:gap={'0.5rem'} style:pointer-events="none">
		<PlusDark />
		<div class="title">New</div>
	</button>
</div>

<style>
	.button-container {
		width: 100%;
		padding-left: 1.6rem;
	}
	button {
		appearance: none;
		outline: none;
		border: none;

		width: 100%;
		height: 4.2rem;

		border: 1px solid #dadce0;
		border-radius: 1rem;
		background-color: #f2f5f8;
		transition: all 0.15s linear 0s;
		/* margin-left: 2rem; */
	}
	.title {
		font-size: 16px;
		font-weight: 500;
		color: #a6a8aa;
		color: #3c4043;
	}
	button:hover {
		background-color: #ebeff3;
	}
	button:active {
		box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 10px 1px;
	}
</style>
