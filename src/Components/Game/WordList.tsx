import React, { useEffect, useState } from 'react';

import { createUseStyles } from 'react-jss';
import { CleanData, Tile } from './Utils/Interfaces';

const useStyles = createUseStyles({
	myList: {
		display: 'grid',
		gridTemplateColumns: 'repeat(5,1fr)',
		margin: '0',
		padding: '0',
	},
	myWord: {
		listStyle: 'none',
		textTransform: 'capitalize',
		margin: '5px',
		fontSize: '30px',
	},
	mySvg: {
		width: '60px',
		filter: 'grayscale(1)',
	},
	toggleShowWordBtn: {
		padding: '5px',
		borderRadios: '30px',
		border: '1px solid black',
	},
	listWrapper: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		place: 'center',
	},
	input: {
		display: 'none',
	},
});

function WordList(props: { wordList: Set<CleanData> }): JSX.Element {
	let wordListIter = Array.from(props.wordList.values()).flat(1);
	const [words, setWords] = useState(wordListIter);
	const [showWord, setShowWord] = useState(false);

	const classes = useStyles();

	const toggleShowWord = (): void => {
		setShowWord(!showWord);
	};
	return (
		<>
			<div className={classes.listWrapper}>
				<form action="">
					<label className={classes.toggleShowWordBtn} htmlFor="toggleWord">
						Show Word
					</label>
					<input
						className={classes.input}
						id="toggleWord"
						type="checkbox"
						onClick={() => {
							toggleShowWord();
						}}
					/>
				</form>
				<ul className={classes.myList}>
					{words.map((pokemon: CleanData) => (
						<li className={classes.myWord}>{showWord ? pokemon.name : <img className={classes.mySvg} src={pokemon.svg} alt={pokemon.name} />}</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default WordList;
