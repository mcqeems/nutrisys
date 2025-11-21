import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { prisma } from '@/prisma';
import { auth } from '@/auth';

export type UploadState = { url: string | null; error: string | null };

const REGION = process.env.AWS_REGION;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET = process.env.AWS_S3_BUCKET_NAME;

if (!REGION) throw new Error('AWS_REGION is not configured.');
if (!ACCESS_KEY_ID) throw new Error('AWS_ACCESS_KEY_ID is not configured.');
if (!SECRET_ACCESS_KEY) throw new Error('AWS_SECRET_ACCESS_KEY is not configured.');
if (!BUCKET) throw new Error('AWS_S3_BUCKET_NAME is not configured.');

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// Handler Function Upload to S3
export async function uploadImageToS3(file: File): Promise<string> {
  if (!BUCKET) {
    throw new Error('S3 bucket name is not configured.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `images/${Date.now()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  try {
    await s3Client.send(command);
    // Return the S3 key instead of public URL
    return fileName;
  } catch (error) {
    console.error('Error uploading to S3:', error);

    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    throw new Error('Failed to upload image.');
  }
}

// Generate pre-signed URL for private S3 object
export async function getPresignedUrl(key: string): Promise<string> {
  if (!BUCKET) {
    throw new Error('S3 bucket name is not configured.');
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  try {
    // URL expires in 1 hour (3600 seconds)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Failed to generate image URL.');
  }
}

//Handler for Processing image to upload it into S3
export async function processImageFile(imageFile: File | null): Promise<string | undefined> {
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!imageFile || imageFile.size === 0) {
    return undefined;
  }

  if (imageFile.size > MAX_FILE_SIZE) {
    throw new Error('Ukuran file tidak boleh melebihi 2MB.');
  }

  if (!ALLOWED_TYPES.includes(imageFile.type)) {
    throw new Error('File harus berupa gambar (JPEG, PNG, WEBP, atau GIF).');
  }

  return await uploadImageToS3(imageFile);
}

// Save the uploaded image to DB by the S3 key
export async function saveUploadedS3ImageToUser(imageFile: File) {
  try {
    // Validate auth session
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      throw new Error('Tidak terautentikasi. Silakan login terlebih dahulu.');
    }

    // Validate and upload file (returns S3 key, not URL)
    const s3Key = await processImageFile(imageFile);
    if (!s3Key) {
      throw new Error('File tidak ditemukan.');
    }

    // Save S3 key to user profile
    await prisma.user.update({
      where: { email },
      data: { image: s3Key },
    });

    // Return presigned URL for immediate display
    const presignedUrl = await getPresignedUrl(s3Key);
    return presignedUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Gagal mengupload dan menyimpan foto.';
    console.error('saveUploadedS3ImageToDb error:', message);
    throw new Error(message);
  }
}
