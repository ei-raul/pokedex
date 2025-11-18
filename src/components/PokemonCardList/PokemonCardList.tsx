import { Flex } from "antd";
import type { Pokemon } from "../../models/Pokemon";
import PokemonCard from "../PokemonCard/PokemonCard";

type PokemonCardListProps = {
    pokemons: Array<Pokemon>
}

export default function PokemonCardList({ pokemons }: PokemonCardListProps) {
    return (
        <Flex
            style={{
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap"
            }}
            gap={10}
        >
            {
                pokemons.map((p) => <PokemonCard pokemon={p} />)
            }
        </Flex>
    );
}