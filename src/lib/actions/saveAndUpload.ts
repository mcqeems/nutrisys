import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { prisma } from '@/prisma';
import { auth } from '@/auth';

export type UploadState = { url: string | null; error: string | null };

// Validate required environment variables early for clearer errors
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
    // Removed ACL as it's often restricted by default
  });

  try {
    await s3Client.send(command);

    // For now, we'll construct a public URL
    // Note: This will only work if your bucket allows public access to objects
    const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
    return url;
  } catch (error) {
    console.error('Error uploading to S3:', error);

    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    throw new Error('Failed to upload image.');
  }
}

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

export async function saveUploadedS3ImageToDb(imageFile: File) {
  try {
    // Validate auth session
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      throw new Error('Tidak terautentikasi. Silakan login terlebih dahulu.');
    }

    // Validate and upload file
    const url = await processImageFile(imageFile);
    if (!url) {
      throw new Error('File tidak ditemukan.');
    }

    // Save URL to user profile
    await prisma.user.update({
      where: { email },
      data: { image: url },
    });

    return url;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Gagal mengupload dan menyimpan foto.';
    console.error('saveUploadedS3ImageToDb error:', message);
    throw new Error(message);
  }
}

export async function uploadWithOriginalAction(_prev: UploadState, formData: FormData): Promise<UploadState> {
  try {
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return { url: null, error: 'File is required' };
    }
    const url = await saveUploadedS3ImageToDb(file);
    return { url, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return { url: null, error: msg };
  }
}
