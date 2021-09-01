import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    address: string;
    address_number: string;
    district: string;
    complement: string;
    city: string;
    state: string;
    CEP: string;
    phone_contact: string;
    admin?: boolean;
}

class UserService {
    async execute({ firstName, lastName, email,username,password,address,address_number,district,complement,city,state,CEP, phone_contact, admin } : IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories);
        
        const  userExists = await usersRepository.findOne( {  email, });

        if (userExists) {
            return  {
                error: true,
                msg: "Email ja cadastrado. Caso for o proprietario da conta, favor recuperar a senha ou realizar o login!",
                data: null
            };            
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            firstName,
            lastName,
            email,
            username,
            password: passwordHash,
            address,
            address_number,
            district,
            complement,
            city,
            state,
            CEP,
            phone_contact,
            admin
        });

        await usersRepository.save(user);
        
        user["password"] = undefined;

        return {
            error: false,
            msg: "OK",
            data: user,
        };
    }

    async update({ firstName, lastName, email,username,password,address,address_number,district,complement,city,state,CEP,phone_contact, admin } : IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories);
        
        const  userExists = await usersRepository.findOne( {  email, });

        if (!userExists) {
            return  {
                error: true,
                msg: "Usuario nao existe para realizar alteracao",
                data: null
            };            
        }        

        const passwordHash = await hash(password, 8);

        userExists["firstName"] = firstName;
        userExists["lastName"]  = lastName;
        userExists["username"]  = username;
        userExists["password"]  = passwordHash;
        userExists["address"]   = address;
        userExists["address_number"] = address_number;
        userExists["district"]       = district;
        userExists["complement"]     = complement;
        userExists["city"]           = city;
        userExists["state"]          = state;
        userExists["CEP"]            = CEP;
        userExists["phone_contact"]  = phone_contact;
        userExists["admin"]     = admin;

        const userUpdated = await usersRepository.save(userExists);
        
        userUpdated["password"] = undefined;

        if (userUpdated) {
            return  {
                error: false,
                msg: "Usuario alterado com sucesso.",
                data: userUpdated
            };      
        }
        else {
            return  {
                error: false,
                msg: "Problemas ao alterar o usuario.",
                data: userUpdated
            };      
        }  
    }

    async delete(email: string){
        const usersRepository = getCustomRepository(UserRepositories);
        
        const  userExists = await usersRepository.findOne( {  email, });

        if (!userExists) {
            return  {
                error: true,
                msg: "Usuario nao encontrado para exclusao.",
                data:null
            };            
        }

        const userDelete = await usersRepository.delete(userExists);

        if (userDelete["affected"] >= 1) {
            return  {
                error: false,
                msg: "Usuario excluido com sucesso.",
                data:userDelete
            };      
        }
        else {
            return  {
                error: false,
                msg: "Problemas ao excluir o usuario.",
                data:userDelete
            };      
        }        
    }

    async getAll() {
        const usersRepository = getCustomRepository(UserRepositories);

        const users = await usersRepository.query("select * from users", null);

        return {
            error: false,
            msg: "OK",
            data:users
        };
    }

    async getFind(email: string ) {
        const usersRepository = getCustomRepository(UserRepositories);

        const users = await usersRepository.findOne({ email });

        if (users) {
            return {
                error: false,
                msg: "OK",
                data:users
            };
        }
        else {
            return {
                error: true,
                msg: "Usuario nao localizado.",
                data:null
            };
        }
    }
}

export { UserService };