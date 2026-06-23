import type { Pokemon } from "../../models/Pokemon";
import usePokemon from "../../stores/pokemonStore";
import "./PokemonCardNew.css";

const pokeballSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#f5f5f5"/><path d="M6,50 a44,44 0 1,1 88,0" fill="#cc0000"/><rect x="6" y="44" width="88" height="12" fill="#1a1a1a"/><circle cx="50" cy="50" r="44" fill="none" stroke="#1a1a1a" stroke-width="3"/><circle cx="50" cy="50" r="13" fill="white" stroke="#1a1a1a" stroke-width="4"/><circle cx="50" cy="50" r="6" fill="#e5e5e5"/></svg>`;
const POKEBALL_FALLBACK = `data:image/svg+xml;base64,${btoa(pokeballSvg)}`;

type PokemonCardProps = {
    pokemon: Pokemon;
};

export default function PokemonCardNew({ pokemon }: PokemonCardProps) {
    const { selectedPokemon, setSelectedPokemon } = usePokemon();

    return (
        <div
            onClick={() => setSelectedPokemon(pokemon)}
            className={`PokemonCard${selectedPokemon?.name === pokemon.name ? ' selected' : ''}`}
        >
            <img
                draggable={false}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = POKEBALL_FALLBACK; }}
            />
        </div>
    );
}