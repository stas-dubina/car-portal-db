import {CarDriveType, CarStatus, CarView} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";
import dbRepository from "@/app/api/cars/db_repository";
import {Generated} from "kysely";

export type CarDto = {
    id: number
    year: number;
    mileage: number;
    price: number;
    status: 'ON_SALE' | 'SOLD' | 'CANCELLED'
    created_at: Date;
    vin: string;
    description: string | null;
    accident: boolean;
    abroad: boolean;
    owner_number: number;
    in_credit: boolean;
    power: number;
    seat: number;
    drive_type: 'AWD' | 'RWD' | 'FWD'
}

export type CarView = {
    id: number;
    year: number;
    mileage: number;
    price: number;
    status: 'ON_SALE' | 'SOLD' | 'CANCELLED'
    created_at: Date;
    vin: string;
    description: string | null;
    accident: boolean;
    abroad: boolean;
    owner_number: number;
    in_credit: boolean;
    power: number;
    seat: number;
    drive_type: 'AWD' | 'RWD' | 'FWD'
}

class CarMapper implements Mapper<CarView, CarDto> {
    toDto(e: CarView): CarDto {
        return {
            id: e.car_id,
            year: e.car_year,
            mileage: e.car_mileage,
            price: e.car_price,
            status: e.car_status,
            created_at: e.car_created_at,
            vin: e.car_vin,
            description: e.car_description,
            accident: e.car_accident,
            abroad: e.car_abroad,
            owner_number: e.car_owner_number,
            in_credit: e.car_in_credit,
            power: e.car_power,
            seat: e.car_seat,
            drive_type: e.car_drive_type
        }
    }

    toEntity(t: CarDto): CarView {
        return {
            car_id: t.id,
            car_year: t.year,
            car_mileage: t.mileage,
            car_price: t.price,
            car_status: t.status,
            car_created_at: t.created_at,
            car_vin: t.vin,
            car_description: t.description,
            car_accident: t.accident,
            car_abroad: t.abroad,
            car_owner_number: t.owner_number,
            car_in_credit: t.in_credit,
            car_power: t.power,
            car_seat: t.seat,
            car_drive_type: t.drive_type
        }
    }

    toEntityPartial(t: Partial<CarDto>): Partial<CarView> {
        return {
            car_id: t.id,
            car_year: t.year,
            car_mileage: t.mileage,
            car_price: t.price,
            car_status: t.status,
            car_created_at: t.created_at,
            car_vin: t.vin,
            car_description: t.description,
            car_accident: t.accident,
            car_abroad: t.abroad,
            car_owner_number: t.owner_number,
            car_in_credit: t.in_credit,
            car_power: t.power,
            car_seat: t.seat,
            car_drive_type: t.drive_type
        }
    }
}

export default new CrudRepository<CarView, CarDto>(dbRepository, new CarMapper());