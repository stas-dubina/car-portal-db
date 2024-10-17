import { NextResponse } from 'next/server';
import { connect } from "@/lib/db/connection";
import { seed } from "@/lib/db/seed";

export async function GET() {
    const db = await connect();

    await seed()

    return NextResponse.json("Success!", {
        status: 200
    });
}