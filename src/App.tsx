import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import GameCore from './Components/Game/GameCore';
import { ApiResp, CleanData } from './Components/Game/Utils/Interfaces';

const useStyles = createUseStyles({
	myApp: {
		display: 'grid',
		gridTemplateColumns: '100%',
		margin: 0,
		padding: {
			top: 50,
			left: 50,
			bottom: 50,
			right: 50,
		},
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2,50%)',
		columnGap: '30px',
	},
});

function cleanUpData(data: ApiResp[]) {
	const wordsToRemove = new Set();
	wordsToRemove.add('nidoran-f');
	wordsToRemove.add('nidoran-m');
	wordsToRemove.add('mr-mime');
	let dataImgUrl: CleanData[] = data.map((pokemon, i: number) => {
		return { svg: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`, ...pokemon } as CleanData;
	});
	const cleanData = dataImgUrl.filter((pokemon: ApiResp, i: number) => !wordsToRemove.has(pokemon.name));
	return cleanData;
}

function App() {
	const classes = useStyles();
	const [wordList, setWordList] = useState<CleanData[]>();

	useEffect(() => {
		(async () => {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
			const result = await response.json();
			let data = result.results;
			data = cleanUpData(data);
			await setWordList(data);
		})();
	}, []);

	return (
		<div className={classes.myApp}>
			<header className="App-header">
				<h1>Word Search Game</h1>
			</header>
			{wordList ? (
				<>
					<GameCore wordList={wordList} />
				</>
			) : (
				'Loading...'
			)}
		</div>
	);
}

export default App;
