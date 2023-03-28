const http = require("http");
const host = "127.0.0.1";
const port = 3000;

const server = http.createServer();

let comments = ["Типа раз", "Tipo dva", "Just three"];
let requests = { "user-agent": 0 };

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
  console.log(`Started at ${new Date()}`);
});

server.on("connection", () => {
  console.log("Someone is connected!");
});

server.on("request", (req, res) => {
  console.log("ZAPROS");

  if (req.method === "GET") {
    if (req.url === "/") {
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello world!\n");
    }
    if (req.url === "/stats") {
      res.setHeader("Content-Type", "text/html");
      let html = "<table>\n";
      html += "<tr>";
      html += `<td>user-agent</td>`;
      html += `<td>${requests["user-agent"]}</td>`;
      html += "</tr>\n";
      html += "</table>\n";
      res.end(html);
    }
  } else if (req.method === "POST") {
    if (req.url === "/comments") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(comments));
    }
  }

  if (!res.writableEnded) {
    res.statusCode = 400;
    res.end("400 Bad Request\n");
  } else {
    requests["user-agent"] += 1;
  }
});
