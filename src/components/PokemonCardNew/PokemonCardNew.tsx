import type { Pokemon } from "../../models/Pokemon";
import usePokemon from "../../stores/pokemonStore";
import "./PokemonCardNew.css";

type PokemonCardProps = {
    pokemon: Pokemon;
};

export default function PokemonCardNew({ pokemon }: PokemonCardProps) {
    const { selectedPokemon, setSelectedPokemon } = usePokemon();

    return (
        <div
            onClick={
                () => setSelectedPokemon(pokemon)
            }
            style={{
                backgroundColor: selectedPokemon?.name === pokemon.name ? 'beige' : 'white',
                outline: selectedPokemon?.name === pokemon.name ? '2px solid black' : 'none'
            }}
            className='PokemonCard'
        >
            <img
                draggable={false}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            />
        </div>
    );
}