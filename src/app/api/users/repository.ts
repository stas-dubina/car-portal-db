import {User} from "@/lib/db/types";
import {ListResult, Repository} from "@/lib/repository";
import {getAll, getCount, getById} from "@/app/api/users/db_repository";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import {Range} from "@/lib/range";

export type UserDto = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    cityId: number;
    email: string;
}

function mapToDto(u: User): UserDto {
    return {
        id: u.user_id,
        firstName: u.user_first_name,
        lastName: u.user_last_name,
        phone: u.user_phone,
        cityId: u.user_city_id,
        email: u.user_email,
    }
}

class UserRepository implements Repository<UserDto> {

    async findById(id: number): Promise<UserDto | undefined> {
        const user = await getById(id);

        if (!user) {
            return undefined;
        }

        return mapToDto(user);
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<UserDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const users = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: users.map(u => mapToDto(u))
        }
    }
}

export default new UserRepository();