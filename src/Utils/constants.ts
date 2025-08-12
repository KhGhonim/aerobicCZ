// Application constants
export const MAX_IMAGES = 10;
export const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB per file
export const MAX_TITLE_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_CATEGORY_LENGTH = 100;

// Upload caps
export const MAX_UPLOAD_SIZE_PER_REQUEST = 6 * 1024 * 1024; // 6MB total per upload attempt

// API limits (middleware enforces request payload size)
export const MAX_PAYLOAD_SIZE = MAX_UPLOAD_SIZE_PER_REQUEST; // keep in sync with per-upload cap

// Validation messages
export const VALIDATION_MESSAGES = {
  MAX_IMAGES_EXCEEDED: `Maximum ${MAX_IMAGES} images allowed`,
  FILE_TOO_LARGE: `File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
  TOTAL_UPLOAD_TOO_LARGE: `Total upload too large. Maximum ${MAX_UPLOAD_SIZE_PER_REQUEST / (1024 * 1024)}MB per upload`,
  TITLE_TOO_LONG: `Title cannot exceed ${MAX_TITLE_LENGTH} characters`,
  DESCRIPTION_TOO_LONG: `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`,
  CATEGORY_TOO_LONG: `Category cannot exceed ${MAX_CATEGORY_LENGTH} characters`,
} as const;
