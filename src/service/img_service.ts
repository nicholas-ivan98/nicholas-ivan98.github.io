export async function convertToWebp(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext('2d');
            context?.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                const convertedFile = new File([blob!], `${getFileNameFromURL(url)}.webp`, {
                    type: 'image/webp',
                });
                resolve(URL.createObjectURL(convertedFile));
            }, 'image/webp');
        };
        img.onerror = reject;
        img.src = url;
    });
}

function getFileNameFromURL(url: string): string {
    const path = url.split('/').pop();
    return path ? path.split('?')[0] : '';
}