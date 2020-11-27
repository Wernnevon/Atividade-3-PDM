import { Router } from "express";
import multer from "multer";

import { OrphanageController, OrphanageMiddleware } from "./index";
import uploadConfig from "../../config/upload";

const routes = Router();

const uploadMulter = multer(uploadConfig);

routes.post(
  "/",
  uploadMulter.array("images"),
  OrphanageMiddleware.create,
  OrphanageController.create
);
routes.get("/", OrphanageController.index);
routes.get("/:id", OrphanageController.show);

export default routes;
