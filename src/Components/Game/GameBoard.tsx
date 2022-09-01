import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
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

function GameBoard(props: { finalGameBoard: any[][]; getWordFragmentCallback: (fragment: string | number) => void; getCanvasSizeFromBoard: Function }) {
	const classes = useStyles();
	const gameBoardRef = useRef<any>();

	useEffect(() => {
		if (gameBoardRef) {
			const size = gameBoardRef.current.clientWidth;
			props.getCanvasSizeFromBoard(size);
		}
	}, [props.getCanvasSizeFromBoard, gameBoardRef]);

	return (
		<div ref={gameBoardRef} className={classes.myGameBoard}>
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
