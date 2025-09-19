import { Router } from "express";
import { authRouter } from "./auth.routes.js";

export const routes = Router();

routes.use(authRouter);
// routes.use(alumnoRouter);
// routes.use(profesorRouter);
// routes.use(cursoRouter);
