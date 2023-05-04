import { Router } from "express";
import { allHandler, requestsHandler } from "../services/module.js";

const router = Router();

router.use(requestsHandler);

router.all("*", allHandler);

export default router;
