import { Request, Response } from "express";

import { OrphanageService } from "./index";

export default class OrphanageController {
  public static async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
    } = req.body;

    const reImages = req.files;

    if (!Array.isArray(reImages)) {
      return res.status(400).json("Upload incorreto de imagem");
    }

    const images = reImages.map((imagem) => {
      return {
        path: imagem.filename,
      };
    });

    return OrphanageService.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      openingHours,
      openOnWeekends,
      images,
    })
      .then(() => res.status(201).send())
      .catch((err) => res.status(400).json(err.message));
  }

  public static async index(req: Request, res: Response) {
    return OrphanageService.index()
      .then((orphanages) => res.status(200).json(orphanages))
      .catch((err) => res.status(500).json(err.message));
  }

  public static async show(req: Request, res: Response) {
    const { id } = req.params;

    const intId = parseInt(id, 10);

    if (Number.isNaN(intId) || intId <= 0) {
      return res.status(400).json("ID precisa ser um número inteiro positivo");
    }

    return OrphanageService.show(intId)
      .then((orphanage) => res.status(200).json(orphanage))
      .catch((err) => res.status(400).json(err.message));
  }
}
