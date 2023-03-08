<script>
	// @ts-nocheck

	import '$lib/assets/style.css';

	import BellOutline from 'svelte-material-icons/BellOutline.svelte';
	import HelpCircleOutline from 'svelte-material-icons/HelpCircleOutline.svelte';
	import CogOutline from 'svelte-material-icons/CogOutline.svelte';
	import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import History from 'svelte-material-icons/History.svelte';
	import TrashCanOutline from 'svelte-material-icons/TrashCanOutline.svelte';
	import FolderOutline from 'svelte-material-icons/FolderOutline.svelte';
	import ShareVariantOutline from 'svelte-material-icons/ShareVariantOutline.svelte';

	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import InformationOutline from 'svelte-material-icons/InformationOutline.svelte';
	import ViewListOutline from '$lib/assets/ViewListOutline.svelte';

	import SearchField from '$lib/components/SearchField.svelte';
	import NewButton from '$lib/components/NewButton.svelte';
	import SidebarNavItem from '$lib/components/SidebarNavItem.svelte';
	import MenuItem from '$lib/components/ContextMenu/MenuItem.svelte';

	import { onRightMouseDown } from '$lib/contextMenuHelpers';
	import { browser } from '$app/environment';
	import { authHandlers, authStore, contextStore } from '$lib/stores.js';

	// import { globalHistory } from 'svelte-navigator/src/history';
	import { blur } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	let dummyFieldWidth = 0;

	let contextInfo = {};
	contextStore.subscribe((newValue) => {
		contextInfo = newValue;
	});

	onMount(() => {
		// unsub = globalHistory.listen(({ location, action }) => {
		// 	console.log(location, action);
		// 	currentPath.update(() => {
		// 		return location.pathname;
		// 	});
		// });
		window.addEventListener('mousemove', (e) => {
			window.currentMouseX = e.x;
			window.currentMouseY = e.y;
		});
	});

	onDestroy(() => {
		// unsub();
		if (browser) {
			window.removeEventListener('mousemove', (e) => {
				window.currentMouseX = e.x;
				window.currentMouseY = e.y;
			});
		}
	});

	function onPageClick(e) {
		let mainContent = document.getElementById('main-content');
		if (mainContent.contains(e.target)) {
			console.log('page');
			contextStore.update((oldValue) => {
				return { ...oldValue, showMenu: false };
			});
		}
	}
	// export let data;
	// console.log('app layout data', data);
</script>

<svelte:body on:click={onPageClick} on:contextmenu|preventDefault={() => {}} />

<!-- {$authStore.currentUser} -->
<!-- loading -->
{#if $authStore.currentUser === 'undefined' || $authStore.currentUser === null}
	loading
{:else}
	<div class="scaffold">
		<div class="fluid-column">
			<div class="navbar fluid-row">
				<div
					class="sidebar fluid-row justify-start"
					style:border-bottom={'none'}
					style:margin="-1rem 0"
				>
					<img src="/krono-ext.svg" alt="" height="50%" style:margin="auto auto" />
				</div>
				<div class="main-nav row justify-between">
					<SearchField bind:fieldWidth={dummyFieldWidth} />
					<div class="dummy-field" bind:clientWidth={dummyFieldWidth} />
					<div class="icons row">
						<div class="icons-row row">
							<BellOutline size={25} color={'#5F6368'} />
							<HelpCircleOutline size={25} color={'#5F6368'} />
							<CogOutline size={25} color={'#5F6368'} />
						</div>
						<div
							on:click={() => {
								authHandlers.logout();
								authStore.update(() => {
									return { currentUser: 'undefined' };
								});
								document.cookies = '';
							}}
							on:keypress={() => {}}
						>
							<AccountCircle size={25} color={'#5F6368'} />
						</div>
					</div>
				</div>
			</div>
			<div class="fluid-row">
				<div class="sidebar fluid-column">
					<div class="sidebar-content fluid-column justify-start align-start">
						<NewButton />
						<div class="side-nav-items justify-start column">
							<SidebarNavItem
								title={'Home'}
								linkTo={'/home'}
								icon={FolderOutline}
								dropdown={true}
							/>
							<SidebarNavItem
								title={'Shared'}
								linkTo={'/shared'}
								icon={ShareVariantOutline}
								dropdown={true}
							/>
							<SidebarNavItem title={'Starred'} linkTo={'/starred'} icon={StarOutline} />
							<SidebarNavItem title={'Recent'} linkTo={'/recent'} icon={History} />
							<SidebarNavItem title={'Trash'} linkTo={'/trash'} icon={TrashCanOutline} />
						</div>
					</div>
				</div>
				<div class="main-container fluid-column" style:overflow="hidden">
					<div class="sub-nav fluid-row">
						<div class="greeting row" style:gap={'1.8rem'}>
							<div class="icons-row row" style:gap={'2rem'}>
								<ArrowLeft size={25} color={'#5F6368'} />
								<ArrowRight size={25} color={'#5F6368'} />
							</div>
							{#if $authStore.currentUser?.displayName}
								<div>
									Good Morning, {$authStore.currentUser?.displayName?.split(' ')[0]}
								</div>
							{:else}
								<div>{window.location.pathname.split('/')[1]}</div>
							{/if}
						</div>
						<div class="icons-row row">
							<!-- <ViewModuleOutline size={24} color={'#5F6368'} /> -->
							<ViewListOutline />
							<InformationOutline size={24} color={'#5F6368'} />
						</div>
					</div>
					<div
						id="main-content"
						class="main-content fluid-column justify-start align-start"
						on:mousedown={(e) => {
							onRightMouseDown(e, 'default');
						}}
					>
						<slot />
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if $contextStore.showMenu}
		<div
			id="menu-element"
			class="context-menu"
			style="top:{$contextStore.pos.y}px; left:{$contextStore.pos.x}px;"
			transition:blur={{ duration: 100 }}
		>
			<div class="fluid-column">
				<!-- {console.log($contextStore.elementOptions)} -->
				{#each $contextStore.elementOptions as option}
					{#if option.name.startsWith('__')}
						<div
							class="divider"
							style:margin="0.4rem 0"
							style:width="92%"
							style:background-color="lightgray"
						/>
					{:else}
						<MenuItem optionData={option} />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
{/if}

<style>
	.navbar {
		/* min-height: 70px;
		max-height: 70px; */
		height: fit-content;
		width: 100%;
		gap: 1rem;
		/* overflow: unset; */
	}
	.navbar * {
		overflow: unset;
	}

	.sidebar {
		height: 100%;
		flex-basis: 250px;
		flex-grow: 0;
		flex-shrink: 0;
		overflow: visible;
		/* border-bottom: 1px solid #dadce0; */
	}
	.main-container {
		padding: 0rem 1rem 1rem 1rem;
	}
	.main-nav {
		width: 100%;
		height: 100%;
		padding: 1rem 4rem 1rem 0rem;
		border-bottom: 1px solid #dadce0;
	}
	.dummy-field {
		height: 100%;
		min-height: 3rem;
		margin-right: 2rem;

		width: 100%;
		min-width: 444px;
		max-width: 700px;
		pointer-events: none;
	}
	.icons {
		gap: 3rem;
	}
	.icons-row {
		gap: 1.5rem;
	}
	.sidebar-content {
		padding: 0rem 1rem 1rem 0rem;
		gap: 1rem;
	}
	.side-nav-items {
		gap: 4px;
		width: 100%;
		margin-top: 6px;
		/* padding-left: 1.6rem; */
	}
	.sub-nav * {
		overflow: hidden;
	}
	.sub-nav {
		height: fit-content;
		padding: 1.2rem 3rem;
	}
	.greeting {
		font-size: 18px;
	}

	.main-content {
		background-color: #f2f5f8;
		border-radius: 1rem;
		padding: 2rem 3rem 1rem 3rem;
		box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 4px 0px inset;
		overflow-y: scroll;
	}
	.context-menu {
		position: absolute;
		height: fit-content;
		width: 15.4rem;
		background-color: rgba(244, 244, 244, 0.3);
		backdrop-filter: blur(12px);
		border-radius: 1rem;
		border: 1px solid rgb(234, 236, 238);
		border: 1px solid lightgray;
		padding: 0.4rem;
	}
</style>
