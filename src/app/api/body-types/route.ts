import {crudControllerView, crudControllerModify} from "./controller";

export async function GET(request: Request) {
    return crudControllerView.getAll(request)
}

export async function POST(request: Request) {
    return crudControllerModify.create(request)
}