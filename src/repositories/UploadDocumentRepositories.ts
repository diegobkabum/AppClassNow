import { Entity, EntityRepository,getRepository, Repository } from "typeorm";
import { UploadDocumentStudents } from "../entities/UploadDocumentStudents";
 
@EntityRepository(UploadDocumentStudents)
class UploadDocumentStudentsRespositories extends Repository<UploadDocumentStudents> {

}

export { UploadDocumentStudentsRespositories };