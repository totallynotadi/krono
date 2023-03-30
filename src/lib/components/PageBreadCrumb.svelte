<script>
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	/**
	 * @type {any}
	 */
	export let title;
	/**
	 * @type {number | undefined}
	 */
	export let breadCrumbIndex;

	$: pageBreadCrumbs = get(page).url.pathname.split('/').slice(1);
	$: console.log('bread', pageBreadCrumbs);

	function handleClick() {
		console.log('bread', get(page).url.pathname.split('/').slice(1));
		let finalPagePath = get(page)
			.url.pathname.split('/')
			.slice(1)
			// @ts-ignore
			.slice(0, breadCrumbIndex + 1);
		goto(`/${finalPagePath.join('/')}`);
	}
</script>

<div class="row" style:gap="4px" on:click={handleClick} on:keypress={() => {}}>
	<div class="crumb">{title}</div>
	<ChevronRight size={24} color={'#adadad'} />
</div>

<style>
	.crumb {
		padding: 8px 16px;
		border-radius: 8px;
	}
	.crumb:hover {
		background-color: #e8ebed;
		/* background-color: #adadad; */
	}
</style>
