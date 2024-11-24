import dbRepository from "./db_repository"
import {Image} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";

export type ImageDto = {
    id: number;
    file: string;
    carId: number;
}

class BrandMapper implements Mapper<Image, ImageDto> {

    toDto(e: Image): ImageDto {
        return {
            id: e.image_id,
            file: e.image_file,
            carId: e.image_car_id,
        }
    }

    toEntity(t: ImageDto): Image {
        return {
            image_id: t.id,
            image_file: t.file,
            image_car_id: t.carId
        }
    }

    toEntityPartial(t: Partial<ImageDto>): Partial<Image> {
        return {
            image_id: t.id,
            image_file: t.file,
            image_car_id: t.carId
        }
    }
}

export default new CrudRepository<Image, ImageDto>(dbRepository, new BrandMapper());