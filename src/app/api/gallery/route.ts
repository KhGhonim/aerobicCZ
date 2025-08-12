import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { Gallery } from "@/DB/Config/Models";
import { MAX_IMAGES } from "@/Utils/constants";

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

    const body = await request.json();
    const { title, description, category, tags, images } = body as {
      title: string;
      description?: string;
      category?: string;
      tags?: string;
      images: string[];
    };

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    if (images.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_IMAGES} images per request` },
        { status: 400 }
      );
    }

    const gallery = await Gallery.create({
      title,
      description,
      images,
      category,
      tags: tags ? tags.split(",").map((t: string) => t.trim()) : [],
    });

    return NextResponse.json(
      { message: "Gallery created successfully", gallery },
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

