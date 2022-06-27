
import { getCustomRepository } from "typeorm";
import { CompanyRepositories } from "../repositories/CompanyRepositories";

interface ICompanyRequest {
    corporate_name: string;
    fantasy_name: string;
    CNPJ: string;
    address: string;
    address_number: string;
    district: string;
    complement: string;
    city: string;
    state: string;
    CEP: string;
    phone_contact: string;    
    email_contact: string;
}

class CompanyService {
    async execute({corporate_name,fantasy_name,CNPJ,address,address_number,district,complement,city,state,CEP,phone_contact,email_contact} : ICompanyRequest) {
        const companyRepository = getCustomRepository(CompanyRepositories);

        const companyExists = await companyRepository.findOne({ CNPJ, })

        if (companyExists) {
            return {
                error: true,
                msg: "Empresa ja cadastrada.",
                data:null
            };
        }

        const company = companyRepository.create({
            corporate_name,
            fantasy_name,
            CNPJ,
            address,
            address_number,
            district,
            complement,
            city,
            state,
            CEP,
            phone_contact,
            email_contact
        });

        await companyRepository.save(company);

        return {
            error: false,
            msg: "OK",
            data: company
        };
    }

    async update({corporate_name,fantasy_name,CNPJ,address,address_number,district,complement,city,state,CEP,phone_contact,email_contact} : ICompanyRequest){
        const companyRepository = getCustomRepository(CompanyRepositories);

        const companyExists = await companyRepository.findOne({ CNPJ, })

        if (!companyExists) {
            return  {
                error: true,
                msg: "Empresa nao existe para realizar alteracao",
                data: null
            };            
        }        

        companyExists["corporate_name"] = corporate_name;
        companyExists["fantasy_name"]   = fantasy_name;
        companyExists["address"]        = address;
        companyExists["address_number"] = address_number;
        companyExists["district"]       = district;
        companyExists["complement"]     = complement;
        companyExists["city"]           = city;
        companyExists["state"]          = state;
        companyExists["CEP"]            = CEP;
        companyExists["phone_contact"]  = phone_contact;
        companyExists["email_contact"]  = email_contact;

        const companyUpdated = await companyRepository.save(companyExists);

        if (companyUpdated) {
            return  {
                error: false,
                msg: "Empresa alterada com sucesso.",
                data: companyUpdated
            };      
        }
        else {
            return  {
                error: false,
                msg: "Problemas ao alterar a empresa.",
                data: companyUpdated
            };      
        }  
    }

    async delete(CNPJ: string){
        const companyRepository = getCustomRepository(CompanyRepositories);
        
        const  companyExists = await companyRepository.findOne( {  CNPJ, });

        if (!companyExists) {
            return  {
                error: true,
                msg: "Usuario nao encontrado para exclusao.",
                data:null
            };            
        }

        const companyDelete = await companyRepository.delete(companyExists);

        if (companyDelete["affected"] >= 1) {
            return  {
                error: false,
                msg: "Empresa excluida com sucesso.",
                data:companyDelete
            };      
        }
        else {
            return  {
                error: false,
                msg: "Problemas ao excluir a empresa.",
                data:companyDelete
            };      
        }        
    }

    async getAll() {
        const companyRepository = getCustomRepository(CompanyRepositories);

        const companys = await companyRepository.find();

        return {
            error: false,
            msg: "OK",
            data:companys
        };
    }

    async getFind(CNPJ: string ) {
        const companyRepository = getCustomRepository(CompanyRepositories);

        const company = await companyRepository.findOne({ CNPJ });

        if (company) {
            return {
                error: false,
                msg: "OK",
                data:company
            };
        }
        else {
            return {
                error: true,
                msg: "Empresa nao localizada.",
                data:null
            };
        }
    }
}

export { CompanyService };