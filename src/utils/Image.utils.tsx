export function isImageCashed(imagePath: string) {
    const img = new Image();
    img.src = imagePath;
    return img.complete && img.naturalWidth > 0;
}

export function loadImage(imagePath: string): Promise<string | null> {
    return new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => {
            res(imagePath);
        };
        img.onerror = () => {
            rej(null);
        };
        img.src = imagePath;
    });
}
