import {connect} from "@/lib/db/connection";
import {Range} from '@/lib/range';
import {Brand} from "@/lib/db/types";

export async function getCount(ids:Array<number>, searchName?:string) {
    const db = await connect();

    let query = db.selectFrom('brand')
        .select(
            (eb) => eb.fn.count<number>('brand_id').as('brand_count')
        );

    if (ids.length > 0) {
        query = query.where('brand_id', 'in', ids.map(Number));
    }
    if (searchName) {
        console.log(searchName)
        query = query.where('brand_name', 'like', `%${searchName}%`);
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.brand_count;
}

export async function getAll(ids:Array<number>, range?:Range, searchName?:string):Promise<Brand[]> {
    const db = await connect();
    let query = db.selectFrom('brand')
        .select([
            'brand_id',
            'brand_name'
        ]);

    if (ids.length > 0) {
        query = query.where('brand_id', 'in', ids.map(Number));
    }
    if (searchName) {
        query = query.where('brand_name', 'like', `%${searchName}%`);
    }
    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('brand_id asc').execute();
}

export async function getBrandById(id: number) {
    const db = await connect();
    return await db.selectFrom('brand')
        .select([
            'brand_id',
            'brand_name'
        ])
        .where('brand_id', '=', id)
        .executeTakeFirst();
}