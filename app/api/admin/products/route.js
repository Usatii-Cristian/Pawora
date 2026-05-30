import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/store';
import { slugify } from '@/lib/slugify';

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, subcategory, featured, bestseller, newArrival, stock } = body;

    if (!name || !description || !price || !category) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă' }, { status: 400 });
    }

    const products = getProducts();
    const slug = slugify(name);
    if (products.find((p) => p.slug === slug)) {
      return NextResponse.json({ error: 'Un produs cu acest nume există deja' }, { status: 409 });
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

    products.push(newProduct);
    saveProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
