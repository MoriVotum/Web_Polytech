// import express from "express";
import { Router } from "express";
import {
  rootHandler,
  // commentsHandler,
  statsHandler,
  requestsHandler,
  allHandler,
  userHandler,
  apiHandler,
  validateHandler,
} from "../services/module.js";
import { commentsHandler, commentHandler, addComment } from "./controllerDb.js";

const router = Router();

router.use(requestsHandler);

router.get("/", rootHandler);

router.use("/login", userHandler, apiHandler);

router.use("/reg", userHandler);

// router.use("/login", apiHandler);

router.get("/comments", commentsHandler);

router.post("/comments", validateHandler, addComment);

router.get("/comments/:id", commentHandler);

router.get("/stats", statsHandler);

router.all("*", allHandler);

// modules.exports = router;
export default router;
