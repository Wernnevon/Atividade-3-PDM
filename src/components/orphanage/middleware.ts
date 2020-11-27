import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

export default class OrphanageMiddleware {
  public static async create(req: Request, res: Response, next: NextFunction) {
    const schema = yup.object().shape({
      name: yup.string().trim().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      about: yup.string().max(300).required(),
      instructions: yup.string().trim().required(),
      openingHours: yup.string().trim().required(),
      openOnWeekends: yup.boolean().required(),
      images: yup.array(
        yup.object().shape({
          path: yup.string().trim().required(),
        })
      ),
    });

    return schema
      .validate(req.body, {
        abortEarly: false,
      })
      .then(() => {
        return next();
      })
      .catch((err) => {
        return res.status(400).json({ error: err.errors });
      });
  }
}
