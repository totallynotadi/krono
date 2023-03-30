<script>
	// @ts-nocheck

	import Folder from 'svelte-material-icons/Folder.svelte';
	import { onRightMouseDown } from '$lib/contextMenuHelpers';
	import { goto } from '$app/navigation';

	export let folderName = 'default';
</script>

<div
	class="card row justify-start"
	data-element-type="folder"
	on:keypress={() => {}}
	on:contextmenu|stopPropagation|preventDefault={(e) => {
		if (e.button == 2) {
			onRightMouseDown(e, 'folder');
		}
	}}
	on:dblclick={() => {
		goto(`${window.location.pathname}/${folderName}`);
		// window.location.href = `${window.location.pathname}/${folderName}`;
		// window.location.reload(	);
	}}
>
	<Folder size={22} color={'#5F6368'} />
	<div class="title">{decodeURIComponent(folderName)}</div>
</div>

<style>
	.card {
		/* width: 190px; */
		width: 100%;
		min-width: 190px;
		height: 54px;
		gap: 0.6rem;

		font-size: 13px;
		font-weight: 600;

		padding: 0.8rem 0 0.8rem 1rem;
		border: 1px solid rgb(234, 236, 238);
		/* border: 1px solid #dadce0; */
		border-radius: 8px;
		transition: all 0.2s ease;
		background-color: #ffffff;
		box-shadow: 0px 1px 3px 1px rgba(184, 184, 184, 0.1);
		scroll-snap-align: start;
	}
	.card:hover {
		background-color: #f5f5f5;
	}
	.card:active {
		background-color: #e8f0fe;
	}
	.title {
		color: rgb(60, 64, 67);
		margin-right: auto;
		pointer-events: none;
	}
</style>
