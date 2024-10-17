import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const users = await db
        .selectFrom('user')
        .selectAll()
        .execute();

    return NextResponse.json(users, {
        status: 200,
        headers: {
            'X-Total-Count': `${users.length}`
        }
    });
}
