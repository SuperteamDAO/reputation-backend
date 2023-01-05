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
    this.router.get(`${XP_API}/indie`, this.getIndie);
    this.router.get(`${XP_API}/cab`, this.getcab);
  }
  /**
   * @openapi
   * '/api/v1/xp/projects':
   *  get:
   *     tags:
   *     - Projects
   *     summary: Get
   *     requestBody:
   *      required: true
   *
   *     responses:
   *      200:
   *        description: Success
   *
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
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
  /**
   * @openapi
   * '/api/v1/xp/xpBySkill':
   *  post:
   *     tags:
   *     - XP by Skill
   *     summary: fetch xp by discord username
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/XpByWork'
   *     responses:
   *      200:
   *        description: Success
   *
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
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
  /**
   * @openapi
   * '/api/v1/xp/xpByWork':
   *  post:
   *     tags:
   *     - XP by Work
   *     summary: fetch xp by discord username
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/XpByWork'
   *     responses:
   *      200:
   *        description: Success
   *
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
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

  /**
   * @openapi
   * '/api/v1/xp/indie':
   *  get:
   *     tags:
   *     - Indie
   *     summary: Get
   *     requestBody:
   *      required: true
   *
   *     responses:
   *      200:
   *        description: Success
   *
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  private getIndie = async (_request: express.Request, response: express.Response) => {
    try {
      const res = await prisma.indie_Work.findMany();
      response.send(createSuccessResponse(res));
    } catch (error) {
      response.send(createFailureResponse(500, error));
    }
  };
  /**
   * @openapi
   * '/api/v1/xp/cab':
   *  get:
   *     tags:
   *     - Cabs
   *     summary: Get
   *     requestBody:
   *      required: true
   *
   *     responses:
   *      200:
   *        description: Success
   *
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  private getcab = async (_request: express.Request, response: express.Response) => {
    try {
      const res = await prisma.cab.findMany();
      response.send(createSuccessResponse(res));
    } catch (error) {
      response.send(createFailureResponse(500, error));
    }
  };
}

export default XPController;
