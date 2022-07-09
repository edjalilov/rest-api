import express from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import path from "path";

import subsInfoRoutes from "./routes/subsInfo.js";
import subsBillInfoRoutes from "./routes/subsBillInfo.js";
import subsPassRoutes from "./routes/subsPass.js";

const __dirname = path.resolve();

mongoose
  .connect(
    "mongodb+srv://cluster0.bivzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      dbName: "Test",
      user: "edjalilov",
      pass: "edjalilov1995",
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB database...");
  });

const app = express();
const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fake API",
      version: "1.0.0",
      description: "This rest-api for tests",
      contact: {
        name: "Elyor Djalilov",
        email: "edjalilov.dev@gmail.com",
      },
    },
    servers: [
      {
        url: "https://young-basin-98298.herokuapp.com",
      },
      // {
      //   url: "http://localhost:5000",
      // },
    ],
  },
  // [.routes.js]
  apis: ["index.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "static")));
app.use("/subsInfo", subsInfoRoutes);
app.use("/subsBillInfo", subsBillInfoRoutes);
app.use("/subsPass", subsPassRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
