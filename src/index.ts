import { Elysia } from "elysia";
import "./database/db.setup";
import { pkmController } from "./controllers/pkmController";
import { userController } from "./controllers/userController";
import { cors } from "@elysiajs/cors";

const app = new Elysia();

app.use(cors());

app.get("/", async () => {
  return "Hello TEST";
});

app.group("/pkm", (app) => app.use(pkmController));
app.group("/user", (app) => app.use(userController));

app.listen(3002, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${3000}`);
});
