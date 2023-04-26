import { findItems, findItem, insertItem } from "../services/mongoService.js";

const commentsHandler = (req, res) => {
  console.log("commentsHandler");

  findItems("comments", {}).then((result) => {
    // console.log(result);
    res.json(result);
  });
};

const commentHandler = (req, res) => {
  console.log("commentHandler");

  let id = req.params.id;

  if (id) {
    findItem("comments", id).then((result) => {
    //   console.log(result);
      if (result == null) res.sendStatus(404, "404 Not Found");
      else res.json(result);
    });
  }
};

const addComment = (req, res) => {
  console.log("addComment");

  let data = "";
  data = req.body;
  if (data) {
    // console.log("data:", data);
    //   res.send(JSON.parse(data));
    insertItem("comments", data).then((result) => {
    //   console.log(result);
      res.json(result);
    });
  } else {
    res.sendStatus(400, "400 Bad Request");
  }
};

export { commentsHandler, commentHandler, addComment };
