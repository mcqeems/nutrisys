'use server';
import { saveUploadedS3ImageToDb } from '@/lib/actions/saveAndUpload';

export type UploadState = { url: string | null; error: string | null };

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
