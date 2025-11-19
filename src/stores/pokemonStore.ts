import { create } from "zustand";
import type { Pokemon } from "../models/Pokemon";

type PokemonStore = {
	selectedPokemon: Pokemon | null;
    setSelectedPokemon: (pokemon: Pokemon | null) => void;
};

const usePokemon = create<PokemonStore>((set) => ({
	selectedPokemon: null,
	setSelectedPokemon: (pokemon: Pokemon | null) => set({ selectedPokemon: pokemon }),
}));

export default usePokemon;
