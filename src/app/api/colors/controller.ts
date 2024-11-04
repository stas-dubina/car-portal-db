import CrudController from "@/lib/crud_controller";
import colorRepository from "@/app/api/colors/repository";

export const crudController = new CrudController('colors', colorRepository)