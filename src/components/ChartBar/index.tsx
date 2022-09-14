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

export const ChartBar: React.FC<IProps> = ({ pokemonsSelected }) => {
  const data = [
    {
      name: "attack",
      pokemon1: 2000,
      pokemon2: 3000,
      amt: 2400,
    },
    {
      name: "def",
      pokemon1: 2000,
      pokemon2: 3000,
      amt: 2400,
    },
    {
      name: "atr",
      pokemon1: 2000,
      pokemon2: 3000,
      amt: 2400,
    },
    {
      name: "velo",
      pokemon1: 2000,
      pokemon2: 3000,
      amt: 2400,
    },
  ];
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
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pokemon1" fill="#8884d8" />
        <Bar dataKey="pokemon2" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};
