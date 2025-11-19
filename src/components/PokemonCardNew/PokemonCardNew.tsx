import type { Pokemon } from "../../models/Pokemon";
import usePokemon from "../../stores/pokemonStore";
import "./PokemonCardNew.css";

type PokemonCardProps = {
    pokemon: Pokemon;
};

export default function PokemonCardNew({ pokemon }: PokemonCardProps) {
    const { setHoveredPokemon } = usePokemon();

    return (
        <div
            className='PokemonCard'
            onMouseEnter={
                () => setHoveredPokemon(pokemon)
            }
            onMouseLeave={
                () => setHoveredPokemon(null)
            }
        >
            <img
                draggable={false}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            />
        </div>
    );
}