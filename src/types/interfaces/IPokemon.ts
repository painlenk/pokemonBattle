import { iEvolutions } from "./IEvolutions";
import { ISkills } from "./ISkills";

export interface IPokemon {
  id: number;
  name: string;
  avatar: string;
  description: string;
  level: number;
  stats_battle: string[];
  color: string;
  skills: ISkills;
  evolutions?: iEvolutions[];
}
