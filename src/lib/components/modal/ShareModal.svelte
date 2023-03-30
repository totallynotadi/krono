<script>
	import '$lib/assets/style.css';
	import { closeModal } from 'svelte-modals';
	import { blur } from 'svelte/transition';
	import CloseCircleOutline from 'svelte-material-icons/CloseCircleOutline.svelte';
	import CogOutline from 'svelte-material-icons/CogOutline.svelte';
	import LinkVariant from 'svelte-material-icons/LinkVariant.svelte';
	import Earth from 'svelte-material-icons/Earth.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	import { currentAuth } from '$lib/contextMenuHelpers';
	import { base } from '$app/paths';
	import toast, { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	// import { scale } from 'svelte/transition';

	// provided by <Modals />
	/**
	 * @type {any}
	 */
	export let isOpen;

	/**
	 * @type {String}
	 */
	export let fileName;
	export let blobURL;
	/**
	 * @type {String}
	 */
	export let fileType;
</script>

{#if isOpen}
	<div role="dialog" class="fluid-column modal" transition:blur={{ duration: 400 }}>
		<div class="fluid-column align-start">
			<div class="fluid-row">
				<div class="row" style:gap="0.8rem">
					<img
						src={`https://drive-thirdparty.googleusercontent.com/16/type/${fileType}`}
						alt=""
						width="20"
					/>
					<div class="title">{fileName}</div>
				</div>
				<div class="row" style:gap="6px">
					<IconButton icon={CogOutline} callback={closeModal} />
					<IconButton icon={CloseCircleOutline} />
				</div>
			</div>
			<div
				class="divider"
				style:margin="0.5rem 0 1.2rem 0"
				style:width="98%"
				style:background-color="lightgray"
			/>
			<div class="fluid-column note-box align-start" style:gap="1.8rem">
				<input type="text" name="" id="" placeholder="Add people to Share with" />
				<div class="column align-start" style:gap="1rem">
					<div style:font-weight="500">General Access</div>
					<div class="row" style:gap="0.8rem">
						<div class="icon-circle row justify-center">
							<Earth size={22} color={'#072711'} />
						</div>
						<div class="column align-start" style:gap="5px">
							<div style:font-size="14px" style:font-weight="500">Anyone with the link</div>
							<div style:font-size="12px" style:color="#737575">
								Anyone on the internet with the link can view
							</div>
						</div>
					</div>
				</div>
				<div class="fluid-row">
					<button
						on:click={async () => {
							console.log('lmao');
							await navigator.clipboard.writeText(
								`${get(page).url.origin}/shared/${currentAuth.uid}/${fileName}`
							);
							toast.success('Copied to Clipboard');
						}}
					>
						<div class="row" style:gap="0.4rem">
							<LinkVariant size={17} color="#1c72fe" />
							<div class="button-title">Copy Link</div>
						</div>
					</button>
					<button data-filled="true" on:click={closeModal}>Done</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		width: 40%;
		/* max-width: 1000px; */
		/* min-width: 600px; */
		height: max-content;

		background-color: #f2f5f8;
		border-radius: 0.4rem;

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto auto;

		display: flex;
		justify-content: center;
		align-items: center;

		padding: 1rem;
		/* allow click-through to backdrop */
		/* pointer-events: all; */
	}
	.title {
		font-size: 20px;
	}
	button {
		all: unset;
		border-radius: 4rem;
		box-shadow: 0 0 0 1px #1c72fe;
		padding: 0.6rem 1rem;
		font-size: 14px;

		transition: background-color 0.25s ease;
		margin-top: 6px;
	}
	.button-title {
		color: rgb(18, 93, 214);
		font-weight: 500;
	}
	button:hover {
		background-color: #e8ebed;
	}
	button:active {
		background-color: #e8f0fe;
	}
	.icon-circle {
		border-radius: 8rem;
		background-color: #c4eed0;
		width: 36px;
		height: 36px;
	}
	input {
		/* all: unset; */
		border: none;
		width: 98%;
		height: 3rem;
		border-radius: 0.4rem;
		padding: 0 1rem;
		background-color: transparent;
		box-shadow: 0 0 0 2px inset rgb(11, 87, 208);
	}
	button[data-filled='true'] {
		background-color: rgb(11, 87, 208);
		color: white;
		box-shadow: none;
		padding: 0.6rem 1.2rem;
	}
</style>
