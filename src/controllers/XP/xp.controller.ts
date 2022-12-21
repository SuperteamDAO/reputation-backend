import express from 'express';
import { XP_API } from '../../path';
import Controller from '../../interfaces/controller.interface';
import { prisma } from '../../helper/prisma';
import { createSuccessResponse, createFailureResponse } from '../../interfaces/response';
class XPController implements Controller {
  public path = XP_API;
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${XP_API}/projects`, this.getProjects);
  }
  private getProjects = async (_request: express.Request, response: express.Response) => {
    try {
      const res = await prisma.projects_Info.findMany({
        include: {
          members: true,
        },
      });
      response.send(createSuccessResponse(res));
    } catch (error) {
      response.send(createFailureResponse(500, error));
    }
  };
}

export default XPController;
