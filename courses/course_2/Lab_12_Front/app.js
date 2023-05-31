import express from "express";
import path from "path";
import controller from "./controllers/controller.js";
import globalController from "./controllers/globalController.js";
import { errorsController } from "./controllers/errors.js";
import morgan from "morgan";
import helmet from "helmet";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const __dirname = path.resolve();
const app = express();
const port = 3000; // по приколу

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentation",
      version: "3.0.0",
      contact: {
        name: "Desire",
        email: "nacbboom@gmail.com",
      },
    },
    servers: [
      {
        url: "/v3/user",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Root",
        description: "CRUD in Root",
      },
      {
        name: "Models",
        description: "CRUD in models",
      },
      {
        name: "Comments",
        description: "CRUD in comments",
      },
      {
        name: "User",
        description: "CRUD in User",
      },
    ],
  },
  apis: ["./docs.yaml"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.listen(port, () => {
  console.log(`Server is started with ip: 127.0.0.1 and port: ${port}`);
});

app.use(express.json());

app.use(morgan("dev"));
app.use(helmet());
// app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use("/frontend", express.static(path.resolve(__dirname, "frontend")));
app.use("/v3/user", controller);
app.use(globalController);
app.use(errorsController);

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Express!</h1>')
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
// });
