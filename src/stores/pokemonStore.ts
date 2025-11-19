import { create } from "zustand";
import type { Pokemon } from "../models/Pokemon";

type PokemonStore = {
	hoveredPokemon: Pokemon | null;
    setHoveredPokemon: (pokemon: Pokemon | null) => void;
};

const usePokemon = create<PokemonStore>((set) => ({
	hoveredPokemon: null,
	setHoveredPokemon: (pokemon: Pokemon | null) => set({ hoveredPokemon: pokemon }),
}));

export default usePokemon;
