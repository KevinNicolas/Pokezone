import { defineStore } from "pinia";

import { IPokemonData } from "~/models";
import { PokemonApiService } from "~/services";

interface IState {
  pokemons: Record<string, IPokemonData>;
}

export const usePokemonsData = defineStore("pokemon-data", {
  state: () =>
    ({
      pokemons: {},
    } as IState),
  actions: {
    async getPokemonData(pokemonName: string): Promise<IPokemonData> {
      if (this.pokemons[pokemonName]) return this.pokemons[pokemonName];

      const pokemonData = await new PokemonApiService().fetchPokemonData(pokemonName);
      this.pokemons = { ...this.pokemons, [pokemonName]: pokemonData };
      return pokemonData;
    },
  },
  getters: {
    obtainPokemonData: (state) => (pokemonName: string) => state.pokemons[pokemonName],
  },
});
