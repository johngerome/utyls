/**
 * Converts a number of bytes into a human-readable string with appropriate size units.
 *
 * @param bytes - The number of bytes to convert.
 * @param decimals - The number of decimal places to include (defaults to 2).
 * @returns A string representing the formatted size (e.g., "1.23 MB").
 *
 * @example
 * bytesToSize(1024); // "1 KB"
 * bytesToSize(123456789); // "117.74 MB"
 * bytesToSize(0); // "0 Bytes"
 */
export function bytesToSize(bytes: number, decimals = 2) {
  if (!bytes || bytes < 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  if (bytes < 1) {
    return `${parseFloat(bytes.toFixed(dm))} ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (i >= sizes.length) {
    return `${parseFloat((bytes / Math.pow(k, sizes.length - 1)).toFixed(dm))} ${sizes[sizes.length - 1]}`;
  }

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
