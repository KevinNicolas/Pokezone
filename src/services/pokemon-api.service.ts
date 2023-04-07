import { IExistentPokemonsInfo, IPokemonData, IPokemonMove } from "~/models";
import { IPokemonAbilities } from "~/models/pokemon-abilities.model";

export class PokemonApiService {
  private readonly baseUrl = "https://pokeapi.co/api/v2";

  private async _fetchFromPokemonApi(endpoint: string, queryParams?: Record<string, unknown>) {
    let parsedQueryParams: string = "";
    if (queryParams)
      parsedQueryParams =
        "?" +
        Object.entries(queryParams)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");

    return await fetch(`${this.baseUrl}${endpoint}${parsedQueryParams}`);
  }

  async fetchExistentPokemons(offset: number, limit: number): Promise<IExistentPokemonsInfo> {
    const result = await this._fetchFromPokemonApi("/pokemon", { offset, limit });
    const existentPokemons = (await result.json()) as IExistentPokemonsInfo;
    return existentPokemons;
  }

  async fetchPokemonData(pokemonName: string): Promise<IPokemonData> {
    const result = await this._fetchFromPokemonApi(`/pokemon/${pokemonName}`);
    const pokemonData = (await result.json()) as IPokemonData;
    return pokemonData;
  }

  async fetchPokemonMove(moveName: string): Promise<IPokemonMove> {
    const result = await this._fetchFromPokemonApi(`/move/${moveName}`);
    const moveData = (await result.json()) as IPokemonMove;
    return moveData;
  }

  async fetchPokemonAbility(abilityName: string): Promise<IPokemonAbilities> {
    const result = await this._fetchFromPokemonApi(`/ability/${abilityName}`);
    const abilityData = (await result.json()) as IPokemonAbilities;
    return abilityData;
  }
}
