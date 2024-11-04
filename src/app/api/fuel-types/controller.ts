import CrudController from "@/lib/crud_controller";
import fuelTypeRepository from "@/app/api/fuel-types/repository";

export const crudController = new CrudController('fuel-types', fuelTypeRepository)