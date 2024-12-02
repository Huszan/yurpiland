import CryptoJS from "crypto-js";

export function encrypt(data, key) {
    const cipher = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        key ? key : process.env.VITE_API_ENCRYPT_KEY
    ).toString();
    return cipher;
}

export function decrypt(cipher, key) {
    const bytes = CryptoJS.AES.decrypt(
        cipher,
        key ? key : process.env.VITE_API_ENCRYPT_KEY
    );
    try {
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    } catch (e) {
        return null;
    }
}
