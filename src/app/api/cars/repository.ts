import {CarDriveType, CarStatus, CarView} from "@/lib/db/types";

export type CarDto = {
    id: number;
    year: number;
    mileage: number;
    price: number;
    status: CarStatus;
    created_at: Date;
    vin: string;
    description: string | null;
    accident: boolean;
    abroad: boolean;
    owner_number: number;
    in_credit: boolean;
    power: number;
    seat: number;
    drive_type: CarDriveType;
}

export type CarView = {

}

class CarMapper implements Mapper<CarView, CarDto> {
    toDto(e: CarView): CarDto {
        return {
            id: e.car_id,
        }
    }
}