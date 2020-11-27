import { getRepository } from "typeorm";

import { OrphanageModel, OrphanageView } from "./index";

export default class OrphanageService {
  public static async create(orphanage: {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    openingHours: string;
    openOnWeekends?: boolean;
    images: { path: string }[];
  }) {
    const orphanageRepository = getRepository(OrphanageModel);
    const teste = orphanageRepository.create(orphanage);

    await orphanageRepository.save(teste).catch((err) => console.log(err));
  }

  public static async index() {
    return OrphanageView.renderMany(
      await getRepository(OrphanageModel).find({
        relations: ["images"],
      })
    );
  }

  public static async show(id: number) {
    return OrphanageView.render(
      await getRepository(OrphanageModel).findOneOrFail(id, {
        relations: ["images"],
      })
    );
  }
}
