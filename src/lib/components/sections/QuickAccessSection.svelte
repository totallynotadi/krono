<script>
	import FileCard from '$lib/components/cards/FileCard.svelte';
	import FolderCard from '$lib/components/cards/FolderCard.svelte';
	// import ModalBackdrop from '../ModalBackdrop.svelte';
</script>

<section class="fluid-column align-start" style:gap={'1rem'}>
	<div class="title">Quick Access</div>
	<div class="items-listing fluid-row justify-start">
		<div class="folder-container fluid-column justify-start">
			<FolderCard />
			<FolderCard />
			<FolderCard />
		</div>
		<div class="folder-container fluid-column justify-start">
			<FolderCard />
			<FolderCard />
			<FolderCard />
		</div>
		<FileCard />
		<FileCard />
		<div class="folder-container fluid-column justify-start">
			<FolderCard />
			<FolderCard />
			<FolderCard />
		</div>
		<FileCard />
		<FileCard />
		<FileCard />
		<FileCard />
		<FileCard />
		<FileCard />
		<FileCard />
	</div>
</section>

<style>
	section {
		height: fit-content;
		width: 100%;
	}
	.title {
		margin-left: 2rem;
		color: rgb(60, 64, 67);
		font-weight: 500;
	}
	.folder-container {
		width: fit-content;
		gap: 0.8rem;
	}
	.items-listing {
		overflow: scroll;
		gap: 0.8rem;
		-webkit-mask-image: linear-gradient(to right, black 99%, transparent);
		mask-image: linear-gradient(to right, rgb(0, 0, 0) 99%, transparent);
		scroll-snap-type: x mandatory;
	}
</style>
