import {
  findItems,
  findItem,
  insertItem,
  addApiKey,
  checkApiKey,
  updateModel,
  deleteModel,
  deleteApikey,
  findModels,
  findModel,
} from "../services/mongoService.js";

const commentsHandler = (req, res) => {
  try {
    console.log("commentsHandler");

    findItems("comments", {}).then((result) => {
      // console.log(result);
      res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const commentHandler = (req, res) => {
  try {
    console.log("commentHandler");

    let id = req.params.id;

    if (id) {
      findItem("comments", id).then((result) => {
          console.log(result);
        if (result == null) res.sendStatus(404, "404 Not Found");
        else res.json(result);
      });
    }
  } catch (err) {
    next(err);
  }
};

const addComment = (req, res) => {
  try {
    console.log("addComment");

    let data = "";
    data = req.body;
    if (data) {
      insertItem("comments", data).then((result) => {
        res.json(result);
      });
    } else {
      res.sendStatus(400, "400 Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const createModel = (req, res, next) => {
  try {
    console.log("addModel");
    const data = req.body;
    if (
      data.name &&
      data.name_model &&
      data.type &&
      data.model &&
      data.description &&
      data.comments
    ) {
      insertItem("models", data).then((result) => {
        res.json(result);
      });
    } else {
      res.sendStatus(400, "400 Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const getApiKey = (req, res, next) => {
  try {
    console.log("getApiKey");
    let data = req.body;
    if (data.name) {
      console.log(data);
      let x = new Date().getTime();
      data = { name: data.name, api_key: Math.floor(Math.random() * 1000) * x };
      console.log(data);
      addApiKey("apiKeys", data).then((result) => {
        res.json(result);
      });
    } else {
      res.sendStatus(400, "400 Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const removeApiKey = (req, res, next) => {
  try {
    console.log("removeApiKey");
    const key = req.headers["api_key"];
    console.log("id:", key);
    deleteApikey("apiKeys", key).then((result) => {
      console.log("result:", result);
      if (result == null) res.send(404, "404 Not Found API-Key with this id");
      else res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const authGuard = (req, res, next) => {
  try {
    console.log("authGuard");
    // get api key from header
    const key = req.headers["api_key"];
    console.log("KEY:", key);
    checkApiKey("apiKeys", key).then((result) => {
      console.log("result_itog:", result);
      if (result == null) res.send(401, "401 Unauthorized API key");
      else next();
    });
  } catch (err) {
    next(err);
  }
};

const changeModel = (req, res, next) => {
  try {
    console.log("changeModel");
    let id = req.params.id;
    console.log("id:", id);
    const data = req.body;
    if (
      data.name &&
      data.name_model &&
      data.type &&
      data.model &&
      data.description &&
      data.comments
    ) {
      updateModel("models", id, data).then((result) => {
        console.log("result:", result);
        if (result == null) res.send(404, "404 Not Found Model with this id");
        else res.json(result);
      });
    } else {
      res.sendStatus(400, "400 Bad Request");
    }
  } catch (err) {
    next(err);
  }
};

const removeModel = (req, res, next) => {
  try {
    console.log("removeModel");
    let id = req.params.id;
    console.log("id:", id);
    deleteModel("models", id).then((result) => {
      console.log("result:", result);
      if (result == null) res.send(404, "404 Not Found Model with this id");
      else res.json(result);
    });
  } catch (err) {
    next(err);
  }
};


const modelsHandler = (req, res, next) => {
  try {
    console.log("modelsHandler");
    findModels("models", {}, { name_model: 1 }).then((result) => {
      console.log("result:", result);
      res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const modelHandler = (req, res, next) => {
  try {
    console.log("modelHandler");
    let id = req.params.id;
    console.log("id:", id);
    findModel("models", id).then((result) => {
      console.log("result:", result);
      if (result == null) res.send(404, "404 Not Found Model with this id");
      else res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

export {
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
};
