import {PathParams} from "@/lib/crud_controller";
import {crudController} from "../controller";

export async function GET(request: Request, context: { params: PathParams }) {
    return crudController.getOne(request, context)
}

export async function DELETE(request: Request, context: { params: PathParams }) {
    return crudController.deleteOne(request, context)
}

export async function PUT(request: Request, context: { params: PathParams }) {
    return crudController.updateOne(request, context)
}
