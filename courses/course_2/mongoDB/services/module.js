import { comments } from "./dataServer.js";
import { requests } from "./dataServer.js";
import { user } from "./dataServer.js";

const rootHandler = (req, res) => {
  res.send("Hello world!\n");
};

const requestsHandler = (req, res, next) => {
  console.log("ZAPROS");
  const name = req.headers["user-agent"];
  requests[name]
    ? requests[name]++
    : ((requests[name] = 1), console.log("Новое подключение!"));
  next();
};

const commentsHandler = (req, res) => {
  let data = "";
  data = req.body();
  req.on("end", () => {
    if (data) comments.push(data);
    res.json(comments);
  });
};

const statsHandler = (req, res) => {
  let html = "<table>\n";
  for (const key in requests) {
    html += "<tr>\n";
    html += `<td>${key}</td>\n`;
    html += `<td>${requests[key]}</td>\n`;
    html += "</tr>\n";
  }
  html += "</table>\n";
  res.send(html);
};

const allHandler = (req, res) => {
  if (res.statusMessage == undefined) res.sendStatus(400, "400 Bad Request");
};

const userHandler = (req, res, next) => {
  let login = "";
  let password = "";

  login = req.query.login;
  password = req.query.password;

  console.log(login, password);

  if (login == user.login && password == user.password) {
    console.log("admin");
  } else {
    res.send("ne Правильные данные!\n");
  }

  next();
};

const apiHandler = (req, res, next) => {
  let apiKey = "";

  apiKey = req.query.apiKey;

  console.log(apiKey);

  if (apiKey == user.apiKey) {
    res.send("Hello admin!\n");
    // add message to res body
  } else {
    res.send("Api Key is not normal!\n");
  }
  next();
};

const validateHandler = (req, res, next) => {
  console.log("validateHandler");

  let data = "";
  // req.on("data", (chunk) => {
  //   data += chunk;
  // });
  data = req.body;

  // req.on("end", () => {
  if (data) {
    console.log("ValidateData:", data);
    if (data.name && data.text) {
      next();
    } else {
      res.sendStatus(400, "400 Bad Request");
    }
  } else {
    res.sendStatus(400, "400 Bad Request");
  }
  // });
  // next();
};

export {
  rootHandler,
  commentsHandler,
  statsHandler,
  requestsHandler,
  allHandler,
  userHandler,
  apiHandler,
  validateHandler,
};
