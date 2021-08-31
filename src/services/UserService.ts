import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    admin?: boolean;
}

class UserService {
    async execute({ firstName, lastName, email, admin } : IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories);
        
        const  userExists = await usersRepository.findOne( {  email, });

        if (userExists) {
            return  {
                error: true,
                msg: "Usuario existe"
            };            
        }

        const user = usersRepository.create({
            firstName,
            lastName,
            email,
            admin
        });

        await usersRepository.save(user);

        return user;
    }

    async delete(email: string){
        const usersRepository = getCustomRepository(UserRepositories);
        
        const  userExists = await usersRepository.findOne( {  email, });

        if (!userExists) {
            return  {
                error: true,
                msg: "Usuario nao encontrado para exclusao."
            };            
        }

        const userDelete = await usersRepository.delete(userExists);

        if (userDelete["affected"] >= 1) {
            return  {
                error: false,
                msg: "Usuario excluido com sucesso."
            };      
        }
        else {
            return  {
                error: false,
                msg: "Nao foi possivel excluir o usuario."
            };      
        }        
    }

    async getAll() {
        const usersRepository = getCustomRepository(UserRepositories);

        const users = await usersRepository.query("select * from users", null);

        return users;
    }

    async getFind(email: string ) {
        const usersRepository = getCustomRepository(UserRepositories);

        const users = await usersRepository.findOne({ email });

        if (users) {
            return users;
        }
        else {
            return {
                error: true,
                msg: "Usuario nao localizado."
            };
        }
    }
}

export { UserService };