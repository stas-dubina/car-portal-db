import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const cities = await db
        .selectFrom('city')
        .selectAll()
        .execute();

    return NextResponse.json(cities, {
        status: 200,
        headers: {
            'X-Total-Count': `${cities.length}`
        }
    });
}
