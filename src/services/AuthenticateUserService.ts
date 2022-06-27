import { getCustomRepository, Timestamp } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepositories } from "../repositories/UserRepositories";

const  authConfig  = require("../config/auth");

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UserRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
        return { error:true, 
                 msg:"User not found",
                 data: null
        };
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return { error:true, 
               msg:"Password incorrect",
               data: null
      };
    }

    const token = sign(
      {
        email: user.email,
      },
      authConfig.secret,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    
    var date = new Date();
    var expires = new Date(date.getFullYear(),date.getMonth(),date.getDay() + 1);
    
    return { 
        error: false, 
        msg:"OK",
        data: {
            token:  token,
            expiresIn: expires
        }
    };
  }
}

export { AuthenticateUserService };