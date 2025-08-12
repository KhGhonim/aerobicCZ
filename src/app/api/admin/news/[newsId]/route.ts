import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { News } from "@/DB/Config/Models";
import { MAX_IMAGES } from "@/Utils/constants";

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
    const body = await request.json();
    const {
      title,
      description,
      content,
      slug,
      publishDate,
      existingMainImage,
      existingPhotoGallery = [],
      mainImage,
      photoGallery = [],
    } = body as {
      title: string;
      description?: string;
      content: string;
      slug: string;
      publishDate: string;
      existingMainImage?: string;
      existingPhotoGallery?: string[];
      mainImage?: string | null;
      photoGallery?: string[];
    };

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

    // Validate NEW images per request only
    if (photoGallery.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} new images per update` },
        { status: 400 }
      );
    }
    
    // Handle main image URL resolution
    let mainImageUrl = news.mainImage;
    if (typeof mainImage === "string" && mainImage.trim() !== "") {
      mainImageUrl = mainImage;
    } else if (existingMainImage === "") {
      mainImageUrl = "";
    } else if (existingMainImage) {
      mainImageUrl = existingMainImage;
    }

    // Combine existing and new photo gallery URLs
    const allPhotoGallery = [...existingPhotoGallery, ...photoGallery];

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