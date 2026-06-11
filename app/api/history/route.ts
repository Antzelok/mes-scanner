import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    const errors = await prisma.errorRecord.findMany({
      where: {
        OR: [
          { serialNumber: { contains: query, mode: "insensitive" } },
          { boxNumber: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { date: "desc" },
      take: 20,
    });

    return NextResponse.json({ success: true, data: errors });
  } catch (error) {
    console.error("GET /api/history error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
