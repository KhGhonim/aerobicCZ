import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { News } from "@/DB/Config/Models";
import { uploadStream } from "@/Utils/CloudinaryUploader";
import { MAX_IMAGES, MAX_UPLOAD_SIZE_PER_REQUEST } from "@/Utils/constants";

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
}

export async function GET() {
  try {
    await connectMongoDB();
    
    const newsArticles = await News.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ newsArticles });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const formData = await request.formData();
    
    // Main news data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;
    const publishDate = formData.get("publishDate") as string;

    // Main image
    const mainImageFile = formData.get("mainImage") as File;
    
    // Photo gallery
    const photoGalleryFiles = formData.getAll("photoGallery") as File[];

    if (!title || !content || !slug || !publishDate) {
      return NextResponse.json(
        { error: "Title, content, slug, and publish date are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingNews = await News.findOne({ slug: slug });
    if (existingNews) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 400 }
      );
    }

    if (!mainImageFile) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 }
      );
    }

    // Validate photo gallery count
    if (photoGalleryFiles.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} images per request` },
        { status: 400 }
      );
    }

    // Validate total upload size per request (main image + gallery)
    const totalBytes = (mainImageFile?.size || 0) + photoGalleryFiles.reduce((sum, f) => sum + (f?.size || 0), 0);
    if (totalBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      return NextResponse.json(
        { error: `Total upload too large. Maximum ${Math.floor(MAX_UPLOAD_SIZE_PER_REQUEST / (1024 * 1024))}MB per upload.` },
        { status: 400 }
      );
    }

    // Upload main image to Cloudinary
    let mainImageUrl = "";
    try {
      const mainImageBytes = await mainImageFile.arrayBuffer();
      const mainImageBuffer = Buffer.from(mainImageBytes);
      const mainImageResult = await uploadStream(mainImageBuffer, "news") as CloudinaryResult;
      mainImageUrl = mainImageResult.secure_url;
    } catch (uploadError) {
      console.error("Error uploading main image to Cloudinary:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload main image" },
        { status: 500 }
      );
    }

    // Upload photo gallery images to Cloudinary
    const photoGalleryUrls = [];
    
    for (const file of photoGalleryFiles) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadStream(buffer, "news") as CloudinaryResult;
        photoGalleryUrls.push(result.secure_url);
      } catch (uploadError) {
        console.error("Error uploading gallery image to Cloudinary:", uploadError);
        return NextResponse.json(
          { error: `Failed to upload gallery image: ${file.name}` },
          { status: 500 }
        );
      }
    }
    const newsData = {
      title,
      description,
      content,
      mainImage: mainImageUrl,
      photoGallery: photoGalleryUrls,
      slug,
      publishDate: new Date(publishDate),
    };

    const news = await News.create(newsData);

    return NextResponse.json(
      { 
        message: "News created successfully", 
        news 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}

