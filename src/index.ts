import { Elysia } from "elysia";
import mongoose from "mongoose";
import { pokemonController } from "./pokemonController";

await mongoose.connect("mongodb://127.0.0.1:27017/pokemonDB");
const app = new Elysia()
  .use(pokemonController)
  .get("/", () => "Okey dokey")
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
