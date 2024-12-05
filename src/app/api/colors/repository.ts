import dbRepository from "./db_repository"
import {Color} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";

export type ColorDto = {
    id: number;
    name: string;
    value: string;
}

class ColorMapper implements Mapper<Color, ColorDto> {

    toDto(e: Color): ColorDto {
        return {
            id: e.color_id,
            name: e.color_name,
            value: e.color_value
        }
    }

    toEntity(t: ColorDto): Color {
        return {
            color_id: t.id,
            color_name: t.name,
            color_value: t.value
        }
    }

    toEntityPartial(t: Partial<ColorDto>): Partial<Color> {
        return {
            color_id: t.id,
            color_name: t.name,
            color_value: t.value
        }
    }
}

export default new CrudRepository<Color, ColorDto>(dbRepository, new ColorMapper());