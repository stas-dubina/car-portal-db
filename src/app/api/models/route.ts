import {NextResponse} from 'next/server';
import {connect} from "@/lib/db/connection";

export async function GET() {
    const db = await connect();

    const models = await db
        .selectFrom('model')
        .select([
            'model_id as id',
            'model_name as name',
            'model_brand_id as brandId'
        ])
        .execute();

    return NextResponse.json(models, {
        status: 200,
        headers: {
            'X-Total-Count': `${models.length}`
        }
    });
}
