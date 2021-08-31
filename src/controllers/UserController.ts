import "reflect-metadata";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async CreateUser(request:Request, response:Response) {
        const { firstName, lastName, email,username,password, admin } = request.body;

        const userService = new UserService();

        const user        = await userService.execute({ firstName, lastName, email,username,password, admin });
        
        if (user["error"]) {
            response.status(400);
        }

        return response.json(user);
    }

    async UpdateUser(request:Request, response:Response) {
        const { email } = request.params;
        const { firstName, lastName,username,password, admin } = request.body;
        console.log(email);

        const userService = new UserService();

        const user = await userService.update({ firstName, lastName,email,username,password,  admin });

        if (user["error"]) {
            response.status(400);
        }

        return response.json(user);
    }

    async DeleteUser(request:Request, response:Response) {
        const { email } = request.params;
        console.log(email);

        const userService = new UserService();

        const user = await userService.delete(email);

        if (user["error"]) {
            response.status(400);
        }

        return response.json(user);
    }

    async GetUsers(request:Request, response:Response) {
        const userService = new UserService();

        const user = await userService.getAll();

        return response.json(user);
    }

    async GetUserForEmail(request:Request, response:Response) {
        console.log(request.query.email);

        const { email }  = request.query;
        
        const userService = new UserService();

        const user = await userService.getFind(email.toString());

        if (user["error"]) {
            response.status(400);
        }

        return response.json(user);
    }
}

export { UserController };