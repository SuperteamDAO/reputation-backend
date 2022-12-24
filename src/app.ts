import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import helmet from 'helmet';
import dotenv from 'dotenv';
import Controller from './interfaces/controller.interface';
import logger from './services/logger';
import { swaggerSetup, swaggerUI } from './utils/swagger';
dotenv.config();
class App {
  public app: express.Application;

  constructor(controllers: readonly Controller[]) {
    this.app = express();
    /**
     * @openapi
     * /checks:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    this.app.use('/checks', (_, response) => response.send('Server is running'));
    this.initializeStandardMiddlewares();
    this.initializeControllers(controllers);
    this.app.use('/docs', swaggerUI, swaggerSetup);
    logger.info(`Docs available at http://localhost:3001/docs`);
  }
  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      /* istanbul ignore next */
      logger.info(`App listening on the port ${process.env.PORT}`);
      // swaggerDocs(this.app, process.env.PORT);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }
  private initializeStandardMiddlewares() {
    this.app.set('trust proxy', true);

    this.app.use(cors());

    this.app.use(bodyParser.json());
    this.app.use(morgan('combined'));
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );
    morganBody(this.app, {
      noColors: true,
      logResponseBody: false,
    });
  }
  private initializeControllers(controllers: readonly Controller[]) {
    // All the generic containers as supplied by app
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
