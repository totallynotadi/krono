<script>
	import FileCard from '$lib/components//cards/FileCard.svelte';

	/**
	 * @type {any[]}
	 */
	export let userFiles = [];
	export let sectionTitle = 'Files';
</script>

<section class="fluid-column align-start justify-start" style:height="fit-content">
	<div class="title">{sectionTitle}</div>
	<div class="content-grid">
		{#each userFiles as file}
			<FileCard title={file.filename} imageURL={file.blobURL} fileType={file.fileType} />
		{/each}
		<FileCard title={'untitled-01.jpg'} />
		<FileCard title={'untitled-01.jpg'} />
		<FileCard title={'untitled-01.jpg'} />
		<!-- <FileCard title={'untitled-01.jpg'} />
		<FileCard title={'untitled-01.jpg'} />
		<FileCard title={'untitled-01.jpg'} />
		<FileCard title={'untitled-01.jpg'} />
		<FileCard title={'untitled-01.jpg'} /> -->
	</div>
</section>

<style>
	.title {
		margin-bottom: 1rem;
		margin-left: 2rem;
		color: rgb(60, 64, 67);
		font-weight: 500;
	}
	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		width: 100%;
		height: fit-content;

		gap: 1rem;
	}
</style>
