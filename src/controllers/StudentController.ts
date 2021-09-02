import "reflect-metadata";
import { Request,Response  } from "express";
import { StudentService } from "../services/StudentService";

class StudentController {
    async CreateStudent(request:Request, response:Response) {
        const { id_user, first_name,last_name, birth_date,age,RG,CPF,class_student } = request.body;

        const studentService = new StudentService();

        const student        = await studentService.execute({ id_user, first_name,last_name, birth_date,age,RG,CPF,class_student });
        
        if (student["error"]) {
            response.status(400);
        }

        return response.json(student);
    }

    async UpdateStudent(request:Request, response:Response) {
        const { CPF,id_user } = request.params;
        const { first_name,last_name, birth_date,age,RG,class_student } = request.body;

        const studentService = new StudentService();

        const student = await studentService.update({ id_user,first_name,last_name, birth_date,age,RG,CPF,class_student });

        if (student["error"]) {
            response.status(400);
        }

        return response.json(student);
    }

    async DeleteStudent(request:Request, response:Response) {
        const { CPF, id_user } = request.params;

        const studentService = new StudentService();

        const student = await studentService.delete(CPF,id_user);

        if (student["error"]) {
            response.status(400);
        }

        return response.json(student);
    }

    async GetStudents(request:Request, response:Response) {
        const studentService = new StudentService();

        const student = await studentService.getAll();

        return response.json(student);
    }

    async GetStudentForUserIdCPF(request:Request, response:Response) {
        try {
            const { CPF, id_user }  = request.query;
        
            const studentService = new StudentService();
    
            const student = await studentService.getFind(CPF.toString(),id_user.toString());
    
            if (student["error"]) {
                response.status(400);
            }
    
            return response.json(student);
        }
        catch {
            return response.status(500).json({
                error: true,
                msg: "Nao foi possivel buscar o aluno, verifique os parametros ou entre em contato com o suporte",
                data:null
            });
        }        
    }

    async GetStudentForUserId(request:Request, response:Response) {
        try {
            const {  id_user }  = request.query;
        
            const studentService = new StudentService();
    
            const student = await studentService.getStudentIdUser(id_user.toString());
    
            if (student["error"]) {
                response.status(400);
            }
    
            return response.json(student);
        }
        catch {
            return response.status(500).json({
                error: true,
                msg: "Nao foi possivel buscar os alunos, verifique os parametros ou entre em contato com o suporte",
                data:null
            });
        }
        
    }
}

export { StudentController };