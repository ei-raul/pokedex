import { Flex, Layout, Pagination, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import PokemonCardList from './components/PokemonCardList/PokemonCardList';
import PokemonCardNew from './components/PokemonCardNew/PokemonCardNew';
import type { Pokemon } from './models/Pokemon';
import usePokemon from './stores/pokemonStore';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import { useQuery } from '@tanstack/react-query';

function App() {
	const { hoveredPokemon } = usePokemon();
	const pokemonsPerPage = 60;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPokemons, setTotalPokemons] = useState<number>(0);
	const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

	const offset = useMemo(() => {
		return (currentPage - 1) * pokemonsPerPage;
	}, [currentPage, pokemonsPerPage]);


	const { data, isLoading, refetch,  } = useQuery({
		queryKey: [(currentPage - 1) * pokemonsPerPage],
		queryFn: async () => {
			const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonsPerPage}`);
			const pokemonsData = await resp.json();
			return pokemonsData;
		}
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
		<Layout
			style={{
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
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
				}}
			>
				<Typography.Title style={{ color: 'white' }}>Pokémons</Typography.Title>
			</Header>
			<Content style={{ padding: '48px' }}>
				<Flex gap={20} style={{ height: "100%" }}>
					<div
						style={{
							padding: 24,
							height: '100%',
							width: "100%",
							backgroundColor: "#dcdcdc",
							borderRadius: '25px',
							overflow: "auto"
						}}
					>
						{
							isLoading ?
								<Typography.Paragraph>Carregando Pokémons...</Typography.Paragraph> :
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
							backgroundColor: "#dcdcdc",
							borderRadius: '25px',
							overflow: "auto"
						}}
					>
						<PokemonDetails pokemon={hoveredPokemon} />
					</div>
				</Flex>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>
	);
}

export default App;
