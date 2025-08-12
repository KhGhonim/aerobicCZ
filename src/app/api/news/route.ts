import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { News } from "@/DB/Config/Models";
import { MAX_IMAGES } from "@/Utils/constants";

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

    const body = await request.json();
    const {
      title,
      description,
      content,
      slug,
      publishDate,
      mainImage,
      photoGallery = [],
    } = body as {
      title: string;
      description?: string;
      content: string;
      slug: string;
      publishDate: string;
      mainImage: string;
      photoGallery?: string[];
    };

    if (!title || !content || !slug || !publishDate) {
      return NextResponse.json(
        { error: "Title, content, slug, and publish date are required" },
        { status: 400 }
      );
    }

    const existingNews = await News.findOne({ slug: slug });
    if (existingNews) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 400 }
      );
    }

    if (!mainImage) {
      return NextResponse.json(
        { error: "Main image is required" },
        { status: 400 }
      );
    }

    if (photoGallery.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} images per request` },
        { status: 400 }
      );
    }

    const news = await News.create({
      title,
      description,
      content,
      mainImage,
      photoGallery,
      slug,
      publishDate: new Date(publishDate),
    });

    return NextResponse.json(
      { message: "News created successfully", news },
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

