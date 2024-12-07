import {OrderView} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";
import dbRepository from "./db_repository";

export type OrderDto = {
    id: number;
    price: number;
    createdAt: Date;
    car: {
        id: number;
        brandName: string;
        modelName: string;
        year: number;
        mileage: number;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            phone: string;
            cityId: number;
            cityName: string;
        }
    }
}

class OrderMapper implements Mapper<OrderView, OrderDto> {

    toDto(e: OrderView): OrderDto {
        return {
            id: e.order_id,
            price: e.order_price,
            createdAt: e.order_created_at,
            car: {
                id: e.order_car_id,
                brandName: e.brand_name,
                modelName: e.model_name,
                year: e.car_year,
                mileage: e.car_mileage,
                user: {
                    id: e.user_id,
                    firstName: e.user_first_name,
                    lastName: e.user_last_name,
                    phone: e.user_phone,
                    cityId: e.city_id,
                    cityName: e.city_name
                }
            }
        }
    }

    toEntity(t: OrderDto): OrderView {
        throw Error("Unexpected now")
    }

    toEntityPartial(t: Partial<OrderDto>): Partial<OrderView> {
        return {}
    }
}

export default new CrudRepository<OrderView, OrderDto>(dbRepository, new OrderMapper());
