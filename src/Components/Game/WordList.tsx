import React, { useEffect, useState } from 'react';

import { createUseStyles } from 'react-jss';
import { CleanData, Tile, WordsToWatch } from './Utils/Interfaces';

const useStyles = createUseStyles({
	myList: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
		margin: '0',
		padding: '0',
	},
	myWord: {
		listStyle: 'none',
		textTransform: 'capitalize',
		margin: '5px',
		fontSize: '20px',
	},
	mySvg: {
		width: '80px',
	},
	notFound: {
		filter: 'grayscale(1)',
	},
	isFound: {
		filter: 'grayscale(0)',
		textDecoration: 'line-through',
	},
	toggleShowWordBtn: {
		padding: '5px',
		borderRadios: '30px',
		border: '1px solid black',
	},
	listWrapper: {
		display: 'grid',
		gridTemplateColumns: '1fr',
	},
	input: {
		display: 'none',
	},
});

function WordList(props: { wordList: Map<string, WordsToWatch> }): JSX.Element {
	const [words, setWords] = useState<WordsToWatch[]>();
	const [showWord, setShowWord] = useState(false);

	const classes = useStyles();

	const toggleShowWord = (): void => {
		setShowWord(!showWord);
	};

	useEffect(() => {
		let wordListIter = Array.from(props.wordList.values()).flat(1);
		setWords(wordListIter);
	}, [props.wordList]);

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
					{words?.map((pokemon: WordsToWatch, i) => (
						<li className={classes.myWord}>
							{showWord ? (
								<span className={`${pokemon.isFound ? classes.isFound : classes.notFound}`}>{pokemon.name}</span>
							) : (
								<img className={`${classes.mySvg} ${pokemon.isFound ? classes.isFound : classes.notFound}`} src={pokemon.svg} alt={pokemon.name} />
							)}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default WordList;
