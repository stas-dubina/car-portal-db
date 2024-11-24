import {crudController} from "../controller";

export type ImagePathParams = {
    id: number,
    imageId: number
}

export async function DELETE(request: Request, context: { params: ImagePathParams }) {
    return crudController.deleteOne(request, {params: {id: context.params.imageId}});
}