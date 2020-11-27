import { ImageModel } from "./index";

export interface ImageViewInterface {
  id: number;
  url: string;
}

export default class ImageView {
  public static render(image: ImageModel): ImageViewInterface {
    return {
      id: image.id,
      url: `http://localhost:8081/upload/${image.path}`,
    };
  }

  public static renderMany(images: ImageModel[]) {
    return images.map((image) => ImageView.render(image));
  }
}
