import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CompanyController } from "./controllers/CompanyController";
import { StudentController } from "./controllers/StudentController";
import { UploadDocumentStudentController } from "./controllers/UploadDocumentStudentController";

import { ensureAuthenticated } from "./midlewares/ensureAuthenticated";

const router = Router();

const userController             = new UserController();
const authenticateUserController = new AuthenticateUserController();
const companyController          = new CompanyController();
const studentController          = new StudentController();
const uploadDocumentController   = new UploadDocumentStudentController();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//Rota Login e busca token
router.post('/login', authenticateUserController.handle, (req, res) => {
    /*
      #swagger.description = 'Route for user authentication.'
    */
        /*
      #swagger.tags  = ['Login']
     */
    /*
      #swagger.parameters['data'] = {    
        description: 'Email e password do usuario.',    
        type: 'object',    
        required: true,    
        in: 'body',    
        schema: {$ref: "#/definitions/Login" }
      }*/        
});

//Rotas usuários
router.get('/users/all'    ,ensureAuthenticated  , userController.GetUsers, (req,res) => {/*
        /*
            #swagger.description = 'Busca todos os usuarios.'
        */
        /*
            #swagger.tags  = ['Users']
        */
});
router.get('/users/user'  ,ensureAuthenticated  , userController.GetUserForEmail,(req,res) => {/*
    /*
        #swagger.description = 'Busca usuario pelo email.'
    */
    /*
        #swagger.tags  = ['Users']
    */
   /*
      #swagger.parameters['email'] = {    
        description: 'Email do usuario.',    
        type: 'string',    
        required: true,    
        in: 'query',    
        example: 'teste@gmail.com'
      }*/ 
});
router.post('/users'          ,ensureAuthenticated  , userController.CreateUser,(req,res) => {/*
    /*
        #swagger.description = 'incluir um usuario.'
    */
    /*
        #swagger.tags  = ['Users']
    */
    /*
      #swagger.parameters['data'] = {    
        description: 'Dados para inserir o usuario.',    
        type: 'object',    
        required: true,    
        in: 'body',    
        schema: {$ref: "#/definitions/User" }
      }*/   
});
router.put('/users/:email'    ,ensureAuthenticated  , userController.UpdateUser,(req,res) => {/*
    /*
        #swagger.description = 'alterar um usuario.'
    */
    /*
        #swagger.tags  = ['Users']
    */
});
router.delete('/users/:email' ,ensureAuthenticated  , userController.DeleteUser,(req,res) => {/*
    /*
        #swagger.description = 'excluir um usuario.'
    */
    /*
        #swagger.tags  = ['Users']
    */
});

//Rotas empresas
router.get('/companys/all'    ,ensureAuthenticated  , companyController.getAllCompany,(req,res) => {/*
    /*
        #swagger.description = 'excluir um usuario.'
    */
    /*
        #swagger.tags  = ['Companys']
    */
});
router.get('/companys/company'  ,ensureAuthenticated  , companyController.getCompanyForCNPJ,(req,res) => {/*
    /*
        #swagger.description = 'buscar uma empresa pelo CNPJ.'
    */
    /*
        #swagger.tags  = ['Companys']
    */
      /*
      #swagger.parameters['CNPJ'] = {    
        description: 'CNPJ da empresa.',    
        type: 'string',    
        required: true,    
        in: 'query',    
        example: '12555899000156'
      }*/ 
});
router.post('/companys'          ,ensureAuthenticated  , companyController.CreateCompany,(req,res) => {/*
    /*
        #swagger.description = 'incluir uma empresa.'
    */
    /*
        #swagger.tags  = ['Companys']
    */
       /*
      #swagger.parameters['data'] = {    
        description: 'Dados para inserir a empresa.',    
        type: 'object',    
        required: true,    
        in: 'body',    
        schema: {$ref: "#/definitions/Company" }
      }*/   
});
router.put('/companys/:CNPJ'    ,ensureAuthenticated  , companyController.UpdateCompany,(req,res) => {/*
    /*
        #swagger.description = 'alterar uma empresa.'
    */
    /*
        #swagger.tags  = ['Companys']
    */
});
router.delete('/companys/:CNPJ' ,ensureAuthenticated  , companyController.DeleteCompany,(req,res) => {/*
    /*
        #swagger.description = 'excluir uma empresa.'
    */
    /*
        #swagger.tags  = ['Companys']
    */
});

//Rotas Student
router.get('/students/all'    ,ensureAuthenticated  , studentController.GetStudents,(req,res) => {/*
    /*
        #swagger.description = 'Buscar todos os alunos.'
    */
    /*
        #swagger.tags  = ['Student']
    */
});
router.get('/students/student'  ,ensureAuthenticated  , studentController.GetStudentForUserIdCPF,(req,res) => {/*
    /*
        #swagger.description = 'Buscar aluno pelo CPF e id_usuario.'
    */
    /*
        #swagger.tags  = ['Student']
    */
      /*
      #swagger.parameters['CPF'] = {    
        description: 'CPF do Aluno.',    
        type: 'string',    
        required: true,    
        in: 'query',    
        example: '55589866698'
      }*/ 
         /*
      #swagger.parameters['id_user'] = {    
        description: 'identificacao do usuario vinculado ao aluno.',    
        type: 'string',    
        required: true,    
        in: 'query',    
        example: '8ee3d82d-582-4321-357f-a5c444062310'
      }*/ 
});
router.get('/students/studentIdUser'  ,ensureAuthenticated  , studentController.GetStudentForUserId,(req,res) => {/*
    /*
        #swagger.description = 'Buscar varios alunos vinculado pelo id_usuario.'
    */
    /*
        #swagger.tags  = ['Student']
    */
            /*
      #swagger.parameters['id_user'] = {    
        description: 'identificacao do usuario vinculado ao aluno.',    
        type: 'string',    
        required: true,    
        in: 'query',    
        example: '8ee3d82d-582-4321-357f-a5c444062310'
      }*/ 
});
router.post('/students'          ,ensureAuthenticated  , studentController.CreateStudent,(req,res) => {/*
    /*
        #swagger.description = 'incluir um aluno.'
    */
    /*
        #swagger.tags  = ['Student']
    */
       /*
      #swagger.parameters['data'] = {    
        description: 'Dados para inserir o aluno.',    
        type: 'object',    
        required: true,    
        in: 'body',    
        schema: {$ref: "#/definitions/Student" }
      }*/   
});
router.put('/students/:id_user/:CPF'    ,ensureAuthenticated  , studentController.UpdateStudent,(req,res) => {/*
    /*
        #swagger.description = 'alterar um aluno.'
    */
    /*
        #swagger.tags  = ['Student']
    */
});
router.delete('/students/:id_user/:CPF' ,ensureAuthenticated  , studentController.DeleteStudent,(req,res) => {/*
    /*
        #swagger.description = 'excluir um aluno.'
    */
    /*
        #swagger.tags  = ['Student']
    */
});

//Rotas upload document students
router.post('/upload/documents/student', upload.single('foto'),ensureAuthenticated, uploadDocumentController.CreateUploadDocumentStudent);

export { router };