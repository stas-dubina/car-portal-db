export type CarSearchFilter = {
    accident?: boolean,
    driveType?: string,
    inCredit?: boolean,
    abroad?: boolean,
    status?: string,
    userId?: number,
    brandId?: number,
    priceMin?: number,
    priceMax?: number,
    yearMin?: number,
    yearMax?: number,
    mileageMin?: number,
    mileageMax?: number
}