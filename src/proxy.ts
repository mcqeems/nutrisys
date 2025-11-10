import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(_req: NextRequest) {
  // No auth in middleware; keep it simple and avoid importing server-only code
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
