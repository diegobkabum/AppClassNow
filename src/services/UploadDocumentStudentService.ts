import { getCustomRepository  } from "typeorm";
import { UploadDocumentStudentsRespositories } from "../repositories/UploadDocumentRepositories";

interface IUploadDocumentStudentRequest {
    id_user: string;
    id_student: string;
    type_document: string;
    name_file: string;
}

class UploadDocumentStudentService {
    async uploadDocument({ id_user,id_student,type_document,name_file } : IUploadDocumentStudentRequest) {
        const uploadDocumentRepository = await getCustomRepository(UploadDocumentStudentsRespositories);

        const  uploadDocumentExists = await uploadDocumentRepository.findOne( {  id_student,id_user,type_document, });

        if (uploadDocumentExists) {
            return  {
                error: true,
                msg: "Documento ja cadastrado para o aluno, favor alterar o existente ou exlcuir e enviá-lo novamente.",
                data: null
            };            
        }

        const uploadDocumentStudent = await uploadDocumentRepository.create({
            id_user,
            id_student,
            type_document,
            name_file
        });

        await uploadDocumentRepository.save(uploadDocumentStudent);

        return {
            error: true,
            msg: "OK",
            data: uploadDocumentStudent
        };
    }
}

export { UploadDocumentStudentService };