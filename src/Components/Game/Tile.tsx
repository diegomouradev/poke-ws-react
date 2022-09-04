import React, { useEffect, useState } from 'react';
import { Tile } from './Utils/Interfaces';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	myTile: {
		width: '30px',
		height: '30px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'uppercase',
	},
});

function LetterTile(props: { tile: Tile; index: number; onTileClicked: (fragment: Tile) => void }): JSX.Element {
	const classes = useStyles();

	return (
		<div key={props.tile.letter ? `${props.tile.letter}${props.index}` : `tile${props.index}`} className={classes.myTile} onClick={() => props.onTileClicked(props.tile)}>
			{props.tile.letter ? (props.tile.letter as string) : (props.tile as unknown as string)}
		</div>
	);
}

export default LetterTile;
