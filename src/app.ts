import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import helmet from 'helmet';
import dotenv from 'dotenv';
import Controller from './interfaces/controller.interface';
import logger from './services/logger';
dotenv.config();
class App {
  public app: express.Application;

  constructor(controllers: readonly Controller[]) {
    this.app = express();

    this.initializeStandardMiddlewares();
    this.initializeControllers(controllers);
  }
  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      /* istanbul ignore next */
      logger.info(`App listening on the port ${process.env.PORT}`);
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
