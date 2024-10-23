import {createKysely} from "@vercel/postgres-kysely";
import {Database} from "@/lib/db/types";
import {seed} from "@/lib/db/seed";
import {Kysely} from "kysely";


const _db = createKysely<Database>()

export async function connect(): Promise<Kysely<Database>> {
    try {
        const users = await _db.selectFrom('brand')
            .select('brand_id')
            .fetch(1)
            .execute()
    } catch (e: any) {
        if (e.message === `relation "brand" does not exist`) {
            console.log(
                'Table does not exist, creating and seeding it with dummy data now...'
            )
            // Table is not created yet
            await seed()
        } else {
            throw e
        }
    }
    return _db
}
