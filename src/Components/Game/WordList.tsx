import React, { useEffect, useState } from 'react';

import { createUseStyles } from 'react-jss';
import { CleanData } from './Utils/Interfaces';

const useStyles = createUseStyles({
	myList: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	myWord: {
		listStyle: 'none',
		textTransform: 'capitalize',
		margin: '5px',
	},
	mySvg: {
		width: '50px',
	},
});

function WordList(props: { wordList: CleanData[] }): JSX.Element {
	const classes = useStyles();

	return (
		<>
			<ul className={classes.myList}>
				{props.wordList.map((pokemon) => (
					<li className={classes.myWord}>
						<img className={classes.mySvg} src={pokemon.svg} alt={pokemon.name} />
						{pokemon.name}
					</li>
				))}
			</ul>
		</>
	);
}

export default WordList;
