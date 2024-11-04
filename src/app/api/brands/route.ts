import {crudController} from "./controller";

export async function GET(request: Request) {
    return crudController.getAll(request)
}