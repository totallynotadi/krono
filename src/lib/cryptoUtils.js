/* eslint-disable no-prototype-builtins */
// @ts-ignore
// import { AES } from 'crypto-js';

export function getBlobURL(blob) {
	return URL.createObjectURL(blob);
}

// @ts-ignore
function readfile(file) {
	// @ts-ignore
	// @ts-ignore
	return new Promise((resolve) => {
		var fr = new FileReader();
		fr.onload = () => {
			resolve(fr.result);
		};
		fr.readAsArrayBuffer(file);
	});
}

/**
 * @param {Blob} file
 * @param {string} passKey
 */
export async function encrypt(file, passKey) {
	// // var file = input.files[0];
	// var reader = new FileReader();
	// reader.onload = () => {
	// 	// @ts-ignore
	// 	// var wordArray = lib.WordArray.create(reader.result);
	// 	var encrypted = AES.encrypt(reader.result, key).toString();

	// 	var fileEnc = new Blob([encrypted]);

	// 	return fileEnc;

	// 	// var a = document.createElement('a');
	// 	// var url = window.URL.createObjectURL(fileEnc);
	// 	// var filename = file.name + '.enc';
	// 	// a.href = url;
	// 	// a.download = filename;
	// 	// a.click();
	// 	// window.URL.revokeObjectURL(url);
	// };
	// reader.readAsText(file);
	var plaintextbytes = await readfile(file);
	// @ts-ignore
	plaintextbytes = new Uint8Array(plaintextbytes);

	var pbkdf2iterations = 10000;
	// @ts-ignore
	var passphrasebytes = new TextEncoder('utf-8').encode(passKey);
	var pbkdf2salt = window.crypto.getRandomValues(new Uint8Array(8));

	var passphrasekey = await window.crypto.subtle
		.importKey('raw', passphrasebytes, { name: 'PBKDF2' }, false, ['deriveBits'])
		.catch(function (err) {
			console.error(err);
		});
	console.log('passphrasekey imported');

	var pbkdf2bytes = await window.crypto.subtle
		.deriveBits(
			{ name: 'PBKDF2', salt: pbkdf2salt, iterations: pbkdf2iterations, hash: 'SHA-256' },
			// @ts-ignore
			passphrasekey,
			384
		)
		.catch(function (err) {
			console.error(err);
		});
	console.log('pbkdf2bytes derived');
	// @ts-ignore
	pbkdf2bytes = new Uint8Array(pbkdf2bytes);

	// @ts-ignore
	let keybytes = pbkdf2bytes.slice(0, 32);
	// @ts-ignore
	let ivbytes = pbkdf2bytes.slice(32);

	// @ts-ignore
	var key = await window.crypto.subtle
		.importKey('raw', keybytes, { name: 'AES-CBC', length: 256 }, false, ['encrypt'])
		.catch(function (err) {
			console.error(err);
		});
	console.log('key imported');

	// @ts-ignore
	var cipherbytes = await window.crypto.subtle
		// @ts-ignore
		.encrypt({ name: 'AES-CBC', iv: ivbytes }, key, plaintextbytes)
		.catch(function (err) {
			console.error(err);
		});

	console.log('plaintext encrypted');
	// @ts-ignore
	cipherbytes = new Uint8Array(cipherbytes);

	// @ts-ignore
	var resultbytes = new Uint8Array(cipherbytes.length + 16);
	// @ts-ignore
	resultbytes.set(new TextEncoder('utf-8').encode('Salted__'));
	resultbytes.set(pbkdf2salt, 8);
	// @ts-ignore
	resultbytes.set(cipherbytes, 16);

	var blob = new Blob([resultbytes], { type: 'image/jpeg' });
	// @ts-ignore
	// @ts-ignore
	var blobUrl = URL.createObjectURL(blob);
	console.info('encrypted blob', blob, blobUrl);
	return blob;
}

/**
 * @param {Blob} file
 * @param {string} passKey
 */
export async function decrypt(file, passKey) {
	// var reader = new FileReader();
	// reader.onload = () => {
	// 	// @ts-ignore
	// 	var decryptedBytes = AES.decrypt(reader.result, key);
	// 	var decryptedData = decryptedBytes.toString();
	// 	// @ts-ignore
	// 	// var typedArray = Uint8Array.from(decrypted.words);
	// 	// var typedArray = convertWordArrayToUint8Array(decrypted);

	// 	var fileDec = new Blob([decryptedData]);
	// 	// var fileDec = new Blob([decrypted]);
	// 	console.error(fileDec);
	// 	return fileDec;
	// 	// var a = document.createElement('a');
	// 	// var url = window.URL.createObjectURL(fileDec);
	// 	// var filename = file.name.substr(0, file.name.length - 4) + '.dec';
	// 	// a.href = url;
	// 	// a.download = filename;
	// 	// a.click();
	// 	// window.URL.revokeObjectURL(url);
	// };
	// reader.readAsText(file);

	var cipherbytes = await readfile(file);

	cipherbytes = new Uint8Array(cipherbytes);

	var pbkdf2iterations = 10000;
	// @ts-ignore
	var passphrasebytes = new TextEncoder('utf-8').encode(passKey);
	var pbkdf2salt = cipherbytes.slice(8, 16);

	var passphrasekey = await window.crypto.subtle
		.importKey('raw', passphrasebytes, { name: 'PBKDF2' }, false, ['deriveBits'])
		.catch(function (err) {
			console.error(err);
		});
	console.log('passphrasekey imported');

	var pbkdf2bytes = await window.crypto.subtle
		.deriveBits(
			{ name: 'PBKDF2', salt: pbkdf2salt, iterations: pbkdf2iterations, hash: 'SHA-256' },
			// @ts-ignore
			passphrasekey,
			384
		)
		.catch(function (err) {
			console.error(err);
		});
	console.log('pbkdf2bytes derived');
	// @ts-ignore
	pbkdf2bytes = new Uint8Array(pbkdf2bytes);

	let keybytes = pbkdf2bytes.slice(0, 32);
	let ivbytes = pbkdf2bytes.slice(32);
	cipherbytes = cipherbytes.slice(16);

	var key = await window.crypto.subtle
		.importKey('raw', keybytes, { name: 'AES-CBC', length: 256 }, false, ['decrypt'])
		.catch(function (err) {
			console.error(err);
		});
	console.log('key imported');

	var plaintextbytes = await window.crypto.subtle
		// @ts-ignore
		.decrypt({ name: 'AES-CBC', iv: ivbytes }, key, cipherbytes)
		.catch(function (err) {
			console.error(err);
		});

	console.log('ciphertext decrypted');
	// @ts-ignore
	plaintextbytes = new Uint8Array(plaintextbytes);

	var blob = new Blob([plaintextbytes], { type: 'image/jpeg' });
	var blobUrl = URL.createObjectURL(blob);
	console.info('decrypted blob', blob, blobUrl);
	return blob;
}
