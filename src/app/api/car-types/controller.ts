import CrudController from "@/lib/crud_controller";
import colorRepository from "@/app/api/car-types/repository";

export const crudController = new CrudController('car-types', colorRepository)