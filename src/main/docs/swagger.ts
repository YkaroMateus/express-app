import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API com Swagger",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            id: {
              type: "string",
              description: "ID do usuário",
            },
            name: {
              type: "string",
              description: "Nome do usuário",
            },
            email: {
              type: "string",
              description: "Email do usuário",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação do usuário",
            },
          },
        },
      },
    },
  },
  apis: ["./src/infra/http/routes/*.ts"],
};
