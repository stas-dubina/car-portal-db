import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const cars = await db
        .selectFrom('car')
        .selectAll()
        .execute();

    return NextResponse.json(cars, {
        status: 200,
        headers: {
            'X-Total-Count': `${cars.length}`
        }
    });
}
