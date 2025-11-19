import type { Pokemon } from "../../models/Pokemon";
import "./PokemonCardNew.css";

type PokemonCardProps = {
    pokemon: Pokemon;
};

export default function PokemonCardNew({ pokemon }: PokemonCardProps) {
    return (
        <div className='PokemonCard'>
            <img
                draggable={false}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            />
        </div>
    );
}