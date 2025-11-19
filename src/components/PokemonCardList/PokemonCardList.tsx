import { Flex, Pagination } from "antd";
import type { FC } from "react";
import type { Pokemon } from "../../models/Pokemon";

type PokemonCardListProps = {
    pokemons: Array<Pokemon>,
    pokemonViewer: FC<{ pokemon: Pokemon; }>;
};

export default function PokemonCardList({ pokemons, pokemonViewer: PokemonViewer }: PokemonCardListProps) {
    return (
        <Flex vertical gap={50} style={{justifyContent: "space-between", height: "100%"}}>
            <Flex
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}
                gap={10}
            >
                {
                    pokemons.map((p) => <PokemonViewer pokemon={p} />)
                }
            </Flex>
            <Pagination align="center" defaultCurrent={1} total={50} />
        </Flex>
    );
}