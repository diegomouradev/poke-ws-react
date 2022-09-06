import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Tile } from './Utils/Interfaces';
import LetterTile from './Tile';
import { fromEvent, Observable, switchMap, takeUntil, map, skipUntil, take } from 'rxjs';

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

	useEffect(() => {
		// let gameBoardRef = tile.current as unknown as HTMLDivElement;
		const startSelecting$: Observable<MouseEvent> = fromEvent<MouseEvent>(gameBoardRef.current, 'mousedown').pipe(take(1));
		const keepSelecting$: Observable<MouseEvent> = fromEvent<MouseEvent>(gameBoardRef.current, 'mouseover');
		const stopSelecting$: Observable<MouseEvent> = fromEvent<MouseEvent>(gameBoardRef.current, 'mouseup').pipe(take(1));

		const selectWord$: Observable<any> = keepSelecting$
			.pipe(skipUntil(startSelecting$))
			.pipe(map((selectionEvent) => selectionEvent))
			.pipe(takeUntil(stopSelecting$));

		startSelecting$.subscribe((value) => console.log(value.type));
		selectWord$.subscribe((value) => console.log(value.type));
		stopSelecting$.subscribe((value) => console.log(value.type));
	});

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
