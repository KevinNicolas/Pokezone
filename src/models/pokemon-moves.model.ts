export interface IPokemonMove {
  accuracy: null;
  contest_combos: null;
  contest_effect: ContestEffect;
  contest_type: ContestType;
  damage_class: ContestType;
  effect_chance: null;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: ContestType;
  id: number;
  learned_by_pokemon: ContestType[];
  machines: any[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: any[];
  power: null;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: ContestEffect;
  target: ContestType;
  type: ContestType;
}

interface ContestEffect {
  url: string;
}

interface ContestType {
  name: string;
  url: string;
}

interface EffectEntry {
  effect: string;
  language: ContestType;
  short_effect: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: ContestType;
  version_group: ContestType;
}

interface Meta {
  ailment: ContestType;
  ailment_chance: number;
  category: ContestType;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: null;
  max_turns: null;
  min_hits: null;
  min_turns: null;
  stat_chance: number;
}

interface Name {
  language: ContestType;
  name: string;
}
