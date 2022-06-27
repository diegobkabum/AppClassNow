const swaggerAutogen = require('swagger-autogen')()

const doc = {
    OpenAPI: "3.0.1",
    info: {
        version: "v1",
        title: "API Class Now",
        description: "Documentation <b>ClassNow</b> module."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        
    ],
    securityDefinitions: {
        api_key: {
            description: "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },    
    security: [ { api_key: [] } ],
    definitions: {
        Login: {
            $email: "string",
            $password: "string"
        },
        User: {
            $first_name:     "string",
            $last_name:      "string",
            $email:          "string",
            $username:       "string",
            $password:       "string",
            $address:        "string",
            $address_number: "string",
            $district:       " string",
            $complement:     "string",
            $city :          "string",
            $state:          "string",
            $CEP:            "string",
            $phone_contact:  "string",
            $admin:          "boolean"
        },
        Company: {
            corporate_name: "string",
            fantasy_name:   "string",
            CNPJ:           "string",
            address:        "string",
            address_number: "string",
            district:       "string",
            complement:     "string",
            city:           "string",
            state:          "string",
            CEP:            "string ",
            phone_contact:  "string",
            email_contact:  "string"
        },
        Student: {
            id_user:    "string",
            first_name: "string",
            last_name:  "string",
            birth_date: "date",
            RG:         "string",
            CPF:        "string",
            class_student: "string"
        }
    }
}

const outputFile = 'src/config/swagger_output.json';
const endpointsFiles = ['src/router.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../../index');           // Your project's root file
})