import type { Pokemon } from "../../models/Pokemon";
import "./PokemonCard.css";

type PokemonCardProps = {
    pokemon: Pokemon;
};

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <div className='PokemonCard'>
            <img
                draggable={false}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            />
        </div>
    );
}