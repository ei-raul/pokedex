export type Pokemon = {
	id: number;
	name: string;
	url: string;
    abilities?: PokemonAbility[];
    stats?: PokemonStat[];
};

export type PokemonAbility = {
	is_hidden: boolean;
	slot: number;
	ability: {
		name: string;
	};
};

export type PokemonStat = {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
	};
};
