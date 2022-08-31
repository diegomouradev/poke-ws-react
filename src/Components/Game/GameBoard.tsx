import React from 'react';
import { createUseStyles } from 'react-jss';
import Tile from './Tile';
import LetterTile from './Tile';

const useStyles = createUseStyles({
	myGameBoard: {
		width: 'min-content',
		height: 'min-content',
		border: '1px solid black',
		justifySelf: 'center',
		alignSelf: 'center',
	},
	myRow: {
		display: 'flex',
	},
});

function GameBoard(props: { finalGameBoard: any[][]; getWordFragmentCallback: (fragment: string | number) => void }) {
	const classes = useStyles();

	return (
		<div className={classes.myGameBoard}>
			{props.finalGameBoard.map((row, i): JSX.Element => {
				return (
					<div key={`row-${i}`} className={`row-${i} ${classes.myRow}`}>
						{row.map((tile, j): JSX.Element => {
							return <LetterTile tile={tile} index={j} getWordFragmentCallback={props.getWordFragmentCallback} />;
						})}
					</div>
				);
			})}
		</div>
	);
}

export default GameBoard;
