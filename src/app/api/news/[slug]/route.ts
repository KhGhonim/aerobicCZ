import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/DB/MongoDB/MongoDB";
import { News } from "@/DB/Config/Models";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB();
    const { slug } = await params;
    
    const news = await News.findOne({ slug: slug });
    
    if (!news) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
} 