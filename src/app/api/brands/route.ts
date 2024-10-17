import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET(request: Request) {
    const db = await connect();
    const { searchParams } = new URL(request.url);
    const ids = searchParams.getAll('id');

    let query = db.selectFrom('brand')
        .select([
            'brand_id as id',
            'brand_name as name'
        ]);

    if (ids.length > 0) {
        query = query.where('brand_id', 'in', ids.map(Number));
    }
    
    const brands = await query.orderBy('brand_id asc').execute();

    return NextResponse.json(brands, {
        status: 200,
        headers: {
            'X-Total-Count': `${brands.length}`
        }
    });
}
