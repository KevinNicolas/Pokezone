import { IExistentPokemonsInfo, IPokemonData } from "~/models";

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
}
