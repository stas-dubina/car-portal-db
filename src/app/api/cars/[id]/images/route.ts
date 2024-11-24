import {NextRequest, NextResponse} from "next/server";
import {join} from "path";
import {mkdir, stat, writeFile} from "fs/promises";
import {PathParams} from "@/lib/crud_controller";
import {v4 as uuidv4} from 'uuid';
import mime from "mime";
import repository from "./repository";
import {crudController} from "./controller";
import {SearchParamsParser} from "@/lib/params/search_params";

export async function GET(request: Request, context: { params: PathParams }) {
    const carId = context.params.id;

    const searchParams = SearchParamsParser(request);
    const result = await repository.findAll(searchParams.ids, undefined, {carId: carId});

    return NextResponse.json(
        result.list,
        {
            status: 200,
            headers: {
                'Access-Control-Expose-Headers': 'Content-Range',
                'Content-Range': `images ${searchParams.range?.start}-${searchParams.range?.end}/${result.total}`
            }
        });
}


export async function POST(req: NextRequest, context: { params: PathParams }) {
    const carId = context.params.id;

    const formData = await req.formData();
    const image = formData.get("file") as File || null;

    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `uploads/cars/${carId}`

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
        await createUploadDir(uploadDir)
    } catch (e) {
        return NextResponse.json(
            {error: "Не можна зберегти зображення."},
            {status: 500}
        );
    }
    const fileId = uuidv4();
    const fileExtension = mime.getExtension(image.type)

    const fileName = `${fileId}.${fileExtension}`

    await writeFile(`${uploadDir}/${fileName}`, buffer);
    const dbImage = await repository.create({
        id: 0,
        file: fileName,
        carId: carId
    })
    return NextResponse.json(dbImage, {status: 200});
}

async function createUploadDir(uploadDir: any) {
    try {
        await stat(uploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
            // Директорiя вiдсутня. Треба створити.
            await mkdir(uploadDir, {recursive: true});
        } else {
            console.error("Невiдома помилка", e);
            throw e;
        }
    }
}