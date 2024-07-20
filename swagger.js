const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation de l'API",
  },
  servers: [
    {
      url:
        process.env.SERVER_URL || "https://tache-de-validition-nodejs-p16odb0ao.vercel.app/",
        description: "Serveur de développement",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
