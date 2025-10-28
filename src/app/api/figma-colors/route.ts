// (removed) Former Figma color sync endpoint. Returns 410 to indicate gone.
import { NextResponse } from 'next/server';
export function GET() {
  return NextResponse.json({ error: 'Figma color sync removed' }, { status: 410 });
}
