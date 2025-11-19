import { Flex, Layout, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import './App.css';
import PokemonCardList from './components/PokemonCardList/PokemonCardList';
import PokemonCardNew from './components/PokemonCardNew/PokemonCardNew';
import type { Pokemon } from './models/Pokemon';
import usePokemon from './stores/pokemonStore';

function App() {
	const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { hoveredPokemon } = usePokemon();

	async function loadPokemons() {
		setIsLoading(true);
		const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60");
		const pokemonsList = await resp.json();
		setPokemons(pokemonsList.results.map((p: Pokemon, idx: number) => ({ ...p, id: idx + 1 })));
		setIsLoading(false);
	}

	useEffect(() => {
		loadPokemons();
	}, []);

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
							backgroundColor: "#dcdcdc",
							borderRadius: '25px',
							overflow: "auto"
						}}
					>
						{
							isLoading ?
								<Typography.Paragraph>Carregando Pokémons...</Typography.Paragraph> :
								<PokemonCardList pokemons={pokemons} pokemonViewer={PokemonCardNew} />
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
						{
							hoveredPokemon &&
							<div>
								<Flex vertical style={{justifyContent: "center", alignItems: "center"}}>
									<img
										draggable={false}
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${hoveredPokemon.id}.png`}
									/>
									<Typography.Title>{hoveredPokemon.name}</Typography.Title>
								</Flex>
							</div>
						}
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
