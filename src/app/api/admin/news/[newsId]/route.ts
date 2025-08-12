import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { News } from "@/DB/Config/Models";
import { uploadStream } from "@/Utils/CloudinaryUploader";
import { MAX_IMAGES, MAX_UPLOAD_SIZE_PER_REQUEST } from "@/Utils/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    await connectMongoDB();
    const { newsId } = await params;
    const news = await News.findById(newsId);
    
    if (!news) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    await connectMongoDB();
    const { newsId } = await params;
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;
    const publishDate = formData.get("publishDate") as string;
    const existingMainImage = formData.get("existingMainImage") as string;
    const existingPhotoGallery = formData.get("existingPhotoGallery") as string;
    const newMainImage = formData.get("mainImage") as File;
    const newPhotoGallery = formData.getAll("photoGallery") as File[];

    if (!title || !content || !slug || !publishDate) {
      return NextResponse.json(
        { error: "Title, content, slug, and publish date are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current article)
    const existingNews = await News.findOne({ slug: slug, _id: { $ne: newsId } });
    if (existingNews) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 400 }
      );
    }

    const news = await News.findById(newsId);
    if (!news) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    // Parse existing photo gallery
    const existingPhotoGalleryArray = existingPhotoGallery ? JSON.parse(existingPhotoGallery) : [];
    
    // Validate NEW images per request only
    if (newPhotoGallery.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} new images per update` },
        { status: 400 }
      );
    }

    // Validate total upload size per request
    const totalBytesNew = (newMainImage?.size || 0) + newPhotoGallery.reduce((sum, f) => sum + (f?.size || 0), 0);
    if (totalBytesNew > MAX_UPLOAD_SIZE_PER_REQUEST) {
      return NextResponse.json(
        { error: `Total upload too large. Maximum ${Math.floor(MAX_UPLOAD_SIZE_PER_REQUEST / (1024 * 1024))}MB per upload.` },
        { status: 400 }
      );
    }
    
    // Handle main image
    let mainImageUrl = news.mainImage; // Start with current image
    
    // If existingMainImage is provided and not empty, use it (user wants to keep current or has modified it)
    if (existingMainImage && existingMainImage.trim() !== "") {
      mainImageUrl = existingMainImage;
    } else if (existingMainImage === "") {
      // User wants to delete the main image
      mainImageUrl = "";
    }
    
    // If new main image is uploaded, it takes priority
    if (newMainImage && newMainImage.size > 0) {
      const bytes = await newMainImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadStream(buffer, "news");
      mainImageUrl = uploadResult.secure_url;
    }
    
    // Upload new photo gallery images
    const newPhotoGalleryUrls: string[] = [];
    for (const photo of newPhotoGallery) {
      if (photo instanceof File && photo.size > 0) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadResult = await uploadStream(buffer, "news");
        newPhotoGalleryUrls.push(uploadResult.secure_url);
      }
    }

    // Combine existing and new photo gallery
    const allPhotoGallery = [...existingPhotoGalleryArray, ...newPhotoGalleryUrls];

    // Update the news
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      {
        title,
        description,
        content,
        slug,
        publishDate: new Date(publishDate),
        mainImage: mainImageUrl,
        photoGallery: allPhotoGallery,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    await connectMongoDB();
    const { newsId } = await params;
    const news = await News.findById(newsId);
    
    if (!news) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    await News.findByIdAndDelete(newsId);

    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
} 