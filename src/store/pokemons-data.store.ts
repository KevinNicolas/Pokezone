import { defineStore } from "pinia";

import { IPokemonData, IPokemonMove } from "~/models";
import { IPokemonAbilities } from "~/models/pokemon-abilities.model";
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

    async getPokemonMove(moveName: string): Promise<IPokemonMove> {
      return await new PokemonApiService().fetchPokemonMove(moveName);
    },

    async getPokemonAbility(abilityName: string): Promise<IPokemonAbilities> {
      return await new PokemonApiService().fetchPokemonAbility(abilityName);
    },
  },
  getters: {
    obtainPokemonData: (state) => (pokemonName: string) => state.pokemons[pokemonName],
  },
});
