import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const accounts = await db
        .selectFrom('account')
        .selectAll()
        .execute();

    return NextResponse.json(accounts, {
        status: 200,
        headers: {
            'X-Total-Count': `${accounts.length}`
        }
    });
}
