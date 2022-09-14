import { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { IPokemon } from "../../types/interfaces/IPokemon";

interface IProps {
  pokemonsSelected: IPokemon[];
}

type dataPokemon = [
  {
    x: number;
    y: number;
    z: number;
  }
];

export const ChartScatter: React.FC<IProps> = ({ pokemonsSelected }) => {
  if (!pokemonsSelected) {
    return null;
  }

  const [pokemon1, setPokemon1] = useState<IPokemon>();
  const [pokemon2, setPokemon2] = useState<IPokemon>();
  const [data1, setData1] = useState<dataPokemon>();
  const [data2, setData2] = useState<dataPokemon>();

  useEffect(() => {
    setPokemon1(pokemonsSelected[0]);
    setPokemon2(pokemonsSelected[1]);
    setData1([
      {
        x: pokemon1?.skills.attack || 0,
        y: pokemon1?.skills.resistance || 0,
        z: pokemon1?.skills?.attack! + pokemon1?.skills?.resistance! || 0,
      },
    ]);

    setData2([
      {
        x: pokemon2?.skills.attack || 0,
        y: pokemon2?.skills.resistance || 0,
        z: pokemon2?.skills?.attack! + pokemon2?.skills?.resistance! || 0,
      },
    ]);
  }, [pokemonsSelected, data1, data2]);

  const ticksRange = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200,
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" ticks={ticksRange} />
        <YAxis type="number" dataKey="y" name="weight" ticks={ticksRange} />
        <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name={pokemon1?.name}
          data={data1}
          fill={pokemon1?.color}
          shape="triangle"
        />
        <Scatter
          name={pokemon2?.name}
          data={data2}
          fill={pokemon2?.color}
          shape="triangle"
        />
      </ScatterChart>
    </div>
  );
};
