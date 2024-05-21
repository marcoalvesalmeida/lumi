import express from "express";
import logger from "morgan";

import { router } from "./routes";

const PORT = 3333;

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
