// encrypt and decrypt the key in the d1 database
const AesKeyAlgorithm = { name: 'AES-GCM' };
const AesGcmParams = { name: 'AES-GCM' };

function uint8ArrayToBase64(uint8Array) {
	const binaryString = String.fromCharCode(...uint8Array);
	return btoa(binaryString); // Encode binary string as Base64
}

function base64ToUint8Array(base64) {
	const binaryString = atob(base64); // Decode Base64 to binary string
	const uint8Array = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		uint8Array[i] = binaryString.charCodeAt(i);
	}
	return uint8Array;
}

async function encrypt({ data, keyB64 }) {
	const encodedKey = base64ToUint8Array(keyB64);

	const cryptoKey = await crypto.subtle.importKey('raw', encodedKey, AesKeyAlgorithm, false, ['encrypt']);

	const iv = crypto.getRandomValues(new Uint8Array(12));
	const dataEncoder = new TextEncoder();
	const encodedData = dataEncoder.encode(data);
	const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, encodedData);

	const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength);
	combined.set(iv);
	combined.set(new Uint8Array(ciphertext), iv.byteLength);

	// Convert to Base64 for easier storage
	const base64Combined = btoa(String.fromCharCode(...combined));
	return base64Combined;
}

async function decrypt({ base64Combined, key }) {
	const combined = Uint8Array.from(atob(base64Combined), (c) => c.charCodeAt(0));

	const encodedKey = base64ToUint8Array(key);

	// Extract IV and ciphertext
	const iv = combined.slice(0, 12); // Assuming IV is 12 bytes
	const ciphertext = combined.slice(12);

	const cryptoKey = await crypto.subtle.importKey('raw', encodedKey, 'AES-GCM', false, ['decrypt']);
	const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, ciphertext);
	const decoder = new TextDecoder();

	return decoder.decode(decrypted);
}

export { encrypt, decrypt };
