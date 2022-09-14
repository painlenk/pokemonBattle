import { memo, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { IPokemon } from "../../types/interfaces/IPokemon";

interface IProps {
  pokemonsSelected?: IPokemon[];
}

const ChartBar: React.FC<IProps> = ({ pokemonsSelected }) => {
  const [dataPokemon, setDataPokemon] = useState([{}]);

  useEffect(() => {
    if (!pokemonsSelected) {
      return;
    }
    const [pokemonSelected1, pokemonSelected2] = pokemonsSelected;

    const data = [
      {
        name: "attack",
        pokemon1: pokemonSelected1.skills.attack,
        pokemon2: pokemonSelected2.skills.attack,
      },
      {
        name: "resistance",
        pokemon1: pokemonSelected1.skills.resistance,
        pokemon2: pokemonSelected2.skills.resistance,
      },
      {
        name: "mobility",
        pokemon1: pokemonSelected1.skills.mobility,
        pokemon2: pokemonSelected2.skills.mobility,
      },
      {
        name: "punctuation",
        pokemon1: pokemonSelected1.skills.punctuation,
        pokemon2: pokemonSelected2.skills.punctuation,
      },
      {
        name: "support",
        pokemon1: pokemonSelected1.skills.support,
        pokemon2: pokemonSelected2.skills.support,
      },
    ];
    setDataPokemon(data);
  }, [pokemonsSelected]);

  if (!pokemonsSelected) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BarChart
        width={500}
        height={300}
        data={dataPokemon}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          name={pokemonsSelected[0].name}
          dataKey="pokemon1"
          fill={pokemonsSelected[0].color}
        />
        <Bar
          name={pokemonsSelected[1].name}
          dataKey="pokemon2"
          fill={pokemonsSelected[1].color}
        />
      </BarChart>
    </div>
  );
};

export default memo(ChartBar);
