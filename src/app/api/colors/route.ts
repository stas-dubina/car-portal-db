import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const colors = await db
        .selectFrom('color')
        .selectAll()
        .execute();

    return NextResponse.json(colors, {
        status: 200,
        headers: {
            'X-Total-Count': `${colors.length}`
        }
    });
}
