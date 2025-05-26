/**
 * Universal string to Base64 converter
 * Works in both browsers and Node.js v20+
 * @param {string} str - The string to encode
 * @returns {string} Base64 encoded string
 * @throws {Error} If no Base64 encoding method is available in the environment
 */
export function stringToBase64(str: string): string {
  // For Node.js environment
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }

  // For browser environment
  if (typeof btoa !== 'undefined') {
    // Modern replacement for unescape(encodeURIComponent(str))
    const utf8Bytes = new TextEncoder().encode(str);
    let binary = '';
    utf8Bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary);
  }

  // Fallback for other environments
  throw new Error('No Base64 encoding method available in this environment');
}
