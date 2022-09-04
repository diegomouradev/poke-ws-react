import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Tile } from './Utils/Interfaces';
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

function GameBoard(props: { finalGameBoard: Tile[][]; onTileClicked: (fragment: Tile) => void; onGameBoard: Function }) {
	const classes = useStyles();
	const gameBoardRef = useRef<any>();

	useEffect(() => {
		if (gameBoardRef) {
			props.onGameBoard(gameBoardRef);
		}
	}, []);

	return (
		<div ref={gameBoardRef} className={classes.myGameBoard}>
			{props.finalGameBoard.map((row, i): JSX.Element => {
				return (
					<div key={`row-${i}`} className={`row-${i} ${classes.myRow}`}>
						{row.map((tile, j): JSX.Element => {
							return <LetterTile tile={tile} index={j} onTileClicked={props.onTileClicked} />;
						})}
					</div>
				);
			})}
		</div>
	);
}

export default GameBoard;
