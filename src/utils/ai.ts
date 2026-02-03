export const getBase64Image = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];
            resolve(base64data)
        }
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    })
}