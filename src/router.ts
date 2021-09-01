import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CompanyController } from "./controllers/CompanyController";

import { ensureAuthenticated } from "./midlewares/ensureAuthenticated";

const router = Router();

const userController             = new UserController();
const authenticateUserController = new AuthenticateUserController();
const companyController          = new CompanyController();

//Rota Login e busca token
router.post('/login', authenticateUserController.handle);

//Rotas usuários
router.get('/users/getAll'    ,ensureAuthenticated  , userController.GetUsers);
router.get('/users/getEmail'  ,ensureAuthenticated  , userController.GetUserForEmail);
router.post('/users'          ,ensureAuthenticated  , userController.CreateUser);
router.put('/users/:email'    ,ensureAuthenticated  , userController.UpdateUser);
router.delete('/users/:email' ,ensureAuthenticated  , userController.DeleteUser);

//Rotas empresas
router.get('/companys/getAll'    ,ensureAuthenticated  , companyController.getAllCompany);
router.get('/companys/getCNPJ'  ,ensureAuthenticated  , companyController.getCompanyForCNPJ);
router.post('/companys'          ,ensureAuthenticated  , companyController.CreateCompany);
router.put('/companys/:CNPJ'    ,ensureAuthenticated  , companyController.UpdateCompany);
router.delete('/companys/:CNPJ' ,ensureAuthenticated  , companyController.DeleteCompany);

export { router };