import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import cors from "cors";
import { router } from "./router"

import "./database";

var morgan = require("morgan");
const bodyParser = require('body-parser');
const app = express();
import swaggerUi from 'swagger-ui-express';

const swaggerFile = require('./config/swagger_output')

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          error: err.message,
        });
      }
  
      return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
);

app.listen(3000, () => console.log("Server is running...."));