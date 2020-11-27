import { OrphanageModel } from "./index";
import { ImageView } from "../image";

export interface OrphanageViewInterface {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: boolean;
  images?: ImageView[];
}

export default class OrphanageView {
  public static render(orphanage: OrphanageModel) {
    const { images, ...rest } = orphanage;

    const temp: OrphanageViewInterface = rest;

    if (images !== undefined) {
      temp.images = ImageView.renderMany(images);
    }

    return temp;
  }

  public static renderMany(orphanages: OrphanageModel[]) {
    return orphanages.map((orphanage) => OrphanageView.render(orphanage));
  }
}
