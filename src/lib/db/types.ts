import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export type CarDriveType = 'AWD' | 'RWD' | 'FWD'
export type CarStatus = 'ON_SALE' | 'SOLD' | 'CANCELLED'

export interface Database {
    brand: BrandTable
    model: ModelTable
    color: ColorTable
    fuel_type: FuelTypeTable
    city: CityTable
    gear_type: GearTypeTable
    account: AccountTable
    user: UserTable
    car: CarTable
    body_type: BodyTypeTable
    car_type: CarTypeTable
    feature: FeatureTable
    car_feature: CarFeatureTable
    image: ImageTable
    order: OrderTable
}

export interface CarTable {
    car_id: Generated<number>
    car_model_id: number
    car_year: number
    car_fuel_type_id: number
    car_gear_type_id: number
    car_mileage: number
    car_price: number
    car_user_id: number
    car_status: CarStatus
    car_color_id: number
    car_created_at: Date
    car_vin: string
    car_description: string | null
    car_body_type_id: number
    car_accident: boolean
    car_abroad: boolean
    car_owner_number: number
    car_in_credit: boolean
    car_power: number
    car_seat: number
    car_drive_type: CarDriveType
}

export interface BodyTypeTable {
    body_type_id: Generated<number>
    body_type_name: string
    body_car_type_id: number
}

export interface CarTypeTable {
    car_type_id: Generated<number>
    car_type_name: string
}

export interface BodyTypeView {
    body_type_id: number
    body_type_name: string
    car_type_id: number
    car_type_name: string
}

export interface FeatureTable {
    feature_id: Generated<number>
    feature_name: string
}

export interface CarFeatureTable {
    car_id: number
    feature_id: number
}

export interface ImageTable {
    image_id: Generated<number>
    image_file: string
    image_car_id: number
}

export interface OrderTable {
    order_id: Generated<number>
    order_car_id: number
    order_price: number
    order_created_at: Date
}

export interface BrandTable {
    brand_id: Generated<number>
    brand_name: string
}

export interface ModelTable {
    model_id: Generated<number>
    model_name: string
    model_brand_id: number
}

export interface ColorTable {
    color_id: Generated<number>
    color_name: string
    color_value: string
}

export interface FuelTypeTable {
    fuel_type_id: Generated<number>
    fuel_type_name: string
}

export interface CityTable {
    city_id: Generated<number>
    city_name: string
}

export interface GearTypeTable {
    gear_type_id: Generated<number>
    gear_type_name: string
}

export interface CarView {
    car_id: number;
    car_brand_id: number;
    car_brand_name: string;
    car_model_id: number;
    car_model_name: string;
    car_year: number;
    car_fuel_type_id: number;
    car_fuel_type_name: string;
    car_gear_type_id: number;
    car_gear_type_name: string;
    car_mileage: number;
    car_price: number;
    car_user_id: number;
    car_user_first_name: string;
    car_user_last_name: string;
    car_user_phone: string;
    car_user_email: string;
    car_status: CarStatus;
    car_color_id: number;
    car_color_name: string;
    car_color_value: string;
    car_created_at: Date;
    car_vin: string;
    car_description: string | null;
    car_body_type_id: number;
    car_body_type_name: string;
    car_accident: boolean;
    car_abroad: boolean;
    car_owner_number: number;
    car_in_credit: boolean;
    car_power: number;
    car_seat: number;
    car_drive_type: CarDriveType;
}

export interface AccountTable {
    user_id: Generated<number>
    user_login: string
    user_password_hash: string
    user_created_at: Date
}

export interface UserTable {
    user_id: number
    user_first_name: string
    user_last_name: string
    user_phone: string
    user_city_id: number
    user_email: string
}

export interface UserView {
    user_id: number
    user_created_at: Date
    user_login: string
    user_first_name: string
    user_last_name: string
    user_phone: string
    user_email: string
    user_city_id: number
    user_city_name: string
}

// Типы для каждой таблицы
export type Brand = Selectable<BrandTable>
export type NewBrand = Insertable<BrandTable>
export type UpdateBrand = Updateable<BrandTable>

export type Model = Selectable<ModelTable>
export type NewModel = Insertable<ModelTable>
export type UpdateModel = Updateable<ModelTable>

export type Color = Selectable<ColorTable>
export type NewColor = Insertable<ColorTable>
export type UpdateColor = Updateable<ColorTable>

export type FuelType = Selectable<FuelTypeTable>
export type NewFuelType = Insertable<FuelTypeTable>
export type UpdateFuelType = Updateable<FuelTypeTable>

export type City = Selectable<CityTable>
export type NewCity = Insertable<CityTable>
export type UpdateCity = Updateable<CityTable>

export type GearType = Selectable<GearTypeTable>
export type NewGearType = Insertable<GearTypeTable>
export type UpdateGearType = Updateable<GearTypeTable>

export type Account = Selectable<AccountTable>
export type NewAccount = Insertable<AccountTable>
export type UpdateAccount = Updateable<AccountTable>

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UpdateUser = Updateable<UserTable>

export type Car = Selectable<CarTable>
export type NewCar = Insertable<CarTable>
export type UpdateCar = Updateable<CarTable>

export type Image = Selectable<ImageTable>
export type NewImage = Insertable<ImageTable>
export type UpdateImage = Updateable<ImageTable>

export type CarFeature = Selectable<CarFeatureTable>
export type NewCarFeature = Insertable<CarFeatureTable>
export type UpdateCarFeature = Updateable<CarFeatureTable>

export type Feature = Selectable<FeatureTable>
export type NewFeature = Insertable<FeatureTable>
export type UpdateFeature = Updateable<FeatureTable>

export type Order = Selectable<OrderTable>
export type NewOrder = Insertable<OrderTable>
export type UpdateOrder = Updateable<OrderTable>

export type CarType = Selectable<CarTypeTable>
export type NewCarType = Insertable<CarTypeTable>
export type UpdateCarType = Updateable<CarTypeTable>

export type BodyType = Selectable<BodyTypeTable>
export type NewBodyType = Insertable<BodyTypeTable>
export type UpdateBodyType = Updateable<BodyTypeTable>

