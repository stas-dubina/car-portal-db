import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {FuelType} from "@/lib/db/types";

export async function getCount(ids:Array<number>, searchName?: string) {
    const db = await connect();

    let query = db.selectFrom('fuel_type')
        .select(
            (eb) => eb.fn.count<number>('fuel_type_id').as('fuel_type_count')
        );

    if (ids.length > 0) {
        query = query.where('fuel_type_id', 'in', ids.map(Number));
    }

    if (searchName) {
        query = query.where('fuel_type_name', 'like', `%${searchName}%`)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.fuel_type_count;
}

export async function getAll(ids:Array<number>, range?:Range, searchName?: string): Promise<FuelType[]> {
    const db = await connect();
    let query = db.selectFrom('fuel_type')
        .select([
            'fuel_type_id',
            'fuel_type_name'
        ]);

    if (ids.length > 0) {
        query = query.where('fuel_type_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    if (searchName) {
        query = query.where('fuel_type_name', 'like', `%${searchName}%`)
    }

    return await query.orderBy('fuel_type_id asc').execute();
}

export async function getById(id:number): Promise<FuelType | undefined> {
    const db = await connect();
    return await db.selectFrom('fuel_type')
        .select([
            "fuel_type_id",
            "fuel_type_name"
        ])
        .where('fuel_type_id', '=', id)
        .executeTakeFirst()
}