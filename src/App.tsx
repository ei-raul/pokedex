import { Flex, Layout, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import './App.css';

type Pokemon = {
	id: number;
	name: string;
	url: string;
};

function App() {
	const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

	async function loadPokemons() {
		const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60");
		const pokemonsList = await resp.json();
		setPokemons(pokemonsList.results.map((p: Pokemon, idx: number) => ({ ...p, id: idx + 1 })));
	}

	useEffect(() => {
		loadPokemons();
	});


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
				<div
					style={{
						padding: 24,
						height: '100%',
						backgroundColor: "#dcdcdc",
						borderRadius: '25px',
						overflow: "auto"
					}}
				>
					<Flex 
						style={{
							justifyContent: "center",
							alignItems: "center",
							flexWrap: "wrap"
						}}
						gap={10}
					>
						{
							pokemons.map((p) => {
								return (
									<div
										style={{ 
											width: 100, 
											height: 100,
											borderRadius: 10,
											backgroundColor: "white",
											justifyContent: "center",
											alignItems: "center",
											display: "flex"
										}}
									>
										<img
											draggable={false}
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
										/>
									</div>
								);
							})
						}
					</Flex>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}>
				Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>
	);
}

export default App;
