import "reflect-metadata";
import { Request, Response,text } from "express";
import { UploadDocumentStudentService } from "../services/UploadDocumentStudentService";

class UploadDocumentStudentController {
    async CreateUploadDocumentStudent(request:Request, response:Response) {
        try
        {
            /*const { id_user,id_student,type_document,name_file } = request.body;

            const uploadDocumentService = new UploadDocumentStudentService();
    
            const uploadDocument        = await uploadDocumentService.uploadDocument({ id_user,id_student,type_document,name_file } );
            
            if (uploadDocument["error"]) {
                response.status(400);
            }
    
            return response.json(uploadDocument);*/
            var image  = request.headers;
            var image2  = request.rawHeaders;
            var image3  = request.body;
            
            console.log(image);
            console.log(image2);
            console.log(image3);
            return response.status(201).json({ msg: 'ok' });
        }
        catch {
            return response.status(500).json({
                error:true,
                msg: "Erro interno",
                data: null
            })
        }
    }
}

export { UploadDocumentStudentController };