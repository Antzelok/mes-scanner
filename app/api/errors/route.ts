import { NextResponse } from "next/server";
import { errorFormSchema } from "@/lib/validators";
import { prisma } from "@/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = errorFormSchema.parse(body);

    const saved = await prisma.errorRecord.create({
      data: {
        date: new Date(),
        latitude: parsed.latitude,
        longitude: parsed.longitude,
        serialNumber: parsed.serialNumber,
        deveui: parsed.deveui,
        boxNumber: parsed.boxNumber,
        types: parsed.types ?? [],
        actions: parsed.actions ?? [],
        comments: parsed.comments || "",
      },
    });

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/errorForm error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save data",
      },
      { status: 500 },
    );
  }
}
