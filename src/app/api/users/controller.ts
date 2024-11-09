import CrudController from "@/lib/crud_controller";
import userRepository from "@/app/api/users/repository";

export const crudController = new CrudController('users', userRepository)