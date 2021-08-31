import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const  authConfig  = require("../config/auth");

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: true, msg: "Token invalid", data:null});
  }

  const params = authToken.split(" ");
  
  if (params.length <= 1) {
    return response.status(401).json({ error: true, msg: "Token invalid", data:null});
  }

  if (!/Bearer$/i.test(params[0])) {
    return response.status(401).json({ error: true, msg: "Token invalid", data:null});
  }

  try {
    const { sub } = verify(
        params[1],
        authConfig.secret
    ) as IPayload;

    return next();
  } catch (err) {
    return response.status(401).json({ error: true, msg: "Token invalid", data:null});
  }
}