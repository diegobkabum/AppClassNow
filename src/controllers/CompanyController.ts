import "reflect-metadata";
import { Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";

class CompanyController {
    async CreateCompany(request: Request, response:Response) {
        const {corporate_name,fantasy_name,CNPJ,address,address_number,district,complement,city,state,CEP,phone_contact,email_contact}  = request.body;
        const service = new CompanyService();

        const company = await service.execute({corporate_name,fantasy_name,CNPJ,address,address_number,district,complement,city,state,CEP,phone_contact,email_contact});

        if (company["error"]) {
            response.status(400);
        }

        return response.json(company);
    }

    async UpdateCompany(request: Request, response:Response) {
        const {corporate_name,fantasy_name,CNPJ,address,address_number,district,complement,city,state,CEP,phone_contact,email_contact}  = request.body;
        const service = new CompanyService();

        const company = await service.update({corporate_name,fantasy_name,CNPJ,address,address_number,district,complement,city,state,CEP,phone_contact,email_contact});

        if (company["error"]) {
            response.status(400);
        }

        return response.json(company);
    }

    async DeleteCompany(request: Request, response:Response) {
        const { CNPJ }  = request.params;
        const service = new CompanyService();

        const company = await service.delete(CNPJ);

        if (company["error"]) {
            response.status(400);
        }

        return response.json(company);
    }

    async getAllCompany(request: Request, response:Response) {
        const service = new CompanyService();

        const company = await service.getAll();

        if (company["error"]) {
            response.status(400);
        }

        return response.json(company);
    }

    async getCompanyForCNPJ(request: Request, response:Response) {
        const { CNPJ } = request.query;
        const service = new CompanyService();

        const company = await service.getFind(CNPJ.toString());

        if (company["error"]) {
            response.status(400);
        }

        return response.json(company);
    }
}

export { CompanyController };