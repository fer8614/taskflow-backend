import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Projects",
        description: "Api operation related to projects",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript / MongoDB",
      version: "1.0.0",
      description: "API Docs for projects",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
