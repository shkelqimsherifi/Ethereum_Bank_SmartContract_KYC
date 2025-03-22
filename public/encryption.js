
const algorithm = { name: 'AES-CBC', length: 256 };

async function generateKey() {
    return await crypto.subtle.generateKey(algorithm, true, ['encrypt', 'decrypt']);
}

const keyPromise = generateKey();

export const encrypt = async (text) => {
    const key = await keyPromise;
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encodedText = new TextEncoder().encode(text);
    const encrypted = await crypto.subtle.encrypt({ ...algorithm, iv }, key, encodedText);
    return { iv: Array.from(iv), encryptedData: Array.from(new Uint8Array(encrypted)) };
};

export const decrypt = async (encryption) => {
    const key = await keyPromise;
    const iv = new Uint8Array(encryption.iv);
    const encryptedData = new Uint8Array(encryption.encryptedData);
    const decrypted = await crypto.subtle.decrypt({ ...algorithm, iv }, key, encryptedData);
    return new TextDecoder().decode(decrypted);
};
