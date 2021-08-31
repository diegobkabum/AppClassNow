import { Router } from "express";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();


router.get('/users/getAll'    , userController.GetUsers);
router.get('/users/getEmail'  , userController.GetUserForEmail);
router.post('/users'          , userController.CreateUser);
router.delete('/users/:email' , userController.DeleteUser);

export { router };