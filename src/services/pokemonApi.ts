import { IPokemon } from "../types/interfaces/IPokemon";

export async function getPokemons() {
  const request = await fetch(
    "https://6283929f92a6a5e462260498.mockapi.io/pokemon"
  );
  const data: IPokemon[] = await request.json();
  return data;
}
