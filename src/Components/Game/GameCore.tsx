import React, { useState } from 'react';

import { createUseStyles } from 'react-jss';
import GameBoard from './GameBoard';
import { CleanData } from './Utils/Interfaces';
import WordList from './WordList';

const useStyles = createUseStyles({
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(2,50%)',
		columnGap: '30px',
	},
});

function GameCore(props: { wordList: CleanData[] }): JSX.Element {
	const classes = useStyles();
	// Implement passing the pokemonOntheBoard from
	// here to GameBoard so we can set that state once
	//thats complete and pass that list to wordList.
	return (
		<div className={classes.grid}>
			<GameBoard wordList={props.wordList} />
			<WordList wordList={props.wordList} />
		</div>
	);
}

export default GameCore;
