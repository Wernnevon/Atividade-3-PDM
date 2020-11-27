import express, { Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import path from "path";

import { orphanageRoutes } from "./components/orphanage";

class App {
  public readonly express: Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    App.database();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private static async database() {
    await createConnection().catch((err) => {
      console.log("Conexão com o Banco de dados falhou");
      console.log(err);
    });
  }

  private routes() {
    this.express.use("/orfanato", orphanageRoutes);
    this.express.use(
      "/upload",
      express.static(path.join(__dirname, "..", "uploads"))
    );
  }
}

export default new App().express;
