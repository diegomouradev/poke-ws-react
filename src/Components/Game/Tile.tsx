import React, { useEffect, useRef, useState } from 'react';
import { Tile } from './Utils/Interfaces';
import { createUseStyles } from 'react-jss';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';

const useStyles = createUseStyles({
	myTile: {
		width: '30px',
		height: '30px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'uppercase',
		zIndex: 100,
		'&:hover': {
			borderRadius: 50,
			backgroundColor: 'rgba(0,0,0,.5)',
		},
	},
});
interface MouseCoor {
	x: number;
	y: number;
}

function LetterTile(props: { tile: Tile; index: number; onTileClicked: (fragment: Tile) => void }): JSX.Element {
	const classes = useStyles();

	const [coordinates, setCoordinates] = useState<MouseCoor[]>([]);
	// useEffect(() => {
	// 	if (tile.current) {
	// 		let tileRef = tile.current as HTMLDivElement;
	// 		const startSelecting$: Observable<MouseEvent> = fromEvent<MouseEvent>(tileRef, 'mousedown');
	// 		startSelecting$.subscribe(() => console.log(tile));
	// 	}
	// }, [tile.current]);



	return (
		<div  key={props.tile.letter ? `${props.tile.letter}${props.index}` : `tile${props.index}`} className={classes.myTile} onClick={() => props.onTileClicked(props.tile)}>
			{props.tile.letter ? (props.tile.letter as string) : (props.tile as unknown as string)}
		</div>
	);
}

export default LetterTile;
