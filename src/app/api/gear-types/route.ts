import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const gearTypes = await db
        .selectFrom('gear_type')
        .selectAll()
        .execute();

    return NextResponse.json(gearTypes, {
        status: 200,
        headers: {
            'X-Total-Count': `${gearTypes.length}`
        }
    });
}
