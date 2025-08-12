import mongoose, { Schema, Document, models } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description?: string;
  images: string[];
  category?: string;
  tags?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function(images: string[]) {
          return images && images.length > 0;
        },
        message: "At least one image is required",
      },
    },
    category: {
      type: String,
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const GalleryModel = models.Gallery || mongoose.model("Gallery", GallerySchema);

export default GalleryModel; 