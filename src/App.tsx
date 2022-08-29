import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import GameBoard from './Components/Game/GameBoard';
import { ApiResp } from './Components/Game/Utils/Interfaces';

const useStyles = createUseStyles({
	myApp: {
		display: 'grid',
		gridTemplateColumns: '100%',
		margin: 0,
		padding: {
			top: 100,
			left: 50,
			bottom: 50,
			right: 50,
		},
	},
});

function App() {
	const classes = useStyles();
	const [wordList, setWordList] = useState<ApiResp[]>();

	useEffect(() => {
		(async () => {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
			const result = await response.json();
			const data = result.results;
			await setWordList(data);
		})();
	}, []);

	return (
		<div className={classes.myApp}>
			<header className="App-header">
				<h1>Word Search Game</h1>
			</header>
			<div className="grid">{wordList ? <GameBoard wordList={wordList} /> : 'Loading...'}</div>
		</div>
	);
}

export default App;
