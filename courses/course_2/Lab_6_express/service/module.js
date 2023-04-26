const comments = ["Типа раз", "Tipo dva", "Just three"];
const requests = {};

const rootHandler = (req, res) => {
  res.send("Hello world!\n");
};

const requestsHandler = (req, res, next) => {
  console.log("ZAPROS");
  const name = req.headers["user-agent"];
  requests[name] ? requests[name]++ : ((requests[name] = 1), console.log("Новое подключение!"));
  next();
};

const commentsHandler = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
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

export {
  rootHandler,
  commentsHandler,
  statsHandler,
  requestsHandler,
  allHandler,
};
