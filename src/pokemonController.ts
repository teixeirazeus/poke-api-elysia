import { Elysia, t } from "elysia";
import { Pokemon } from "./pokemonSchema";

export const pokemonController = new Elysia({
  prefix: "/pokemon",
})
  .post(
    "/",
    async ({ body: { name, type, level } }) => {
      const pokemon = new Pokemon({
        name,
        type,
        level,
      });
      await pokemon.save();
      return pokemon;
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 1,
        }),
        type: t.String({
          minLength: 1,
        }),
        level: t.Integer({
          minimum: 1,
          maximum: 100,
        }),
      }),
    }
  )
  .get("/:id", async ({ params: { id } }) => {
    const pokemon = await Pokemon.findById(id);
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }
    return pokemon;
  })
  .put(
    "/:id",
    async ({ params: { id }, body: { name, type, level } }) => {
      let pokemon = await Pokemon.findById(id);
      if (!pokemon) {
        throw new Error("Pokemon not found");
      }
      pokemon.name = name;
      pokemon.type = type;
      pokemon.level = level;
      await pokemon.save();
      return pokemon;
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 1,
        }),
        type: t.String({
          minLength: 1,
        }),
        level: t.Integer({
          minimum: 1,
          maximum: 100,
        }),
      }),
    }
  )
  .delete("/:id", async ({ params: { id } }) => {
    const pokemon = await Pokemon.findByIdAndDelete(id);
    if (!pokemon) {
      throw new Error("Pokemon not found");
    }
    return { message: "Pokemon deleted" };
  });
