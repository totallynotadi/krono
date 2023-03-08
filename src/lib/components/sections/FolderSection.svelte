<script>
	import FolderCard from '$lib/components/cards/FolderCard.svelte';
</script>

<section class="fluid-column align-start justify-start">
	<div class="title">Folders</div>
	<div class="content-grid">
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
		<FolderCard />
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
