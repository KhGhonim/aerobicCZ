import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { Gallery } from "@/DB/Config/Models";
import { uploadStream } from "@/Utils/CloudinaryUploader";
import { MAX_IMAGES, MAX_UPLOAD_SIZE_PER_REQUEST } from "@/Utils/constants";

interface GalleryData {
  title: string;
  description: string;
  category: string;
  photos: string[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const tags = formData.get("tags") as string;
    const existingImages = formData.get("existingImages") as string;
    const newImages = formData.getAll("images") as File[];

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    // Parse existing images
    const existingImagesArray = existingImages ? JSON.parse(existingImages) : [];
    
    // Validate new images per request
    if (newImages.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} new images per update` },
        { status: 400 }
      );
    }

    // Validate total upload size per request
    const totalBytes = newImages.reduce((sum, f) => sum + (f?.size || 0), 0);
    if (totalBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      return NextResponse.json(
        { error: `Total upload too large. Maximum ${Math.floor(MAX_UPLOAD_SIZE_PER_REQUEST / (1024 * 1024))}MB per upload.` },
        { status: 400 }
      );
    }
    
    // Upload new images
    const newImageUrls: string[] = [];
    for (const image of newImages) {
      if (image instanceof File && image.size > 0) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadResult = await uploadStream(buffer, "gallery");
        newImageUrls.push(uploadResult.secure_url);
      }
    }

    // Combine existing and new images
    const allImages = [...existingImagesArray, ...newImageUrls];

    // Parse tags
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    // Update the gallery
    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        tags: tagsArray,
        images: allImages,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(updatedGallery);
  } catch (error) {
    console.error("Error updating gallery:", error);
    return NextResponse.json(
      { error: "Failed to update gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return NextResponse.json(
        { error: "Gallery not found" },
        { status: 404 }
      );
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Gallery deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery" },
      { status: 500 }
    );
  }
} 