import mongoose, { Schema, Document, models } from "mongoose";

export interface INews extends Document {
  title: string;
  description: string;
  content: string;
  mainImage: string;
  photoGallery: string[];
  slug: string;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    mainImage: {
      type: String,
      required: [true, "Main image is required"],
    },
    photoGallery: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
    },
    publishDate: {
      type: Date,
      required: [true, "Publish date is required"],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);



const NewsModel = models.News || mongoose.model("News", NewsSchema);

export default NewsModel; 