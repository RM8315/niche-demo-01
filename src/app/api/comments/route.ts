import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from '@/lib/posts-server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = searchParams.get('limit') || 'all';

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const result = await getComments({ slug, page, limit });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createComment(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
