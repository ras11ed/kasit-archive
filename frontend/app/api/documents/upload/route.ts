
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string[]> = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword"],
  ".docx": [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  ".xls": ["application/vnd.ms-excel"],
  ".xlsx": [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  ".jpg": ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".png": ["image/png"],
  ".tif": ["image/tiff"],
  ".tiff": ["image/tiff"],
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file was provided." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The file is empty." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must not exceed 10 MB." },
        { status: 413 }
      );
    }

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    const allowedMimeTypes = ALLOWED_TYPES[extension];

    if (!allowedMimeTypes || !allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "This file type is not supported." },
        { status: 415 }
      );
    }

    return NextResponse.json(
      {
        message: "File validation successful.",
        fileName: file.name,
        extension,
        size: file.size,
        type: file.type,
        status: "uploaded",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process the upload request." },
      { status: 500 }
    );
  }
}
