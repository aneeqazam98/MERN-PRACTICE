import { NextRequest, NextResponse } from 'next/server';
//import connectDB from '@/lib/mongodb';
//import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get products' },
      { status: 500 }
    );
  }
}
<export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, description, price, image, category, stock } = body;

    if (!name || !description || !price) {
      return NextResponse.json(
        { success: false, error: 'Please provide name, description, and price' },
        { status: 400 }
      );
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: image || '',
      category: category || '',
      stock: stock || 0,
    });

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

