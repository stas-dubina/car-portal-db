import CrudController from "@/lib/crud_controller";
import cityRepository from "@/app/api/cities/repository";

export const crudController = new CrudController('cities', cityRepository)