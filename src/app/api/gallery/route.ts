import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { Gallery } from "@/DB/Config/Models";
import { uploadStream } from "@/Utils/CloudinaryUploader";
import { MAX_IMAGES, MAX_UPLOAD_SIZE_PER_REQUEST } from "@/Utils/constants";

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
}

export async function GET() {
  try {
    await connectMongoDB();
    
    const galleries = await Gallery.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ galleries });
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const tags = formData.get("tags") as string;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    // Validate image count per request
    if (files.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} images per request` },
        { status: 400 }
      );
    }

    // Validate total upload size per request
    const totalBytes = files.reduce((sum, f) => sum + (f?.size || 0), 0);
    if (totalBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      return NextResponse.json(
        { error: `Total upload too large. Maximum ${Math.floor(MAX_UPLOAD_SIZE_PER_REQUEST / (1024 * 1024))}MB per upload.` },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    
    for (const file of files) {
      try {
        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await uploadStream(buffer, "gallery") as CloudinaryResult;
        imageUrls.push(result.secure_url);
      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return NextResponse.json(
          { error: `Failed to upload image: ${file?.name || 'unknown'}` },
          { status: 500 }
        );
      }
    }

    // Create gallery entry
    const galleryData = {
      title,
      description,
      images: imageUrls,
      category,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
    };

    const gallery = await Gallery.create(galleryData);

    return NextResponse.json(
      { 
        message: "Gallery created successfully", 
        gallery 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gallery:", error);
    return NextResponse.json(
      { error: "Failed to create gallery" },
      { status: 500 }
    );
  }
}

