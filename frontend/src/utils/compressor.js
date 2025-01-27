import Compressor from "compressorjs";

/**
 * Compress an image file with minimal quality loss
 * @param {File} imageFile - The image file to be compressed
 * @param {number} quality - Compression quality (0.6-1 recommended for minimal quality loss)
 * @returns {Promise<File>} - A promise that resolves with the compressed image file
 */
const compressImage = (imageFile, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    new Compressor(imageFile, {
      quality, // Compression quality (0.8 means 80% of original quality)
      maxWidth: 1920, // Optional: Resize image to a maximum width (adjust if needed)
      maxHeight: 1080, // Optional: Resize image to a maximum height (adjust if needed)
      success(compressedResult) {
        resolve(compressedResult);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

export default compressImage;
