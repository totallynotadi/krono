<script>
	// @ts-nocheck
	import '$lib/assets/style.css';
	import { goto } from '$app/navigation';

	import Google from '$lib/assets/Google.svelte';
	import { authStore } from '$lib/stores';
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	async function signInWithGoogle() {
		let user = await signInWithPopup(auth, new GoogleAuthProvider());
		// @ts-ignore
		authStore.update(() => {
			return { currentUser: user };
		});
	}

	async function emailPassSignIn() {
		let user = await signInWithEmailAndPassword(auth, email, password);
		// @ts-ignore
		authStore.update(() => {
			return { currentUser: user };
		});
		goto('/home');
	}

	let email;
	let password;
</script>

<!-- {$authStore.currentUser} -->
{#if $authStore.currentUser === undefined || $authStore.currentUser === null}
	<div class="scaffold">
		<div class="fluid-row">
			<div class="img-container row justify-end align-end">
				<!-- <div>lmao</div> -->
				<img class="image" src="/login.jpg" alt="" />
			</div>
			<div class="container column justify-center align-center">
				<div class="input-container column align-start" style:gap={'36px'}>
					<div class="title">Sign in to Krono</div>
					<div class="google-card row" on:click={signInWithGoogle} on:keydown={() => {}}>
						<Google />
						<div class="card-title">Sign in with Google</div>
					</div>
					<div class="fluid-row" style:gap={'1rem'}>
						<div class="divider" />
						<div style:color={'grey'} style:font-size={'14px'}>OR</div>
						<div class="divider" />
					</div>
					<div class="fluid-column" style:gap={'2rem'}>
						<div class="fieldset fluid-column align-start">
							<label for="login">Email address</label>
							<input name="login" type="text" class="input-field" bind:value={email} />
						</div>
						<div class="fieldset fluid-column align-start">
							<label for="password">Password</label>
							<input name="password" type="password" class="input-field" bind:value={password} />
							<div class="fluid-row" style:margin-top={'1rem'} style:height={'fit-content'}>
								<button class="filled-button" on:click={emailPassSignIn}>Sign In</button>
								<button class="outline-button"> Sign Up</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<!-- loading
	{JSON.stringify($authStore.currentUser)}} -->
{/if}

<style>
	.image {
		margin: auto auto;
		width: 100%;
	}
	.img-container {
		/* outline: 1px solid black; */
		/* width: 100%;
		height: 100%; */
		flex-basis: 60rem;
		flex-shrink: 1;
		flex-grow: 1;
		margin: 0 -2rem 0 6rem;
	}
	.input-field {
		border: none;
		outline: none;
		height: 40px;
		width: 100%;
		border-radius: 8px;
		background-color: #f3f3f4;
		transition: all 0.15s ease;
		padding: 0 16px;
	}
	.input-field:hover {
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: #fff;
		-webkit-box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1);
		box-shadow: 0 0 0 4px rgba(234, 76, 137, 0.1);
	}
	.input-container {
		padding: 30px 60px 0;
		width: 100%;
		max-width: 500px;
	}
	.fieldset {
		gap: 6px;
		font-size: 16px;
		font-weight: bold;
	}
	label {
		margin-left: 2px;
		font-size: 14px;
	}
	.title {
		font-size: 26px;
		font-weight: bold;
	}
	.google-card {
		width: fit-content;
		background-color: #1a73e8;
		background-color: #1187e0;
		padding: 2px;
		border-radius: 6px;
		/* gap: 0.8rem; */
	}
	.card-title {
		color: white;
		padding: 0 4rem;
		font-size: 14px;
		letter-spacing: 0.25px;
		font-weight: 600;
	}
	.filled-button {
		all: unset;
		background-color: #1187e0;
		border-radius: 10px;
		color: #fff;
		padding: 0.8rem 5rem;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.25px;
	}
	.filled-button:hover {
		background-color: #2f91db;
	}
	.filled-button:active {
		background-color: #0f83db;
	}
	.outline-button {
		border: none;
		width: 8rem;
		box-shadow: inset 0px 0px 0px 2px #1187e0;
		padding: 0.8rem 0;
		background-color: transparent;
		border-radius: 10px;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.25px;
		color: #1187e0;
	}
</style>
