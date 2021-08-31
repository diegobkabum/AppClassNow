import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAuthenticated } from "./midlewares/ensureAuthenticated";

const router = Router();

const userController             = new UserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/login", authenticateUserController.handle);
router.get('/users/getAll'    ,ensureAuthenticated  , userController.GetUsers);
router.get('/users/getEmail'  ,ensureAuthenticated  , userController.GetUserForEmail);
router.post('/users'          ,ensureAuthenticated  , userController.CreateUser);
router.put('/users/:email'    ,ensureAuthenticated  , userController.UpdateUser);
router.delete('/users/:email' ,ensureAuthenticated  , userController.DeleteUser);

export { router };