import CryptoJS from "crypto-js";

export function encrypt(data: unknown, key?: string) {
    const cipher = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        key ? key : import.meta.env.VITE_API_ENCRYPT_KEY
    ).toString();
    return cipher;
}

export function decrypt(cipher: string, key?: string) {
    const bytes = CryptoJS.AES.decrypt(
        cipher,
        key ? key : import.meta.env.VITE_API_ENCRYPT_KEY
    );
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
}
