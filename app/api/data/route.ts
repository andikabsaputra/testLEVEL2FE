import { NextResponse } from 'next/server';
import { db } from '@/lib/conndb';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT a.product_id id,a.product_name,a.product_brand,c.owner_name products_owners FROM products a LEFT JOIN products_owners b ON a.product_id=b.products_id LEFT JOIN owners c ON b.owners_id=c.id;');
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}