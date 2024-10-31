import dbRepository from "@/app/api/brands/db_repository";
import {Brand} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";

export type BrandDto = {
    id: number;
    name: string;
}

class BrandMapper implements Mapper<Brand, BrandDto> {

    toDto(e: Brand): BrandDto {
        return {
            id: e.brand_id,
            name: e.brand_name,
        }
    }

    toEntity(t: BrandDto): Brand {
        return {
            brand_id: t.id,
            brand_name: t.name,
        }
    }

    toEntityPartial(t: Partial<BrandDto>): Partial<Brand> {
        return {
            brand_id: t.id,
            brand_name: t.name,
        }
    }
}

export default new CrudRepository<Brand, BrandDto>(dbRepository, new BrandMapper());

