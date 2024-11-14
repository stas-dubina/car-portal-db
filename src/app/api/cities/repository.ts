import dbRepository from "./db_repository"
import {City} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";

export type CityDto = {
    id: number;
    name: string;
}

class ColorMapper implements Mapper<City, CityDto> {
    toDto(e: City): CityDto {
        return {
            id: e.city_id,
            name: e.city_name
        }
    }

    toEntity(t: CityDto): City {
        return {
            city_id: t.id,
            city_name: t.name,
        }
    }

    toEntityPartial(t: Partial<CityDto>): Partial<City> {
        return {
            city_id: t.id,
            city_name: t.name,
        }
    }
}

export default new CrudRepository<City, CityDto>(dbRepository, new ColorMapper());