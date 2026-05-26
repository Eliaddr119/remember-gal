import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "auto",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const BUCKET = process.env.BUCKET_NAME!;

export function getPublicUrl(key: string): string {
  return `https://${BUCKET}.fly.storage.tigris.dev/${key}`;
}

export async function uploadBuffer(key: string, body: Buffer, contentType: string): Promise<string> {
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: contentType }));
  return getPublicUrl(key);
}

export async function createPresignedUploadUrl(key: string, contentType: string): Promise<{ signedUrl: string; publicUrl: string }> {
  const command = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return { signedUrl, publicUrl: getPublicUrl(key) };
}
