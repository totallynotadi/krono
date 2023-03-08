// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyB0vB8KpnGgl0HLQVzazQLmHZZYYQ06R30',
	authDomain: 'cpp-test-3d716.firebaseapp.com',
	projectId: 'cpp-test-3d716',
	storageBucket: 'cpp-test-3d716.appspot.com',
	messagingSenderId: '581097068014',
	appId: '1:581097068014:web:3ce76e337e63afd0406aff',
	measurementId: 'G-7YYV242SYE'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const persistAuth = async () => {
	await setPersistence(auth, browserLocalPersistence);
};
persistAuth();

export const db = getFirestore(app);
export const storage = getStorage(app, 'gs://cpp-test-3d716.appspot.com');
export const rootRef = ref(storage);

// onAuthStateChanged(auth, (user) => {
// 	console.log('on authStateChanged lmao', user);
// 	console.log('new currentUser', auth.currentUser);
// 	if (user) {
// 		// @ts-ignore
// 		authStore.update((user) => {
// 			return { currentUser: user.currentUser };
// 		});
// 		// goto('/home');
// 	} else {
// 		// @ts-ignore
// 		authStore.update(() => {
// 			return { currentUser: null };
// 		});
// 		redirect(301, '/login');
// 	}
// });
