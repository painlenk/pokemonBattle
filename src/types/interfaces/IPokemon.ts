export interface IPokemon {
  id: number;
  name: string;
  avatar: string;
  description: string;
  level: number;
  stats_battle: ["Supporter", "Melee"];
  color: string;
  skills: {
    attack: number;
    resistance: number;
    mobility: number;
    punctuation: number;
    support: number;
  };
  evolutions?: [
    {
      id: number;
      name: string;
      avatar: string;
      level: number;
    }
  ];
}
