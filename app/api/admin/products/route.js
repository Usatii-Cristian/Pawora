import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { PRODUCTS } from '@/lib/mockData';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(PRODUCTS);
}

export async function POST(request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, price, image, category, subcategory, featured, bestseller, newArrival, stock } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = slugify(name);
    const existing = PRODUCTS.find((p) => p.slug === slug);
    if (existing) {
      return NextResponse.json({ error: 'A product with this name already exists' }, { status: 409 });
    }

    const newProduct = {
      id: `prod-${Date.now()}`,
      slug,
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image?.trim() || `https://picsum.photos/seed/${slug}/600/600`,
      category,
      subcategory: subcategory || null,
      featured: Boolean(featured),
      bestseller: Boolean(bestseller),
      newArrival: Boolean(newArrival),
      stock: parseInt(stock, 10) || 0,
    };

    // Push to in-memory array (resets on server restart — needs MongoDB for persistence)
    PRODUCTS.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
