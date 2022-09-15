import { memo, useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
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

const ChartScatter: React.FC<IProps> = ({ pokemonsSelected }) => {
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

  const ticksRange = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ScatterChart
        width={700}
        height={250}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 60,
        }}
        style={{ padding: "40px" }}
      >
        <CartesianGrid display={"teste"} />
        <XAxis type="number" dataKey="x" name="Attack" ticks={ticksRange}>
          <Label value="Attack" position={{ x: 300, y: 40 }} />
        </XAxis>
        <YAxis type="number" dataKey="y" name="Resistance" ticks={ticksRange}>
          <Label value="Resistance" position={{ x: 30, y: 100 }} />
        </YAxis>
        <ZAxis type="number" dataKey="z" range={[100, 200]} name="score" />
        <Tooltip active={true} cursor={false} />
        <Legend />
        <Scatter
          name={pokemon1?.name}
          data={data1}
          fill={pokemon1?.color}
          shape="triangle"
          isAnimationActive={true}
        />
        <Scatter
          name={pokemon2?.name}
          data={data2}
          fill={pokemon2?.color}
          shape="triangle"
          alignmentBaseline="central"
          isAnimationActive={true}
        />
      </ScatterChart>
    </div>
  );
};

export default memo(ChartScatter);
