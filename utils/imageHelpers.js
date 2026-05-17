export function compressImage(file, maxWidth = 800) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          resolve(blob);
          URL.revokeObjectURL(url);
        },
        'image/jpeg',
        0.85
      );
    };
    img.onerror = () => {
      resolve(file); // fallback to original file if loading fails
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

// Convert Blob/File to Data URL for client-side persistence and image displaying
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
