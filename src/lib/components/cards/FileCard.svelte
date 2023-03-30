<script>
	// @ts-nocheck

	import { onRightMouseDown } from '$lib/contextMenuHelpers';
	import { prominent, average } from 'color.js';

	import Modal from '$lib/components/modal/Modal.svelte';
	import { openModal } from 'svelte-modals';
	import { onMount } from 'svelte';
	import { ref } from 'firebase/storage';
	import WordViewerModal from '../modal/WordViewerModal.svelte';
	import VideoModal from '../modal/VideoModal.svelte';

	export let title = 'default';
	export let imageURL = '/unnamed.png';
	export let fileType = 'image/jpeg';

	let iconImage;
	// let color;
	let decorColor;

	// onMount(async () => {
	// 	// iconImage = document.getElementById('decor-image');
	// 	// console.log(iconImage);
	// 	// decorColor = await get_average_rgb(iconImage);
	// 	// // decorColor = `rgb(${decorColor[0][0]}, ${decorColor[0][1]}, ${decorColor[0][2]})`;
	// 	// console.log(decorColor);
	// 	// console.log('fileType', fileType);
	// });

	// const getColor = async () => {
	// 	if (browser) {
	// 		decorColor = await prominent(iconImage);
	// 		decorColor = `rgb(${decorColor[0][0]}, ${decorColor[0][1]}, ${decorColor[0][2]})`;
	// 		console.log(decorColor);
	// 	} else {
	// 		decorColor = 'rgb(0, 0, 255)';
	// 	}
	// 	return decorColor;
	// };
</script>

<!-- {#await getColor() then color} -->
<div
	class="card column justify-start align-start"
	data-element-type="file"
	on:keypress={() => {}}
	on:contextmenu|stopPropagation|preventDefault={(e) => {
		e.details = { fileName: title, blobURL: imageURL };
		onRightMouseDown(e, 'file');
	}}
	on:click={(e) => {
		if (e.button == '0') {
			if (fileType.startsWith('image')) {
				openModal(Modal, { imageThumbnailURL: imageURL, fileName: title });
			} else if (
				fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			) {
				openModal(WordViewerModal, { fileName: title, blobURL: imageURL });
			} else if (fileType.startsWith('video')) {
				console.log('video');
				openModal(VideoModal, { fileName: title, blobURL: imageURL });
			}
		}
	}}
>
	<div class="card-title fluid-row justify-start" style:pointer-events="none">
		<div class="decor-line" style:--decor-color={decorColor} />
		<div class=" icon-group column align-start">
			<div style:margin-left={'-2px'} style:margin-bottom={'-4px'}>
				<!-- <GoogleSpreadsheet size={20} color={'#109d59'} /> -->
				<!-- <svelte:component this={icon} {...iconProps} /> -->
				<!-- <div
						class="img"
						style:--image-src={`url(https://drive-thirdparty.googleusercontent.com/16/type/${fileType})`}
					/> -->
				<img
					src={`https://drive-thirdparty.googleusercontent.com/16/type/${fileType}`}
					alt="lmao"
					height="16"
					id="decor-image"
					style:border-radius="2px"
					style:margin-left="2px"
				/>
			</div>
			<div class="title">{title}</div>
		</div>
	</div>
	<div class="container image-container" style:pointer-events="none">
		<div class="container preview-image" style:--image-url="url('{imageURL}')" />
	</div>
</div>
<!-- {/await} -->

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
		gap: 10px;
	}
	.decor-line {
		height: 100%;
		width: 3px;
		border-radius: 1rem;
		background-color: #109d59;
		background-color: var(--decor-color);
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
	.img {
		height: 16px;
		width: 16px;
		background-image: var(--image-src);
	}
</style>
