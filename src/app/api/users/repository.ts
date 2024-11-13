import {UserView} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";
import dbRepository from "./db_repository";

export type UserDto = {
    id: number;
    createdAt: Date;
    login: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    cityId: number;
    cityName: string;
}

class UserMapper implements Mapper<UserView, UserDto> {

    toDto(e: UserView): UserDto {
        return {
            id: e.user_id,
            createdAt: e.user_created_at,
            login: e.user_login,
            firstName: e.user_first_name,
            lastName: e.user_last_name,
            phone: e.user_phone,
            email: e.user_email,
            cityId: e.user_city_id,
            cityName: e.user_city_name
        }
    }

    toEntity(t: UserDto): UserView {
        return {
            user_id: t.id,
            user_created_at: t.createdAt,
            user_login: t.login,
            user_first_name: t.firstName,
            user_last_name: t.lastName,
            user_phone: t.phone,
            user_email: t.email,
            user_city_id: t.cityId,
            user_city_name: t.cityName
        }
    }

    toEntityPartial(t: Partial<UserDto>): Partial<UserView> {
        return {
            user_id: t.id,
            user_created_at: t.createdAt,
            user_login: t.login,
            user_first_name: t.firstName,
            user_last_name: t.lastName,
            user_phone: t.phone,
            user_email: t.email,
            user_city_id: t.cityId,
            user_city_name: t.cityName
        }
    }
}

export default new CrudRepository<UserView, UserDto>(dbRepository, new UserMapper());