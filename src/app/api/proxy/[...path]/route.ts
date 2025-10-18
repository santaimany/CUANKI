import { NextRequest, NextResponse } from 'next/server';

// Get backend URL from environment variable
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127';

// Clean URL (remove quotes if exists)
const cleanBackendUrl = BACKEND_URL.replace(/['"]/g, '').replace(/\/$/, '');

console.log('[Proxy] Backend URL:', cleanBackendUrl);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  // Don't add /api/ prefix here since path already includes it
  const url = `${cleanBackendUrl}/${path.join('/')}`;
  const searchParams = request.nextUrl.searchParams.toString();
  const fullUrl = searchParams ? `${url}?${searchParams}` : url;

  console.log('[Proxy GET]', fullUrl);

  try {
    const token = request.headers.get('authorization');
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
      // Add timeout and signal for better error handling
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy GET Error]:', {
      url: fullUrl,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch from backend',
        details: error instanceof Error ? error.message : 'Unknown error',
        url: fullUrl
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  // Don't add /api/ prefix here since path already includes it
  const url = `${cleanBackendUrl}/${path.join('/')}`;

  console.log('[Proxy POST]', url);

  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    console.log('[Proxy POST Body]', JSON.stringify(body));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    console.log('[Proxy POST Response Status]', response.status);

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy POST Error]:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to post to backend',
        details: error instanceof Error ? error.message : 'Unknown error',
        url
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  // Don't add /api/ prefix here since path already includes it
  const url = `${cleanBackendUrl}/${path.join('/')}`;

  console.log('[Proxy PUT]', url);

  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy PUT Error]:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to put to backend',
        details: error instanceof Error ? error.message : 'Unknown error',
        url
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  // Don't add /api/ prefix here since path already includes it
  const url = `${cleanBackendUrl}/${path.join('/')}`;

  console.log('[Proxy PATCH]', url);

  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy PATCH Error]:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to patch to backend',
        details: error instanceof Error ? error.message : 'Unknown error',
        url
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  // Don't add /api/ prefix here since path already includes it
  const url = `${cleanBackendUrl}/${path.join('/')}`;

  console.log('[Proxy DELETE]', url);

  try {
    const token = request.headers.get('authorization');

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy DELETE Error]:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to delete from backend',
        details: error instanceof Error ? error.message : 'Unknown error',
        url
      },
      { status: 500 }
    );
  }
}
