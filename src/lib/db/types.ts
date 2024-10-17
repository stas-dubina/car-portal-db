import {
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

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

export interface CarTable {
    car_id: Generated<number>
    car_model_id: number
    car_year: number
    car_fuel_type_id: number
    car_gear_type_id: number
    car_mileage: number
    car_price: number
    car_user_id: number
    car_status: 'ON_SALE' | 'SOLD' | 'CANCELLED'
    car_color_id: number
    car_created_at: Date
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
