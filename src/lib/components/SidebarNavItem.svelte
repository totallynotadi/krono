<script>
	// @ts-nocheck

	import { page } from '$app/stores';

	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import GoogleDrive from 'svelte-material-icons/GoogleDrive.svelte';

	export let title = '';
	export let linkTo = '';
	export let icon = GoogleDrive;
	export let dropdown = false;

	$: active = $page.url.pathname.split('/')[1] === linkTo.split('/')[1];
	$: color = active ? '#4486f4' : '#5F6368';
	$: props = {
		size: 22,
		color: color
	};
</script>

<div class="button fluid-row justify-start" class:active>
	<a href={linkTo} class="fluid-row justify-start" style="gap:4px">
		<div class="button-content" style:visibility={dropdown ? 'visible' : 'hidden'}>
			<ChevronRight size={18} viewBox={'0 0 24 20'} {color} />
		</div>
		<div class="row" style:gap={'1rem'}>
			<svelte:component this={icon} {...props} />
			<div class="title" style:color={active ? '#4486f4' : 'inherit'}>
				{title}
			</div>
		</div>
	</a>
</div>

<style>
	.button {
		width: 100%;
		height: 52px;

		gap: 6px;
		border-radius: 0 1rem 1rem 0;
		/* border-radius: 1rem; */
		padding: 0 28px;
		transition: all 0.1s linear 0s;
	}
	.button-content {
		margin-left: 4px;
	}
	.active {
		fill: #4486f4 !important;
		color: #4486f4 !important;
		background-color: #e3edfd !important;
	}
	.title {
		font-size: 14px;
		font-weight: 500;
	}
	.button:hover {
		background-color: #f5f5f5;
	}
</style>
