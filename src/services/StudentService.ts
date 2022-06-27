import { getCustomRepository  } from "typeorm";
import { StudentRepositories } from "../repositories/StudentRepositories";

interface IStudentInterface {
    id_user: string;
    first_name: string;
    last_name: string;
    birth_date: Date;
    age: number;
    RG: string;
    CPF: string;
    class_student: string;
}

class StudentService {
    async execute({ id_user, first_name,last_name, birth_date,age,RG,CPF,class_student } : IStudentInterface) {
        const studentsRepository = getCustomRepository(StudentRepositories);

        const  studentExists = await studentsRepository.findOne( {  CPF,id_user, });

        if (studentExists) {
            return  {
                error: true,
                msg: "Aluno ja cadastrado.",
                data: null
            };            
        }

        var dateDif = new Date();
        var difAge = dateDif.getFullYear() - new Date(birth_date).getFullYear();
        
        if ( new Date(dateDif.getFullYear(), dateDif.getMonth(), dateDif.getDate()) < 
             new Date(dateDif.getFullYear(), new Date(birth_date).getMonth(), new Date(birth_date).getDate()) )
             difAge--;
        
        age = difAge;

        const student = studentsRepository.create({
            id_user,
            first_name,
            last_name,
            birth_date,
            age,
            RG,
            CPF,
            class_student
        });

        await studentsRepository.save(student);        

        return {
            error: false,
            msg: "OK",
            data: student,
        };
    }

    async update( { id_user, first_name,last_name, birth_date,age,RG,CPF,class_student } : IStudentInterface) {
        const studentsRepository = getCustomRepository(StudentRepositories);
        
        const studentExists = await studentsRepository.findOne( {  id_user,  });

        if (!studentExists) {
            return  {
                error: true,
                msg: "Aluno nao existe para realizar alteracao",
                data: null
            };            
        }        

        studentExists["first_name"] = first_name;
        studentExists["last_name"]  = last_name;
        studentExists["birth_date"] = birth_date;
        studentExists["age"]        = age;
        studentExists["RG"]         = RG;
        studentExists["class_student"] = class_student;

        const studentUpdated = await studentsRepository.save(studentExists);    

        if (studentUpdated) {
            return  {
                error: false,
                msg: "Aluno alterado com sucesso.",
                data: studentUpdated
            };      
        }
        else {
            return  {
                error: false,
                msg: 'Problemas ao alterar o aluno.',
                data: null
            };      
        }
    }

    async delete(CPF: string, id_user: string){
        const studentsRepository = getCustomRepository(StudentRepositories);
        
        const  studentExists = await studentsRepository.findOne( {  CPF,id_user, });

        if (!studentExists) {
            return  {
                error: true,
                msg: "Aluno nao encontrado para exclusao.",
                data:null
            };            
        }

        const userDelete = await studentsRepository.delete(studentExists);

        if (userDelete["affected"] >= 1) {
            return  {
                error: false,
                msg: "Aluno excluido com sucesso.",
                data:userDelete
            };      
        }
        else {
            return  {
                error: false,
                msg: "Problemas ao excluir o aluno.",
                data:userDelete
            };      
        }        
    }

    async getAll() {
        const studentsRepository = getCustomRepository(StudentRepositories);
        
        const students = await studentsRepository.find();

        return {
            error: false,
            msg: "OK",
            data:students
        };
    }

    async getFind(CPF: string, id_user: string ) {
        const studentsRepository = getCustomRepository(StudentRepositories);

        const  student = await studentsRepository.findOne( {  CPF,id_user, });

        if (student) {
            return {
                error: false,
                msg: "OK",
                data:student
            };
        }
        else {
            return {
                error: true,
                msg: "Aluno nao localizado.",
                data:null
            };
        }
    }

    async getStudentIdUser(id_user: string ) {
        const studentsRepository = getCustomRepository(StudentRepositories);

        const  student = await studentsRepository.find( {  id_user, });

        if (student) {
            return {
                error: false,
                msg: "OK",
                data: student
            };
        }
        else {
            return {
                error: true,
                msg: "Aluno nao localizado.",
                data: [null]
            };
        }
    }
}

export { StudentService };