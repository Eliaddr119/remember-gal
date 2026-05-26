import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "auto",
  endpoint: process.env.AWS_ENDPOINT_URL_S3!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: false,
});

const BUCKET = process.env.BUCKET_NAME!;

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string[] } }
) {
  const key = params.key.join("/");

  try {
    const obj = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));

    const contentType = obj.ContentType ?? "application/octet-stream";
    const contentLength = obj.ContentLength;

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    };
    if (contentLength) headers["Content-Length"] = String(contentLength);

    // Support range requests for video seeking
    const range = req.headers.get("range");
    if (range && obj.Body) {
      const rangeObj = await s3.send(
        new GetObjectCommand({ Bucket: BUCKET, Key: key, Range: range })
      );
      const stream = rangeObj.Body as Readable;
      const chunks: Buffer[] = [];
      for await (const chunk of stream) chunks.push(Buffer.from(chunk));
      const body = Buffer.concat(chunks);
      return new NextResponse(body, {
        status: 206,
        headers: {
          ...headers,
          "Content-Range": rangeObj.ContentRange ?? "",
          "Accept-Ranges": "bytes",
          "Content-Length": String(body.length),
        },
      });
    }

    const stream = obj.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(Buffer.from(chunk));
    const body = Buffer.concat(chunks);

    return new NextResponse(body, { status: 200, headers });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
