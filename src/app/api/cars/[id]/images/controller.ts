import CrudController from "@/lib/crud_controller";
import imageRepository from "./repository";

export const crudController = new CrudController('images', imageRepository)