// import { redirect } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';

// import { goto } from '$app/navigation';

// @ts-ignore
export async function handle({ event, resolve }) {
	let userHasLoggedIn = event.cookies.get('userIsLoggedIn');
	if (userHasLoggedIn) {
		redirect(301, '/home');
	}
	// if (event.url.pathname.startsWith('/home') || event.url.pathname === '/') {
	// 	throw redirect(303, '/login');
	// }

	const response = await resolve(event);
	return response;
}
