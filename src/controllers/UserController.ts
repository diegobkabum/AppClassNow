import "reflect-metadata";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async CreateUser(request:Request, response:Response) {
        const { first_name, last_name, email,username,password,address,address_number,district,complement,city,state,CEP,phone_contact, admin } = request.body;

        const userService = new UserService();

        const user        = await userService.execute({ first_name, last_name, email,username,password,address,address_number,district,complement,city,state,CEP,phone_contact, admin });
        
        if (user["error"]) {
            response.status(400);
        }

        return response.json(user);
    }

    async UpdateUser(request:Request, response:Response) {
        const { email } = request.params;
        const { first_name, last_name,username,password,address,address_number,district,complement,city,state,CEP,phone_contact, admin } = request.body;

        const userService = new UserService();

        const user = await userService.update({ first_name, last_name,email,username,password,address,address_number,district,complement,city,state,CEP,phone_contact, admin });

        if (user["error"]) {
            response.status(400);
        }

        return response.json(user);
    }

    async DeleteUser(request:Request, response:Response) {
        const { email } = request.params;

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

        user["data"].forEach(element => {
            element.password = undefined;
        });

        return response.json(user);
    }

    async GetUserForEmail(request:Request, response:Response) {
        const email   = request.query.email;
        
        const userService = new UserService();

        const user = await userService.getFind(email.toString());

        if (user["error"]) {
            response.status(400);
        }


        user["data"].password = undefined;

        return response.json(user);
    }
}

export { UserController };