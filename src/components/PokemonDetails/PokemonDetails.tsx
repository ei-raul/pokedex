import { Divider, Flex, List, Typography } from "antd";

const pokeballSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="#f5f5f5"/><path d="M6,50 a44,44 0 1,1 88,0" fill="#cc0000"/><rect x="6" y="44" width="88" height="12" fill="#1a1a1a"/><circle cx="50" cy="50" r="44" fill="none" stroke="#1a1a1a" stroke-width="3"/><circle cx="50" cy="50" r="13" fill="white" stroke="#1a1a1a" stroke-width="4"/><circle cx="50" cy="50" r="6" fill="#e5e5e5"/></svg>`;
const POKEBALL_FALLBACK = `data:image/svg+xml;base64,${btoa(pokeballSvg)}`;
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
                        backgroundColor: 'rgba(204, 0, 0, 0.12)',
                        borderColor: '#cc0000',
                        borderWidth: 2,
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
                <Flex vertical style={{ justifyContent: "center", alignItems: "center", gap: 16 }}>
                    <Flex
                        vertical
                        gap={8}
                        style={{ justifyContent: "center", alignItems: "center", width: '100%' }}
                    >
                        <div style={{
                            background: 'linear-gradient(145deg, #f9fafb, #f0f2f5)',
                            borderRadius: 16,
                            padding: 16,
                            border: '1px solid #e5e7eb',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <img
                                draggable={false}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                style={{ width: 96, height: 96, imageRendering: 'pixelated' }}
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = POKEBALL_FALLBACK; }}
                            />
                        </div>
                        <Typography.Title
                            level={4}
                            style={{
                                margin: 0,
                                textTransform: 'capitalize',
                                fontWeight: 700,
                                color: '#1f2937',
                                letterSpacing: '-0.3px',
                            }}
                        >
                            {pokemon.name}
                        </Typography.Title>
                    </Flex>
                    {
                        isLoading ?
                        <Typography.Text style={{ color: '#9ca3af' }}>Carregando...</Typography.Text> :
                        <div style={{ width: '100%' }}>
                            <Typography.Title
                                level={5}
                                style={{ color: '#cc0000', fontWeight: 600, marginBottom: 8 }}
                            >
                                Habilidades
                            </Typography.Title>
                            <List
                                size="small"
                                bordered
                                dataSource={data?.abilities ?? []}
                                style={{ borderRadius: 8, overflow: 'hidden' }}
                                renderItem={(item: PokemonAbility) => (
                                    <List.Item style={{ padding: '6px 12px', textTransform: 'capitalize', fontSize: 13 }}>
                                        {item.ability.name}
                                    </List.Item>
                                )}
                            />
                            <Divider style={{ margin: '16px 0' }} />
                            <Typography.Title
                                level={5}
                                style={{ color: '#cc0000', fontWeight: 600, marginBottom: 8 }}
                            >
                                Estatísticas
                            </Typography.Title>
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