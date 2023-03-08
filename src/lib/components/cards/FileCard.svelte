<script>
	// @ts-nocheck

	import { onRightMouseDown } from '$lib/contextMenuHelpers';
	import GoogleSpreadsheet from 'svelte-material-icons/GoogleSpreadsheet.svelte';

	export let title;
	export let imageURL = '/unnamed.png';
	export let icon = GoogleSpreadsheet;

	const iconProps = {
		size: 20,
		color: '#109d59'
	};
</script>

<div
	class="card column justify-start align-start"
	data-element-type="file"
	on:keypress={() => {}}
	on:mousedown|stopPropagation={(e) => {
		onRightMouseDown(e, 'file');
	}}
>
	<div class="card-title fluid-row justify-start" style:pointer-events="none">
		<div class="decor-line" />
		<div class=" icon-group column align-start">
			<div style:margin-left={'-2px'} style:margin-bottom={'-4px'}>
				<!-- <GoogleSpreadsheet size={20} color={'#109d59'} /> -->
				<svelte:component this={icon} {...iconProps} />
			</div>
			<div class="title">{title}</div>
		</div>
	</div>
	<div class="container image-container" style:pointer-events="none">
		<div class="container preview-image" style:--image-url="url('{imageURL}')" />
	</div>
</div>

<!-- https://lh3.google.com/u/0/d/1CqElTsxQmdUj8PueuGdZPWgNdmVtAwpRVtXs-4qj_WQ=w300-k-nu-iv6 -->
<style>
	.card {
		height: 100%;
		min-height: 190px;
		width: 100%;
		min-width: 180px;

		padding: 1.1rem 0rem 0rem 0rem;
		scroll-snap-align: start;

		border-radius: 8px;
		border: 1px solid rgb(234, 236, 238);
		background-color: #ffffff;
		box-shadow: 0px 1px 3px 1px rgba(184, 184, 184, 0.1);
		font-size: 13px;
		font-weight: 600;
	}
	.card-title {
		height: fit-content;
		gap: 1rem;
	}
	.title {
		color: rgb(60, 64, 67);
	}
	.icon-group {
		gap: 6px;
	}
	.decor-line {
		height: 100%;
		width: 3px;
		border-radius: 1rem;
		background-color: #109d59;
	}
	.image-container {
		padding: 1rem 1.2rem 0rem 1.2rem;
	}
	.preview-image {
		background-image: var(--image-url);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: top center;
		box-shadow: 0px 0px 3px 1px rgba(143, 143, 143, 0.2);
		border-radius: 4px 4px 0 0;
	}
</style>
