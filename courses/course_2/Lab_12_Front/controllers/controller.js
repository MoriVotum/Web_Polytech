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
import {
  commentsHandler,
  commentHandler,
  addComment,
  createModel,
  getApiKey,
  authGuard,
  changeModel,
  removeModel,
  removeApiKey,
  modelsHandler,
  modelHandler,
  getUserKey,
} from "./controllerDb.js";

const router = Router();

router.use(requestsHandler);

router.get("/", rootHandler);

router.use("/login", userHandler, apiHandler);

router.use("/reg", userHandler);

router.get("/comments", commentsHandler);

router.post("/comments", validateHandler, addComment);

router.get("/comments/:id", commentHandler);

router.get("/stats", statsHandler);

// new api
router.get("/getUser", getUserKey);

router.post("/addUser", getApiKey);

router.delete("/removeUser", removeApiKey);

router.post("/models", authGuard, createModel);

router.put("/models/:id", authGuard, changeModel);

router.delete("/models/:id", authGuard, removeModel);

router.get("/models", modelsHandler);

router.get("/models/:id", modelHandler);

router.all("*", allHandler);

// modules.exports = router;
export default router;
