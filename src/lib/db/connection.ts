import {createKysely} from "@vercel/postgres-kysely";
import {Database} from "@/lib/db/types";
import {seed} from "@/lib/db/seed";
import {Kysely} from "kysely";


const _db = createKysely<Database>(undefined, {
        log: ['query', 'error']
})

export async function connect(): Promise<Kysely<Database>> {

    return _db
}
