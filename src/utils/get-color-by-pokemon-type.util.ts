export function getColorByPokemonType(pokemonType: string): string {
  const colorTypes: Record<string, string> = {
    normal: "#8f99a1",
    fighting: "#ce4069",
    flying: "#8fa7dd",
    poison: "#ab6bc8",
    ground: "#d97746",
    rock: "#c7b78b",
    bug: "#90c12c",
    ghost: "#5269ac",
    steel: "#5a8ea1",
    fire: "#ff9c54",
    water: "#4d90d5",
    grass: "#62bb5b",
    electric: "#f3d23b",
    psychic: "#f97176",
    ice: "#75cec0",
    dragon: "#086dc4",
    dark: "#5a5365",
    fairy: "#ec8fe5",
    unknown: "#fff",
    shadow: "#5a5365",
  };

  return colorTypes[pokemonType] ?? "#fff";
}
