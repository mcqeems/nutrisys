'use client';
import { useActionState, useEffect } from 'react';
import Image from 'next/image';
import { uploadWithOriginalAction } from './actions';

type UploadState = { url: string | null; error: string | null };

export default function UserPage() {
  const [state, formAction, isPending] = useActionState<UploadState, FormData>(uploadWithOriginalAction, {
    url: null,
    error: null,
  });

  useEffect(() => {
    if (state.url && !isPending) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.url, isPending]);

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>Upload Test</h1>
      {state.error && <p style={{ color: 'crimson' }}>{state.error}</p>}
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="file" type="file" accept="image/*" />
        <button type="submit" disabled={isPending} style={{ padding: '8px 12px' }}>
          {isPending ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {state.url && (
        <div style={{ marginTop: 16 }}>
          <p>Uploaded URL:</p>
          <a href={state.url} target="_blank" rel="noreferrer">
            {state.url}
          </a>
          <div style={{ marginTop: 8 }}>
            <Image
              src={state.url}
              alt="uploaded"
              width={400}
              height={300}
              style={{ height: 'auto', width: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
