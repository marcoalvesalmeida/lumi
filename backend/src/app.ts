import express from "express";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/output.json";

import { router } from "./routes";
import bodyParser from "body-parser";

const PORT = 3333;

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/api/", router);

app.use(
    "/api/docs",
    swaggerUi.serve, 
    swaggerUi.setup(swaggerFile)
);

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});