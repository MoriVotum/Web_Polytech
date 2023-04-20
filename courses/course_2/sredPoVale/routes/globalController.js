import { Router } from "express";
import { allHandler, requestsHandler } from "../service/module.js";

const router = Router();

router.use(requestsHandler);

router.all("*", allHandler);

export default router;
