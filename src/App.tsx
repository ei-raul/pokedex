import { ConfigProvider, Flex, Layout, Pagination, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useMemo, useState } from 'react';
import PokemonCardList from './components/PokemonCardList/PokemonCardList';
import PokemonCardNew from './components/PokemonCardNew/PokemonCardNew';
import type { Pokemon } from './models/Pokemon';
import usePokemon from './stores/pokemonStore';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import { useQuery } from '@tanstack/react-query';
import Link from 'antd/es/typography/Link';

function App() {
	const { selectedPokemon } = usePokemon();
	const pokemonsPerPage = 60;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPokemons, setTotalPokemons] = useState<number>(0);
	const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

	const offset = useMemo(() => {
		return (currentPage - 1) * pokemonsPerPage;
	}, [currentPage, pokemonsPerPage]);


	const { data, isLoading, refetch  } = useQuery({
		queryKey: [offset],
		queryFn: async () => {
			const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonsPerPage}`);
			const pokemonsData = await resp.json();
			return pokemonsData;
		},
	});

	useEffect(() => {
		refetch();
	}, [currentPage]);

	useEffect(() => {
		if(data) {
			setTotalPokemons(data.count);
			setPokemons(data.results.map((p: Pokemon, idx: number) => ({ ...p, id: idx + offset + 1 })));
		}
	}, [data]);

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#cc0000',
					borderRadius: 8,
					borderRadiusLG: 12,
				},
			}}
		>
			<Layout
				style={{
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					background: '#f0f2f5',
				}}
			>
				<Header
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 1,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						background: 'linear-gradient(135deg, #cc0000 0%, #8b0000 100%)',
						boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
					}}
				>
					<Typography.Title
						level={3}
						style={{
							color: 'white',
							margin: 0,
							fontWeight: 700,
							letterSpacing: '-0.3px',
							textShadow: '0 1px 3px rgba(0,0,0,0.25)',
						}}
					>
						Pokédex
					</Typography.Title>
				</Header>
				<Content style={{ padding: '32px 48px' }}>
					<Flex gap={20} style={{ height: "100%" }}>
						<div
							style={{
								padding: 24,
								height: '100%',
								width: "100%",
								background: 'white',
								borderRadius: '16px',
								overflow: "auto",
								boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
								border: '1px solid rgba(0,0,0,0.05)',
							}}
						>
							{
								isLoading ?
									<Typography.Paragraph style={{ color: '#6b7280', textAlign: 'center', marginTop: 40 }}>
										Carregando Pokémons...
									</Typography.Paragraph> :
									<Flex
										vertical
										gap={10}
										style={{
											justifyContent: "space-between",
											alignItems: "center",
											height: "100%"
										}}
									>
										<PokemonCardList pokemons={pokemons} pokemonViewer={PokemonCardNew} />
										<Pagination
											align="center"
											defaultCurrent={1}
											total={totalPokemons}
											pageSize={pokemonsPerPage}
											showSizeChanger={false}
											current={currentPage}
											onChange={(page) => setCurrentPage(page)}
										/>
									</Flex>
							}
						</div>
						<div
							style={{
								padding: 24,
								height: '100%',
								minWidth: "400px",
								background: 'white',
								borderRadius: '16px',
								overflow: "auto",
								boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
								border: '1px solid rgba(0,0,0,0.05)',
							}}
						>
							<PokemonDetails pokemon={selectedPokemon} />
						</div>
					</Flex>
				</Content>
				<Footer
					style={{
						textAlign: 'center',
						background: '#f9fafb',
						borderTop: '1px solid #e5e7eb',
						padding: '12px 48px',
						color: '#6b7280',
						fontSize: '13px',
					}}
				>
					2025 - Criado por <Link href='https://ei-raul.github.io/'>Raul de Araújo Lima</Link>
				</Footer>
			</Layout>
		</ConfigProvider>
	);
}

export default App;
