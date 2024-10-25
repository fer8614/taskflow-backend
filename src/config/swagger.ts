import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

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

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('https://devpositive.com/logo.png');
      height: 70px;
      width: auto;
    }
  `,
  customSiteTitle: "Docs Rest API TaskFlow",
};
export default swaggerSpec;
export { swaggerUiOptions };
