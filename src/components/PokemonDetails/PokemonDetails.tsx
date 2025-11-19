import { Divider, Flex, List, Typography } from "antd";
import type { Pokemon, PokemonAbility } from "../../models/Pokemon";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type PokemonDetailsProps = {
    pokemon: Pokemon | null;
};

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
    const { data, isLoading, refetch, } = useQuery({
        queryKey: [pokemon?.id],
        queryFn: async () => {
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon?.id}`);
            const pokemonsData: Pokemon = await resp.json();
            return pokemonsData;
        },
        enabled: pokemon !== null
    });

    const statsChartData = useMemo(() => {
        return (
            {
                labels: data?.stats?.map(s => s.stat.name),
                datasets: [
                    {
                        label: 'base_stat',
                        data: data?.stats?.map(s => s.base_stat),
                        backgroundColor: '#277ecf5f',
                        borderColor: '#137de0d4',
                        borderWidth: 1,
                    },
                ],
            }
        )
    }, [data]);

    useEffect(() => {
        if (pokemon) {
            refetch();
        }
    }, [pokemon]);

    return (
        <div>
            {
                pokemon &&
                <Flex vertical style={{ justifyContent: "center", alignItems: "center" }}>
                    <Flex gap={10} style={{ justifyContent: "center", alignItems: "center", width: '100%' }}>
                        <img
                            draggable={false}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        />
                        <Typography.Title level={5}><i>{pokemon.name}</i></Typography.Title>
                    </Flex>
                    {
                        isLoading ?
                        <Typography.Text>Carregando...</Typography.Text> :
                        <div
                            style={{

                            }}
                        >
                            <Typography.Title level={5}>Habilidades:</Typography.Title>
                            <List
                                size="small"
                                bordered
                                dataSource={data?.abilities ?? []}
                                renderItem={(item: PokemonAbility) => (
                                    <List.Item>
                                        {item.ability.name}
                                    </List.Item>
                                )}
                            />
                            <Divider />
                            <Typography.Title level={5}>Estatísticas:</Typography.Title>
                            <Radar 
                                options={{
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
                                    }
                                }}
                                key={pokemon.id} 
                                data={statsChartData}
                                redraw 
                            />
                        </div>
                    }
                </Flex>
            }
        </div>
    );
}