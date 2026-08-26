import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      console.error("IMGBB_API_KEY is not set");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Convert file to base64 for imgbb API
    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    const imgbbData = new FormData();
    imgbbData.append('key', apiKey);
    imgbbData.append('image', base64);
    imgbbData.append('name', image.name);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbData,
    });

    const result = await response.json();
    
    if (result.success) {
      return NextResponse.json({ url: result.data.url });
    } else {
      console.error("Imgbb error:", result);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
