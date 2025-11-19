import { Flex, Typography } from "antd";
import type { Pokemon } from "../../models/Pokemon";

type PokemonDetailsProps = {
    pokemon: Pokemon | null
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
    return (
        <div>
            {
                pokemon &&
                <Flex vertical style={{ justifyContent: "center", alignItems: "center" }}>
                    <img
                        draggable={false}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    />
                    <Typography.Title>{pokemon.name}</Typography.Title>
                </Flex>
            }
        </div>
    );
}