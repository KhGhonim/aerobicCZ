export interface CloudinaryUploadOptions {
  folder?: string;
  onProgress?: (progress: number) => void;
}

/**
 * Client-side upload to Cloudinary using unsigned uploads.
 * Requires env vars: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 */
export async function uploadToCloudinary(
  file: File,
  options: CloudinaryUploadOptions = {}
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing Cloudinary config. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (options.folder) formData.append("folder", options.folder);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    const message = result?.error?.message || "Cloudinary upload failed";
    throw new Error(message);
  }

  return result.secure_url as string;
}

export async function uploadManyToCloudinary(
  files: File[],
  options: CloudinaryUploadOptions = {}
): Promise<string[]> {
  const uploads = files.map((f) => uploadToCloudinary(f, options));
  return Promise.all(uploads);
}


