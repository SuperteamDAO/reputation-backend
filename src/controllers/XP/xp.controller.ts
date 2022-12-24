import express from 'express';
import { XP_API } from '../../path';
// interface
import Controller from '../../interfaces/controller.interface';
import { createSuccessResponse, createFailureResponse } from '../../interfaces/response';
// helpers
import { prisma } from '../../helper/prisma';
import validationMiddleware from '../../middleware/validate';
// dto
import XpByWorkDto from './dto/xpwork.dto';
import XpBySkillDto from './dto/xpskill.dto';
class XPController implements Controller {
  public path = XP_API;
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${XP_API}/projects`, this.getProjects);
    this.router.post(`${XP_API}/xpBySkill`, validationMiddleware(XpBySkillDto), this.getXpBySkill);
    this.router.post(`${XP_API}/xpByWork`, validationMiddleware(XpByWorkDto), this.getXpByWork);
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

  private getXpBySkill = async (request: express.Request, response: express.Response) => {
    const { name } = request.body;
    try {
      const res = await prisma.xpBySkill.findMany({
        where: {
          name: name,
        },
      });
      response.send(createSuccessResponse(res));
    } catch (error) {
      response.send(createFailureResponse(500, error));
    }
  };

  private getXpByWork = async (request: express.Request, response: express.Response) => {
    const { name } = request.body;
    try {
      const res = await prisma.xpByWork.findMany({
        where: {
          name: name,
        },
      });
      response.send(createSuccessResponse(res));
    } catch (error) {
      response.send(createFailureResponse(500, error));
    }
  };
}

export default XPController;
