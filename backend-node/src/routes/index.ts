/* eslint-disable indent */
import express from "express";
import * as JwtAuth from "../middleware/jwt-auth";
import ProductRouter from "./product-router"

const URL_BASE = "/api";

export default (app: express.Application): void => {
  // controle de acesso
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // se acesso a pasta URL_BASE usuario tem que estar logado
    if (req.originalUrl.lastIndexOf(`${URL_BASE}/`) > -1) {
      JwtAuth.isAuthenticated(req, res, next);
      return;
    }
    next();
  });

  app.use(URL_BASE, ProductRouter);
};
