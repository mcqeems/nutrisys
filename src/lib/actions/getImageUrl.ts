import { getPresignedUrl } from '@/lib/actions/postUserImage';

export async function getImageUrl(imageKey: string | null | undefined): Promise<string | null> {
  if (!imageKey) return null;
  // If it's already a full URL, return it
  if (imageKey.startsWith('http')) return imageKey;
  // Otherwise, generate presigned URL from S3 key
  try {
    return await getPresignedUrl(imageKey);
  } catch {
    return null;
  }
}
