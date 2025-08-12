import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { Gallery } from "@/DB/Config/Models";
import { MAX_IMAGES } from "@/Utils/constants";

// Removed unused GalleryData interface (client sends plain JSON)

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
    const body = await request.json();
    const {
      title,
      description,
      category,
      tags,
      existingImages = [],
      images = [],
    } = body as {
      title: string;
      description?: string;
      category?: string;
      tags?: string;
      existingImages?: string[];
      images?: string[];
    };

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

    // Validate new images count
    if (images.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} new images per update` },
        { status: 400 }
      );
    }
    
    // Combine existing and new image URLs
    const allImages = [...existingImages, ...images];

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