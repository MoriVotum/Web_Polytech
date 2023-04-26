import express from "express";
import path from "path";
import controller from "./routes/controller.js";
// let info = require('./routes/info');

const __dirname = path.resolve();
const app = express();
const port = 3000; // по приколу

app.listen(port, () => {
  console.log(`Server is started with ip: 127.0.0.1 and port: ${port}`);
});

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use(controller);

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>')
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// });
