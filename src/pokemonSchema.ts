import * as mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: Number, required: true, default: 1, min: 1, max: 100 },
  },
  {
    methods: {
      cry() {
        console.log(`${this.name}!`);
      },
    },
  }
);

export type Pokemon = mongoose.InferSchemaType<typeof pokemonSchema>;
export const Pokemon = mongoose.model("pokemon", pokemonSchema);
