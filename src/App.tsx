import "./App.css";
import { useEffect, useState } from "react";
import { getPokemons } from "./services/pokemonApi";
import { IPokemon } from "./types/interfaces/IPokemon";
import { ChartBar } from "./components/ChartBar";
import { ChartScatter } from "./components/ChartScatter";

function App() {
  const [selected, setSelected] = useState<any[]>([]);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokemonsSelected, setPokemonsSelected] = useState<IPokemon[]>([]);
  const [maxSelection, setMaxSelection] = useState(0);

  useEffect(() => {
    getPokemons().then((response) => setPokemons(response));
  }, []);

  const handleChange = (e: any) => {
    const id = Number(e.currentTarget.value);
    const isChecked = e.currentTarget.checked;
    const newSelection = [...selected];

    if (!isChecked) {
      const index = selected.findIndex((p) => p === id);
      newSelection.splice(index, 1);
      setSelected(newSelection);
      setMaxSelection((prev) => prev - 1);
      removePokemon(id, pokemonsSelected);
    } else {
      if (maxSelection >= 2) {
        return;
      }
      newSelection.push(id);
      setSelected(newSelection);
      setMaxSelection((prev) => prev + 1);
      addPokemon(id, pokemons);
    }
  };

  const addPokemon = (id: number, pokemons: IPokemon[]) => {
    const selected = pokemons.filter((item) => id === item.id);
    setPokemonsSelected([...pokemonsSelected, ...selected]);
  };
  const removePokemon = (id: number, pokemonsSelected: IPokemon[]) => {
    const newListPokemons = pokemonsSelected.filter((item) => id !== item.id);

    setPokemonsSelected([...newListPokemons]);
  };

  const getPokemonName = (id: number) => {
    const poke = pokemons.find((item) => item.id === id);
    return poke?.name + ", " || "";
  };

  return (
    <>
      <h1>Poké Analytics</h1>
      <div className="pannel-container">
        <div className="card list">
          <h3>
            {selected.map((id) => getPokemonName(id))}
            eu escolho você!
          </h3>
          <ul>
            {pokemons.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  value={item.id}
                  checked={selected.includes(item.id)}
                  onChange={handleChange}
                  disabled={
                    pokemonsSelected.length >= 2 &&
                    !pokemonsSelected.find((p) => p.id === item.id)
                  }
                />
                <img
                  src={`https://unite.pokemon.com/images/pokemon/${item.avatar}/stat/stat-${item.avatar}.png`}
                  alt=""
                />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="charts">
          <div className="card">
            <h3>Comparativo de Skills dos Pokémon</h3>
            <p>Escolha 2 pokemons para batalhar</p>
            {pokemonsSelected.length > 1 && (
              <ChartBar pokemonsSelected={pokemonsSelected} />
            )}
          </div>
          <div className="card">
            <h3>Ataque e Resistência dos Pokémon</h3>

            {pokemonsSelected.length > 1 && (
              <ChartScatter pokemonsSelected={pokemonsSelected} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
