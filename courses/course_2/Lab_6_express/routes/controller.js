// import express from "express";
import { Router } from "express";
import {
  rootHandler,
  commentsHandler,
  statsHandler,
  requestsHandler,
  allHandler,
} from "../service/module.js";

const router = Router();

router.use(requestsHandler);

router.get("/", rootHandler);

router.post("/comments", commentsHandler);

router.get("/stats", statsHandler);

router.all("*", allHandler);

// modules.exports = router;
export default router;
