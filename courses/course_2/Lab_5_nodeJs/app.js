const http = require("http");
const host = "127.0.0.1";
const port = 3000;

const server = http.createServer();

let comments = ["Типа раз", "Tipo dva", "Just three"];
let requests = {};
let name = "";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
  console.log(`Started at ${new Date()}`);
});

server.on("connection", () => {
  console.log("Someone is connected!");
});

server.on("request", (req, res) => {
  console.log("ZAPROS");
  name = req.headers["user-agent"];
  if (requests[name]) requests[name] += 1;
  else requests[name] = 1;

  if (req.url === "/") {
    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello world!\n");
    } else {
      res.statusCode = 400;
      res.end("400 Bad Request\n");
    }
  } else if (req.url === "/stats") {
    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/html");
      let html = "<table>\n";
      for (const key in requests) {
        html += "<tr>\n";
        html += `<td>${key}</td>\n`;
        html += `<td>${requests[key]}</td>\n`;
        html += "</tr>\n";
      }
      html += "</table>\n";
      res.end(html);
    } else {
      res.statusCode = 400;
      res.end("400 Bad Request\n");
    }
  } else if (req.url === "/comments") {
    if (req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        if (data) comments.push(data);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(comments));
      });
    } else {
      res.statusCode = 400;
      res.end("400 Bad Request\n");
    }
  } else {
    res.statusCode = 400;
    res.end("400 Bad Request\n");
  }
});
