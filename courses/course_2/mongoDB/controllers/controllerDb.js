import { findItems, findItem, insertItem } from "../services/mongoService.js";

const commentsHandler = (req, res) => {
  console.log("commentsHandler");

  findItems("comments", {}).then((result) => {
    console.log(result);
    res.json(result);
  });
};

const commentHandler = (req, res) => {
  console.log("commentHandler");

  let id = req.params.id;

  if (id) {
    findItem("comments", id).then((result) => {
      console.log(result);
      if (result == null) res.sendStatus(404, "404 Not Found");
      else res.json(result);
    });
  }
};

const addComment = (req, res) => {
  console.log("addComment");

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    if (data) {
      //   res.send(JSON.parse(data));
      insertItem("comments", JSON.parse(data)).then((result) => {
        console.log(result);
        res.json(result);
      });
    }
  });
};

export { commentsHandler, commentHandler, addComment };
