import {BodyType} from "@/lib/db/types";
import {ListResult, Repository} from "@/lib/repository";
import {getCount, getAll, getById} from "@/app/api/body-types/db_repository";
import {Range} from "@/lib/range";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";

export type BodyTypeDto = {
    id: number;
    name: string;
}

function mapToDto(b: BodyType): BodyTypeDto {
    return {
        id: b.body_type_id,
        name: b.body_type_name
    }
}

class BodyRepository implements Repository<BodyTypeDto> {

    async findById(id: number): Promise<BodyTypeDto | undefined> {
        const bodyType = await getById(id);

        if (!bodyType) {
            return undefined;
        }

        return mapToDto(bodyType);
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<BodyTypeDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const bodyType = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: bodyType.map(b => mapToDto(b))
        }
    }
}

export default new BodyRepository();