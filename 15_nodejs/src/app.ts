
import express from "express";
import { json } from "body-parser";
import todoRoutes from "./routes/todos";

const app = express();
app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, req: express.Request, resp: express.Response, next: express.NextFunction) => {
	resp.status(500).json({message: err.message});
});

app.listen(3000);
