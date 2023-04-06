import { defineStore } from "pinia";

import { IExistentPokemonsInfo } from "~/models";
import { PokemonApiService } from "~/services";

interface IState {
  isLoading: boolean;
  next: IExistentPokemonsInfo["next"];
  pokemonsResult: IExistentPokemonsInfo["results"];
  page: number;
}

export const useExistentPokemons = defineStore("existent-pokemons", {
  state: () =>
    ({
      isLoading: false,
      next: null,
      pokemonsResult: [],
      page: 0,
    } as IState),
  actions: {
    async getNextPage() {
      this.isLoading = true;
      const offset = this.page * 20;
      const limit = 20;
      const existentPokemons = await new PokemonApiService().fetchExistentPokemons(offset, limit);

      this.pokemonsResult = [...this.pokemonsResult, ...existentPokemons.results];
      this.next = existentPokemons.next;

      this.page++;
      this.isLoading = false;
    },
  },
  getters: {},
});
