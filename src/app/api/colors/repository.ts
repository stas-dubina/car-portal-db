import {Color} from "@/lib/db/types";
import {ListResult, Repository} from "@/lib/repository";
import {getAll, getCount, getById} from "@/app/api/colors/db_repository";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import {Range} from "@/lib/range";

export type ColorDto = {
    id: number;
    name: string;
    value: string;
}

function mapToDto(c: Color): ColorDto {
    return {
        id: c.color_id,
        name: c.color_name,
        value: c.color_value,
    }
}

class ColorRepository implements Repository<ColorDto> {

    async findById(id: number): Promise<ColorDto | undefined> {
        const color = await getById(id);

        if (!color) {
            return undefined;
        }

        return mapToDto(color);
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<ColorDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const colors = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: colors.map(c => mapToDto(c))
        }
    }
}

export default new ColorRepository();