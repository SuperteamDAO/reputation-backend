import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reputation System',
      version: '1.0.0',
    },
  },
  apis: ['./src/app.ts', './src/controllers/*/*/*.ts', './src/controllers/*/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);

export const swaggerUI = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);
